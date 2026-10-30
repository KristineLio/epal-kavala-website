import { useEffect, useState } from 'react';
import { fetchWordPressPosts, type Announcement } from './wordpress';
import './styles.css';

const SCHOOL_EMAIL = 'mail@2epal-esp-kaval.kav.sch.gr';
const SCHOOL_PHONE = '2510837789';

const subjects = [
  { title: 'Γεωπονίας', desc: 'Τρόφιμα, περιβάλλον και σύγχρονες εφαρμογές γεωπονίας.', emoji: '🌱', href: 'https://blogs.sch.gr/2epal-esp-kaval/tomeas-geoponias/' },
  { title: 'Διοίκησης & Οικονομίας', desc: 'Οργάνωση, επιχειρηματικότητα και οικονομικές υπηρεσίες.', emoji: '📊', href: 'https://blogs.sch.gr/2epal-esp-kaval/tomeas-dioikisis-amp-amp-oikonomias/' },
  { title: 'Ηλεκτρολογίας', desc: 'Ηλεκτρικά συστήματα, εγκαταστάσεις και τεχνολογία.', emoji: '⚡', href: 'https://blogs.sch.gr/2epal-esp-kaval/ilektrologias/' },
  { title: 'Μηχανολογίας', desc: 'Μηχανικές εφαρμογές, εξοπλισμός και τεχνικές δεξιότητες.', emoji: '⚙️', href: 'https://blogs.sch.gr/2epal-esp-kaval/tomeas-michanologias/' },
  { title: 'Πληροφορικής', desc: 'Υπολογιστές, δίκτυα και ψηφιακές τεχνολογίες.', emoji: '💻', href: 'https://blogs.sch.gr/2epal-esp-kaval/tomeas-pliroforikis/' },
  { title: 'Υγείας & Πρόνοιας', desc: 'Γνώση και δεξιότητες στον χώρο της φροντίδας.', emoji: '♡', href: 'https://blogs.sch.gr/2epal-esp-kaval/tomeas-ygeias-pronoias/' },
];

const initialAnnouncements: Announcement[] = [
  { id: 'real-1', title: 'Νέο Πρόγραμμα Σχολείου', summary: 'Η σχολική μονάδα παραπέμπει στο EduPage για το ενημερωμένο ωρολόγιο πρόγραμμα των τμημάτων.', date: '15 Φεβρουαρίου 2026', link: 'https://blogs.sch.gr/2epal-esp-kaval/category/anakoinoseis/', demo: false },
  { id: 'demo-2', title: 'Χρήσιμες πληροφορίες εγγραφών', summary: 'Εδώ θα εμφανίζονται ενημερώσεις για προϋποθέσεις και διαδικασίες εγγραφής, όταν εγκριθούν από το σχολείο.', date: 'ΔΕΙΓΜΑ ΔΙΑΤΑΞΗΣ', link: '#contact', demo: true },
  { id: 'demo-3', title: 'Δράσεις & σχολική κοινότητα', summary: 'Χώρος για δραστηριότητες, εκδηλώσεις και νέα του σχολείου που θα διαχειρίζονται οι εκπαιδευτικοί.', date: 'ΔΕΙΓΜΑ ΔΙΑΤΑΞΗΣ', link: '#contact', demo: true },
];

type IconName = 'clock' | 'book' | 'pin' | 'arrow' | 'menu' | 'close' | 'sun' | 'calendar' | 'users';

function Icon({ name, className = 'icon' }: { name: IconName; className?: string }) {
  return <svg aria-hidden="true" className={className} viewBox="0 0 24 24"><use href={`#i-${name}`} /></svg>;
}

