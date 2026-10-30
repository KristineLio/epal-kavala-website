/** Optional read-only WordPress REST API adapter. No credentials are required. */
export type Announcement = { id: string; title: string; summary: string; date: string; link: string; demo: boolean };

type WPPost = {
  id: number;
  date: string;
  link: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
};

function toPlainText(html: string): string {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return (doc.body.textContent ?? '').trim().replace(/\s+/g, ' ');
}

function safeHttpUrl(value: string): string {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : '#news';
  } catch { return '#news'; }
}

export async function fetchWordPressPosts(baseUrl: string, signal?: AbortSignal): Promise<Announcement[]> {
  const cleanBase = baseUrl.trim().replace(/\/+$/, '');
  const parsed = new URL(cleanBase);
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('Invalid WordPress API URL');
  const postsUrl = `${cleanBase}/posts?per_page=3&_fields=id,date,link,title,excerpt`;
  const response = await fetch(postsUrl, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`WordPress HTTP ${response.status}`);
  const posts = (await response.json()) as WPPost[];
  if (!Array.isArray(posts)) throw new Error('Unexpected WordPress response');
  return posts.slice(0, 3).map((post) => ({
    id: String(post.id),
    title: toPlainText(post.title?.rendered ?? 'Ανακοίνωση'),
    summary: toPlainText(post.excerpt?.rendered ?? '').slice(0, 190),
    date: new Date(post.date).toLocaleDateString('el-GR', { day: 'numeric', month: 'long', year: 'numeric' }),
    link: safeHttpUrl(post.link),
    demo: false,
  }));
}