function IconSymbols() {
  return <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
    <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
    <symbol id="i-book" viewBox="0 0 24 24"><path d="M12 5c-3-2-7-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-7-1-10 1Z"/><path d="M12 5v15"/></symbol>
    <symbol id="i-pin" viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4 12h16M13 5l7 7-7 7"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></symbol>
    <symbol id="i-sun" viewBox="0 0 24 24"><path d="M3 18h18M6 18a6 6 0 0 1 12 0M12 4v3M4.5 8l2 2M19.5 8l-2 2"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 10h18"/></symbol>
    <symbol id="i-users" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><path d="M2 20v-2a7 7 0 0 1 14 0v2M17 5a3 3 0 0 1 0 6M17 14a6 6 0 0 1 5 6"/></symbol>
  </svg>;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [liveWordPress, setLiveWordPress] = useState(false);

  useEffect(() => {
    const base = import.meta.env.VITE_WORDPRESS_API_BASE as string | undefined;
    if (!base) return;
    const controller = new AbortController();
    fetchWordPressPosts(base, controller.signal)
      .then((posts) => {
        if (posts.length) {
          setAnnouncements(posts);
          setLiveWordPress(true);
        }
      })
      .catch(() => { /* Keep clearly labeled fallback content if API is blocked or unavailable. */ });
    return () => controller.abort();
  }, []);

  return <>
    <IconSymbols />
    <a className="skip-link" href="#main">Μετάβαση στο περιεχόμενο</a>
    <div className="topbar"><div className="container topbar-inner"><span>2ο Εσπερινό Επαγγελματικό Λύκειο · Καβάλα</span><div className="topbar-meta"><a href={`tel:+30${SCHOOL_PHONE}`}>Τηλ. {SCHOOL_PHONE}</a><a href={`mailto:${SCHOOL_EMAIL}`}>{SCHOOL_EMAIL}</a></div></div></div>
    <header className="site-header"><div className="container header-inner">
      <a className="brand" href="#home" onClick={() => setMenuOpen(false)} aria-label="2ο Εσπερινό ΕΠΑΛ Καβάλας – αρχική"><span className="brand-mark">2º</span><span className="brand-copy"><strong>2ο Εσπερινό ΕΠΑ.Λ.</strong><span>ΚΑΒΑΛΑΣ · ΔΗΜΟΣΙΟ ΣΧΟΛΕΙΟ</span></span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Κλείσιμο μενού' : 'Άνοιγμα μενού'} aria-expanded={menuOpen} aria-controls="main-navigation"><Icon name={menuOpen ? 'close' : 'menu'} /></button>
      <nav id="main-navigation" aria-label="Κύρια πλοήγηση" className={`primary-nav ${menuOpen ? 'open' : ''}`}>
        <a className="active" href="#home" onClick={() => setMenuOpen(false)}>Αρχική</a><a href="#about" onClick={() => setMenuOpen(false)}>Το σχολείο</a><a href="#studies" onClick={() => setMenuOpen(false)}>Τομείς Σπουδών</a><a href="#news" onClick={() => setMenuOpen(false)}>Ανακοινώσεις</a><a href="#contact" onClick={() => setMenuOpen(false)}>Επικοινωνία</a><a className="header-cta" href="#contact" onClick={() => setMenuOpen(false)}>Πληροφορίες εγγραφής ↗</a>
      </nav>
    </div></header>
    <div className="demo-note"><strong>ΠΡΟΣΧΕΔΙΟ:</strong> μη επίσημη ιστοσελίδα — πρόταση σχεδιασμού για αξιολόγηση από το σχολείο.</div>
    <main id="main">
      <div className="hero-shell" id="home"><div className="container hero"><div className="hero-copy">
        <span className="eyebrow">ΕΚΠΑΙΔΕΥΣΗ ΜΕ ΝΕΕΣ ΠΡΟΟΠΤΙΚΕΣ</span>
        <h1>Κάθε βράδυ,<br/>μια νέα <em>αρχή.</em></h1>
        <p className="hero-description">Η γνώση δεν έχει ηλικία ούτε ωράριο. Στο 2ο Εσπερινό ΕΠΑ.Λ. Καβάλας, η επαγγελματική εκπαίδευση γίνεται μια ευκαιρία να προχωρήσεις παρακάτω — με τον δικό σου ρυθμό.</p>
        <div className="hero-buttons"><a href="#about" className="btn primary">Γνώρισε το σχολείο <Icon name="arrow" /></a><a className="btn secondary" href="#studies">Ανακάλυψε τους τομείς <span className="arrow">↗</span></a></div>
        <div className="hero-mini"><Icon name="pin"/> <span>Σάμου 2, Καβάλα · Εσπερινή εκπαίδευση</span></div>
      </div><div className="hero-art-wrap"><div className="hero-art" role="img" aria-label="Καλλιτεχνική απεικόνιση της Καβάλας το σούρουπο, όχι φωτογραφία του σχολείου" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}assets/kavala-evening.svg')` }}><div className="hero-art-label">✦ Ο δικός σου δρόμος προς τη γνώση</div><div className="hero-art-title"><span className="small">2ο ΕΣΠΕΡΙΝΟ ΕΠΑ.Λ. ΚΑΒΑΛΑΣ</span><strong>Ένα σχολείο για τις δυνατότητές σου.</strong></div></div><div className="floating-hour"><span className="clock"><Icon name="clock"/></span><span><small>Ωράριο στην υπάρχουσα σελίδα*</small><b>18:00 – 22:30</b></span></div></div></div></div>
      <div className="container highlights" aria-label="Γρήγορη πλοήγηση"><a className="highlight" href="#studies"><span className="hi-icon"><Icon name="book" /></span><span><strong>Τομείς Σπουδών</strong><span>Γνώρισε τις εκπαιδευτικές επιλογές</span></span></a><a className="highlight" href="https://2espepalkaval.edupage.org/" target="_blank" rel="noreferrer"><span className="hi-icon orange"><Icon name="calendar"/></span><span><strong>Ωρολόγιο Πρόγραμμα</strong><span>Δες το πρόγραμμα στο EduPage ↗</span></span></a><a className="highlight" href="#contact"><span className="hi-icon blue"><Icon name="pin"/></span><span><strong>Πού θα μας βρεις</strong><span>Διεύθυνση & στοιχεία επικοινωνίας</span></span></a></div>
      <section className="section" id="studies"><div className="container"><div className="section-heading"><div><span className="section-label">ΜΑΘΕ · ΕΞΕΛΙΞΟΥ · ΠΡΟΧΩΡΗΣΕ</span><h2>Εξερεύνησε τους τομείς</h2><p className="section-intro">Οι έξι τομείς που παρουσιάζονται στην υφιστάμενη ιστοσελίδα. Η λειτουργία τους για τη φετινή χρονιά πρέπει να επιβεβαιωθεί από τη διεύθυνση.</p></div><a href="https://blogs.sch.gr/2epal-esp-kaval/" target="_blank" rel="noreferrer" className="section-link">Υφιστάμενη ιστοσελίδα <Icon name="arrow"/></a></div>
      <div className="courses-grid">{subjects.map((subject) => <a href={subject.href} key={subject.title} className="course-card" target="_blank" rel="noreferrer"><span className="course-badge" aria-hidden="true">{subject.emoji}</span><strong>{subject.title}</strong><span className="description">{subject.desc}</span><span className="view">ΠΕΡΙΣΣΟΤΕΡΑ ↗</span></a>)}</div></div></section>
      <section className="about-band" id="about"><div className="container about-inner"><div><span className="section-label">ΕΝΑ ΣΧΟΛΕΙΟ, ΠΟΛΛΕΣ ΔΙΑΔΡΟΜΕΣ</span><h2>Γιατί η επόμενη ευκαιρία αξίζει να έχει χώρο.</h2><p>Το εσπερινό σχολείο απευθύνεται σε ανθρώπους που θέλουν να συνδυάσουν την καθημερινότητά τους με την εκπαίδευση: εργαζόμενους, ενήλικες και όσους επιθυμούν νέα επαγγελματική κατεύθυνση.</p></div><div className="about-details"><div className="about-detail"><span className="about-icon"><Icon name="sun"/></span><div><strong>Σπουδές σε απογευματινό ωράριο</strong><span>Μια εκπαιδευτική επιλογή που μπορεί να συνδυαστεί με άλλες υποχρεώσεις.</span></div></div><div className="about-detail"><span className="about-icon"><Icon name="book"/></span><div><strong>Γενική και επαγγελματική εκπαίδευση</strong><span>Μαθήματα και τομείς με έμφαση στις γνώσεις και τις δεξιότητες.</span></div></div><div className="about-detail"><span className="about-icon"><Icon name="users"/></span><div><strong>Μια κοινότητα που εξελίσσεται</strong><span>Η μάθηση μπορεί να ξεκινήσει ξανά, σε κάθε στάδιο της ζωής.</span></div></div></div></div></section>
      <section className="section news-section" id="news"><div className="container"><div className="section-heading"><div><span className="section-label">ΜΕΙΝΕ ΕΝΗΜΕΡΩΜΕΝΟΣ</span><h2>Νέα & ανακοινώσεις</h2><p className="section-intro">Στόχος είναι οι εκπαιδευτικοί να ενημερώνουν αυτή την ενότητα εύκολα μέσα από το WordPress.</p></div><a href="https://blogs.sch.gr/2epal-esp-kaval/category/anakoinoseis/" target="_blank" rel="noreferrer" className="section-link">Αρχείο ανακοινώσεων <Icon name="arrow"/></a></div>
      <div className="news-grid">{announcements.map((item,index) => <article key={item.id} className={`news-card ${index === 0 ? 'featured' : ''}`}>{item.demo && <span className="placeholder">ΕΝΔΕΙΚΤΙΚΟ ΠΕΡΙΕΧΟΜΕΝΟ</span>}<span className="news-date">{item.date}</span><h3>{item.title}</h3><p>{item.summary}</p><a className="news-link" href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined} rel={item.link.startsWith('http') ? 'noreferrer' : undefined}>{item.demo ? 'Επικοινωνία με το σχολείο' : 'Διάβασε περισσότερα'} ↗</a></article>)}</div><p className="wp-status">{liveWordPress ? '✓ Οι ανακοινώσεις φορτώθηκαν από το WordPress API.' : '* Εμφανίζεται μία πραγματική ανακοίνωση και δύο σαφώς σημειωμένα δείγματα. Για ζωντανές ανακοινώσεις απαιτείται διασύνδεση WordPress.'}</p></div></section>
      <section className="section contact-section" id="contact"><div className="container"><div className="contact-card"><div><span className="section-label">ΕΙΜΑΣΤΕ ΕΔΩ ΓΙΑ ΝΑ ΒΟΗΘΗΣΟΥΜΕ</span><h2>Έχεις απορίες για τη φοίτηση;</h2><p>Σάμου 2, 65201 Καβάλα · <a href={`tel:+30${SCHOOL_PHONE}`}>{SCHOOL_PHONE}</a><br/>* Τα στοιχεία και το ωράριο χρειάζονται τελική επιβεβαίωση πριν τη δημοσίευση.</p></div><a href={`mailto:${SCHOOL_EMAIL}`} className="btn primary">Επικοινώνησε μαζί μας <Icon name="arrow"/></a></div></div></section>
    </main>
    <footer className="footer"><div className="container"><div className="footer-main"><div><div className="brand"><span className="brand-mark">2º</span><span className="brand-copy"><strong>2ο Εσπερινό ΕΠΑ.Λ.</strong><span>ΚΑΒΑΛΑΣ · ΔΗΜΟΣΙΟ ΣΧΟΛΕΙΟ</span></span></div><p>Πρόταση ανανέωσης της σχολικής ιστοσελίδας. Δεν αποτελεί επίσημη ανακοίνωση ή ενεργό ιστότοπο της σχολικής μονάδας.</p></div><div><h4>Γρήγοροι σύνδεσμοι</h4><div className="footer-links"><a href="#home">Αρχική</a><a href="#about">Το σχολείο</a><a href="#studies">Τομείς Σπουδών</a><a href="#news">Ανακοινώσεις</a></div></div><div><h4>Επικοινωνία</h4><div className="footer-links"><span>Σάμου 2, 65201 Καβάλα</span><a href={`tel:+30${SCHOOL_PHONE}`}>Τηλ.: {SCHOOL_PHONE}</a><a href={`mailto:${SCHOOL_EMAIL}`}>{SCHOOL_EMAIL}</a><a href="https://www.sch.gr/sites/sch-units/view?registry_no=2140070" target="_blank" rel="noreferrer">Επίσημη καταχώριση ΠΣΔ ↗</a></div></div></div><div className="footer-bottom"><span>© 2026 · 2ο Εσπερινό ΕΠΑ.Λ. Καβάλας · <strong>Μη επίσημο προσχέδιο</strong></span><span className="credit">React + TypeScript · Προεπισκόπηση σχεδιασμού</span></div></div></footer>
  </>;
}
