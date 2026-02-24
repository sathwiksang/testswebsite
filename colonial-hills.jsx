import { useState, useEffect, useRef } from "react";

const SECTIONS = ["about", "gatherings", "beliefs", "heritage", "contact"];

// ─── Inline SVG Icons ───────────────────────────────────────────────
const Icons = {
  menu: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
  ),
  x: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  ),
  mapPin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
  ),
  clock: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
  ),
  mail: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
  ),
  arrowRight: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  globe: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
  ),
  heart: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  ),
  users: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  book: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
  ),
  sun: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
  ),
  calendar: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
  ),
  chevDown: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  seedling: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 22V8"/><path d="M5 12H2a10 10 0 0 0 10-10v0a10 10 0 0 0 10 10h-3"/><path d="M7.2 14.8a6 6 0 0 0 9.6 0"/></svg>
  ),
  megaphone: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 7L13 12V2L22 7z"/><path d="M13 12L2 7"/><path d="M13 7H2v10h4l3 5h2l-1-5h3V7z"/></svg>
  ),
  handshake: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 17a4 4 0 0 0 4-4V7"/><path d="M7 7v6a4 4 0 0 0 8 0"/><path d="M3 11h2"/><path d="M19 11h2"/><path d="M12 3v2"/></svg>
  ),
  bird: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/><path d="m20 7 2 .5-2 .5"/><path d="M10 18v3"/><path d="M14 17.75V21"/><path d="M7 18a6 6 0 0 0 3.84-10.61"/></svg>
  ),
  externalLink: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  ),
  church: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 22V8l-6-6-6 6v14"/><path d="M2 22h20"/><path d="M12 2v4"/><path d="M9 22v-5a3 3 0 0 1 6 0v5"/><path d="M10 8h4"/></svg>
  ),
  family: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="7" cy="5" r="2"/><circle cx="17" cy="5" r="2"/><circle cx="12" cy="5" r="1.5"/><path d="M5 10h4l1 12H4L5 10z"/><path d="M15 10h4l1 12h-6l1-12z"/><path d="M10 10h4l1 8h-6l1-8z"/></svg>
  ),
};

// ─── Data ───────────────────────────────────────────────────────────

const sundaySchedule = [
  { time: "10:00 AM", title: "Adult Bible Study", note: "English & Malayalam (translated)" },
  { time: "10:00 AM", title: "Sunday School", note: null },
  { time: "10:30 AM", title: "Breaking of Bread", note: "Worship meeting" },
  { time: "11:30 AM", title: "Family Bible Hour", note: "Teaching from God's Word for all ages" },
];

const weekdaySchedule = [
  { time: "Wednesday", title: "Men's Prayer Meeting", note: "Zoom" },
  { time: "Thu 7:30 PM", title: "Bible Study", note: "Zoom" },
  { time: "Saturday", title: "Cottage Meeting", note: "Every 2 weeks" },
  { time: "Sat 5:00 PM", title: "Sisters Bible Study & Prayer", note: "Every other Saturday · Zoom" },
  { time: "Last Friday", title: "Monthly Friday Night Meeting", note: "Bible study, music, games & dinner" },
];

const beliefsSummary = [
  "The Bible as the inspired, inerrant Word of God and our final authority",
  "One God, eternally existing in three persons: Father, Son, and Holy Spirit",
  "Salvation by grace alone through faith in Jesus Christ",
  "The substitutionary death and bodily resurrection of Christ",
  "The personal and imminent return of Jesus Christ",
];

const originsTimeline = [
  { year: "1827", place: "Dublin, Ireland", desc: "Primary emphasis on Sola Scriptura — the Bible as the supreme doctrinal basis." },
  { year: "1830", place: "Early Leaders", desc: "John Nelson Darby · John Gifford Bellett · Antony Norris Groves · George Müller" },
  { year: "1831", place: "Plymouth, England", desc: "The place of publication of the truths held by brethren." },
  { year: "1833", place: "India", desc: "Anthony Norris Groves arrives in India as a missionary." },
  { year: "1847", place: "Ireland", desc: "Apex of the Potato Famine drove many to the new world." },
  { year: "1870", place: "North America", desc: "The brethren movement spread to North America." },
];

const keralaTimeline = [
  { year: "AD 52", place: "Malabar, India", desc: "History records the arrival of Apostle Thomas on the south west shores of Malabar." },
  { year: "1833", place: "Kerala", desc: "Anthony Norris Groves, a dentist missionary and pioneer from Ireland." },
  { year: "1872", place: "Kerala", desc: "Arrival of a Basel-Mission evangelist with Calvinist and Lutheran background." },
  { year: "1898", place: "Inception", desc: "Founded on believer's baptism of four from nominal Christian backgrounds." },
  { year: "1915", place: "Kerala", desc: "K. V. Simon excommunicated from the Mar Thoma Church." },
  { year: "1929", place: "India", desc: "Kerala Brethren joins the Indian Brethren movement." },
];

const statementOfFaith = [
  { title: "The Holy Scriptures", text: "The Bible is the Word of God, each word having been God-breathed. God gave His word to His people to help keep His precepts and to walk in His ways; the universal church is to serve God in obedience to the Bible, His Holy Word. We hold the Bible as the final and supreme authority for our doctrine and lives, and that it is without error in its original writings.", refs: "1 Corinthians 2:13; 2 Timothy 3:16–17; 2 Peter 1:20–21" },
  { title: "The Trinity", text: "One God, who eternally exists in three persons: Father, Son, and Holy Spirit. Each is equal in attributes, power, and glory.", refs: "Deuteronomy 6:4; Ephesians 4:4–6; 2 Corinthians 13:14" },
  { title: "The Nature of Man", text: "God created man in His own image, but through man's willful choice to disobey God, sin came into the world and death through sin. All now are born in sin, spiritually dead, separated from God, corrupt in nature, and guilty before God.", refs: "Genesis 1:26; 3:1–7; Romans 3:12; 5:12; 6:23" },
  { title: "The Person of Christ", text: "Jesus Christ is the Son of God, true God and true man; by the power of the Holy Spirit, He was born of a virgin, whose name was Mary, to live and walk among His people as an example for them to follow for God's glory.", refs: "Isaiah 7:14; Luke 1:35; John 1:1–14; 5:22–23" },
  { title: "The Work of Christ", text: "Jesus Christ died for our sins in our place. He is our substitutionary and representative sacrifice; He rose again from the dead on the third day, never to die again. His work of salvation is finished, that the righteous demands of God are fully satisfied in the work of Christ on the cross, and there is salvation in no other.", refs: "Mark 10:45; Romans 3:24–25; 6:1–14; 1 Peter 1:18–19; 2:24; John 14:6; 19:30; Hebrews 10:18" },
  { title: "Salvation by Grace", text: "All who repent and believe the gospel are eternally saved. Salvation is a free gift of God, given apart from any human merit. God's offer of salvation is free by His grace; His mercy toward mankind withholds the just punishment for the sinner who He reconciles.", refs: "Mark 1:15; Romans 10:9–10; Ephesians 2:8–10; Galatians 2:21; 3:10" },
  { title: "The Church & the Holy Spirit", text: "Every genuine believer is born again, sealed with the Spirit of God, and eternally secure in Christ. The evidence of new birth is the fruit of the Spirit and obedience to Christ. Every believer is a member of the body of Christ, the universal church, and gifted by the Holy Spirit for spiritual service.", refs: "1 Corinthians 12:11, 13; Ephesians 1:13; John 16:14; Colossians 1:18; Matthew 16:18" },
  { title: "Baptism & the Lord's Table", text: "Two ordinances put forth for those who declare Jesus Christ to be Lord and Savior: first, to be baptized, testifying to the death of the old sinner and resurrected into the newness of life in Christ; and second, to gather as members of a local church to partake in the Lord's Table in remembrance of Him until His return.", refs: "Acts 2:38, 42; Romans 6:3–4; Colossians 2:12–13; 1 Corinthians 11:24" },
  { title: "The Return of Christ", text: "The personal and imminent return of Jesus Christ for His church, the establishment of His millennial kingdom upon the earth, and the everlasting conscious punishment of the lost.", refs: "John 14:1–3; 1 Thessalonians 4:13–18; Revelation 20:4–15" },
];

const missionValues = [
  { icon: Icons.heart, label: "Mission", desc: "God's love to one another and to the community" },
  { icon: Icons.seedling, label: "Grow", desc: "In faith and in a closer walk with Christ" },
  { icon: Icons.megaphone, label: "Testify", desc: "As disciples bearing witness to His grace" },
  { icon: Icons.handshake, label: "Serve", desc: "Through studying, teaching, and baptizing" },
  { icon: Icons.bird, label: "Await", desc: "His return with confident anticipation" },
];

// ─── Main Component ─────────────────────────────────────────────────

export default function HoustonBrethrenAssembly() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [gatheringTab, setGatheringTab] = useState("sunday");
  const [heritageTab, setHeritageTab] = useState("origins");
  const [showFaith, setShowFaith] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showFaith]);

  useEffect(() => {
    if (mobileMenu) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenu]);

  const scrollTo = (id) => {
    setMobileMenu(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isVisible = (id) => visibleSections.has(id);
  const animClass = (id) => `fade-section ${isVisible(id) ? "visible" : ""}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #FBFAF6;
          --surface: #FFFFFF;
          --surface-warm: #F3F1EA;
          --ink: #15221B;
          --muted: #516158;
          --border: #DDD7C7;
          --primary: #1E5A45;
          --primary-hover: #164336;
          --accent: #C19A3A;
          --focus: #2D7A5F;
          --font-serif: 'Instrument Serif', Georgia, serif;
          --font-sans: 'Instrument Sans', -apple-system, system-ui, sans-serif;
          --ease: cubic-bezier(0.16, 1, 0.3, 1);
          --radius: 14px;
        }

        html { scroll-behavior: smooth; scroll-padding-top: 80px; }
        body {
          font-family: var(--font-sans);
          background: var(--bg);
          color: var(--ink);
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
        }

        /* ── Fade Animation ── */
        .fade-section {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s var(--ease), transform 0.7s var(--ease);
        }
        .fade-section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Header ── */
        .hba-header {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          transition: all 0.4s var(--ease);
        }
        .hba-header.scrolled {
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .hba-header-inner {
          max-width: 1200px; margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center;
          padding: 18px 24px;
        }
        .hba-wordmark {
          font-family: var(--font-serif); font-size: 20px; color: var(--ink);
          letter-spacing: 0.01em; cursor: pointer; font-weight: 400;
        }
        .hba-nav { display: flex; align-items: center; gap: 32px; }
        .hba-nav-links { display: flex; gap: 28px; list-style: none; }
        .hba-nav-link {
          font-family: var(--font-sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted);
          text-decoration: none; padding: 4px 0; border: none; background: none;
          cursor: pointer; transition: color 0.3s;
          position: relative;
        }
        .hba-nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0; right: 0;
          height: 2px; background: var(--primary); transform: scaleX(0);
          transition: transform 0.3s var(--ease); border-radius: 1px;
        }
        .hba-nav-link:hover { color: var(--primary); }
        .hba-nav-link:hover::after { transform: scaleX(1); }

        .hba-cta-btn {
          font-family: var(--font-sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: var(--primary); color: #fff; border: none;
          padding: 10px 20px; border-radius: 999px; cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .hba-cta-btn:hover { background: var(--primary-hover); transform: translateY(-1px); box-shadow: 0 4px 16px rgba(30,90,69,0.25); }

        .hba-menu-btn {
          display: none; background: none; border: 1px solid var(--border);
          border-radius: 999px; width: 42px; height: 42px;
          align-items: center; justify-content: center; cursor: pointer;
          color: var(--primary); transition: all 0.25s;
        }
        .hba-menu-btn:hover { background: var(--surface); }

        /* ── Mobile Menu ── */
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(21,34,27,0.4); backdrop-filter: blur(4px);
          opacity: 0; pointer-events: none; transition: opacity 0.3s;
        }
        .mobile-overlay.open { opacity: 1; pointer-events: auto; }
        .mobile-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 201;
          width: min(340px, 85vw); background: var(--bg);
          transform: translateX(100%); transition: transform 0.4s var(--ease);
          display: flex; flex-direction: column; padding: 24px;
        }
        .mobile-drawer.open { transform: translateX(0); }
        .mobile-drawer-close {
          align-self: flex-end; background: none; border: none;
          color: var(--muted); cursor: pointer; padding: 8px;
        }
        .mobile-drawer nav {
          display: flex; flex-direction: column; gap: 8px; margin-top: 32px;
        }
        .mobile-drawer nav button {
          font-family: var(--font-sans); font-size: 15px; font-weight: 500;
          color: var(--ink); background: none; border: none; text-align: left;
          padding: 14px 16px; border-radius: 10px; cursor: pointer;
          transition: background 0.2s;
        }
        .mobile-drawer nav button:hover { background: var(--surface-warm); }

        /* ── Hero ── */
        .hba-hero {
          min-height: 100vh; display: flex; align-items: center;
          padding: 120px 24px 80px;
          background: linear-gradient(180deg, var(--bg) 0%, #F0EDE4 50%, var(--bg) 100%);
          position: relative; overflow: hidden;
        }
        .hba-hero::before {
          content: ''; position: absolute; top: 20%; right: -10%;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(30,90,69,0.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .hba-hero-inner {
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: grid; grid-template-columns: 1fr 400px; gap: 64px; align-items: center;
        }
        .hba-hero-left { position: relative; z-index: 1; }
        .hba-hero-label {
          font-family: var(--font-sans); font-size: 12px; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: var(--primary); margin-bottom: 20px;
        }
        .hba-hero h1 {
          font-family: var(--font-serif); font-size: clamp(36px, 5vw, 56px);
          font-weight: 400; line-height: 1.15; color: var(--ink);
          margin-bottom: 24px;
        }
        .hba-hero-welcome {
          font-size: 17px; color: var(--muted); line-height: 1.7;
          max-width: 520px; margin-bottom: 20px;
        }
        .hba-hero-verse {
          font-family: var(--font-serif); font-style: italic;
          font-size: 16px; color: var(--muted); margin-bottom: 36px;
          padding-left: 16px; border-left: 2px solid var(--accent);
          line-height: 1.7;
        }
        .hba-hero-verse cite {
          display: block; font-style: normal; font-size: 13px;
          color: var(--accent); margin-top: 6px; letter-spacing: 0.06em;
        }
        .hba-hero-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-sans); font-size: 14px; font-weight: 600;
          background: var(--primary); color: #fff; border: none;
          padding: 14px 28px; border-radius: 999px; cursor: pointer;
          transition: all 0.3s var(--ease); text-decoration: none;
        }
        .btn-primary:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 6px 20px rgba(30,90,69,0.25); }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-sans); font-size: 14px; font-weight: 600;
          background: transparent; color: var(--primary); 
          border: 1.5px solid var(--primary); text-decoration: none;
          padding: 13px 28px; border-radius: 999px; cursor: pointer;
          transition: all 0.3s var(--ease);
        }
        .btn-outline:hover { background: rgba(30,90,69,0.06); transform: translateY(-2px); }

        /* Visit Card */
        .hba-visit-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 32px;
          position: relative; z-index: 1;
        }
        .hba-visit-card::before {
          content: ''; position: absolute; top: 0; left: 24px; right: 24px;
          height: 3px; background: var(--accent); border-radius: 0 0 3px 3px;
        }
        .hba-visit-card-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 20px;
        }
        .hba-visit-item {
          display: flex; align-items: flex-start; gap: 12px; margin-bottom: 18px;
        }
        .hba-visit-item svg { color: var(--primary); flex-shrink: 0; margin-top: 2px; }
        .hba-visit-item-text { font-size: 15px; color: var(--ink); line-height: 1.5; }
        .hba-visit-item-text small { display: block; font-size: 13px; color: var(--muted); margin-top: 2px; }
        .hba-visit-item-text a { color: var(--primary); text-decoration: none; }
        .hba-visit-item-text a:hover { text-decoration: underline; }
        .hba-visit-actions { display: flex; gap: 10px; margin-top: 24px; }
        .btn-sm {
          font-family: var(--font-sans); font-size: 12px; font-weight: 600;
          padding: 10px 18px; border-radius: 999px; cursor: pointer;
          transition: all 0.25s; text-decoration: none;
          display: inline-flex; align-items: center; gap: 6px;
        }
        .btn-sm-primary { background: var(--primary); color: #fff; border: none; }
        .btn-sm-primary:hover { background: var(--primary-hover); }
        .btn-sm-outline { background: transparent; color: var(--primary); border: 1.5px solid var(--border); }
        .btn-sm-outline:hover { border-color: var(--primary); background: rgba(30,90,69,0.04); }

        /* ── Section System ── */
        .hba-section {
          padding: 96px 24px;
          max-width: 1200px; margin: 0 auto;
        }
        .hba-section-warm {
          background: var(--surface-warm);
        }
        .hba-section-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--primary); margin-bottom: 12px;
        }
        .hba-section-title {
          font-family: var(--font-serif); font-size: clamp(30px, 4vw, 42px);
          font-weight: 400; color: var(--ink); margin-bottom: 16px;
          line-height: 1.2;
        }
        .hba-section-desc {
          font-size: 16px; color: var(--muted); max-width: 560px; line-height: 1.7;
        }

        /* ── Welcome / About ── */
        .hba-welcome-text {
          font-family: var(--font-serif); font-size: 20px; font-style: italic;
          color: var(--muted); max-width: 680px; line-height: 1.8;
          margin-bottom: 56px; text-align: center; margin-left: auto; margin-right: auto;
        }
        .hba-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .hba-pillar {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 32px 24px; text-align: center;
          transition: all 0.35s var(--ease);
        }
        .hba-pillar:hover { transform: translateY(-4px); box-shadow: 0 8px 30px rgba(0,0,0,0.06); }
        .hba-pillar-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(30,90,69,0.08); color: var(--primary);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
        }
        .hba-pillar h3 {
          font-family: var(--font-sans); font-size: 16px; font-weight: 600;
          letter-spacing: 0.05em; margin-bottom: 8px; color: var(--ink);
        }
        .hba-pillar p { font-size: 15px; color: var(--muted); line-height: 1.6; }

        /* ── Plan Your Visit ── */
        .hba-visit-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; }
        .hba-visit-info-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 28px 24px;
          transition: all 0.35s var(--ease);
        }
        .hba-visit-info-card:hover { transform: translateY(-3px); box-shadow: 0 6px 24px rgba(0,0,0,0.05); }
        .hba-visit-info-card h4 {
          font-family: var(--font-sans); font-size: 15px; font-weight: 600;
          margin-bottom: 8px; color: var(--ink);
        }
        .hba-visit-info-card p { font-size: 14px; color: var(--muted); line-height: 1.6; }

        /* ── Tabs ── */
        .hba-tabs {
          display: inline-flex; gap: 4px; background: var(--surface-warm);
          border-radius: 999px; padding: 4px; margin-bottom: 32px;
        }
        .hba-tab {
          font-family: var(--font-sans); font-size: 13px; font-weight: 600;
          padding: 10px 22px; border-radius: 999px; border: none;
          cursor: pointer; transition: all 0.25s; color: var(--muted);
          background: transparent;
        }
        .hba-tab.active { background: var(--surface); color: var(--ink); box-shadow: 0 1px 4px rgba(0,0,0,0.08); }
        .hba-tab:not(.active):hover { color: var(--ink); }

        /* ── Schedule List ── */
        .hba-schedule { display: flex; flex-direction: column; gap: 0; }
        .hba-schedule-item {
          display: flex; align-items: flex-start; gap: 20px;
          padding: 18px 0; border-bottom: 1px solid var(--border);
        }
        .hba-schedule-item:last-child { border-bottom: none; }
        .hba-schedule-time {
          font-family: var(--font-sans); font-size: 14px; font-weight: 600;
          color: var(--primary); min-width: 100px; padding-top: 1px;
        }
        .hba-schedule-info h4 {
          font-family: var(--font-sans); font-size: 15px; font-weight: 500;
          color: var(--ink); margin-bottom: 2px;
        }
        .hba-schedule-info p { font-size: 13px; color: var(--muted); }

        /* Calendar embed */
        .hba-calendar-card {
          margin-top: 48px; background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden;
        }
        .hba-calendar-header {
          padding: 24px 28px; border-bottom: 1px solid var(--border);
        }
        .hba-calendar-header h4 {
          font-family: var(--font-sans); font-size: 16px; font-weight: 600; color: var(--ink);
        }
        .hba-calendar-header p { font-size: 13px; color: var(--muted); margin-top: 4px; }
        .hba-calendar-embed {
          padding: 16px;
        }
        .hba-calendar-embed iframe {
          width: 100%; height: 500px; border: none; border-radius: 10px;
        }

        /* ── Beliefs Summary ── */
        .hba-beliefs-list { margin-top: 32px; margin-bottom: 32px; }
        .hba-belief-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 14px 0; border-bottom: 1px solid var(--border);
        }
        .hba-belief-item:last-child { border-bottom: none; }
        .hba-belief-num {
          font-family: var(--font-serif); font-size: 20px; color: var(--accent);
          min-width: 28px; font-style: italic;
        }
        .hba-belief-text { font-size: 15px; color: var(--ink); line-height: 1.6; }

        /* ── Statement of Faith (full page) ── */
        .hba-faith-page {
          background: var(--surface-warm);
          padding: 80px 24px 96px;
        }
        .hba-faith-inner { max-width: 760px; margin: 0 auto; }
        .hba-faith-back {
          font-family: var(--font-sans); font-size: 13px; font-weight: 600;
          color: var(--primary); background: none; border: none; cursor: pointer;
          margin-bottom: 32px; display: flex; align-items: center; gap: 6px;
        }
        .hba-faith-back:hover { text-decoration: underline; }
        .hba-doctrine {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 28px 32px;
          margin-bottom: 16px; transition: all 0.25s;
        }
        .hba-doctrine:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.04); }
        .hba-doctrine-header {
          display: flex; align-items: flex-start; gap: 16px; margin-bottom: 12px;
        }
        .hba-doctrine-num {
          font-family: var(--font-serif); font-size: 28px; color: var(--accent);
          line-height: 1; min-width: 32px; font-style: italic;
        }
        .hba-doctrine-title {
          font-family: var(--font-sans); font-size: 17px; font-weight: 600;
          color: var(--ink); padding-top: 4px;
        }
        .hba-doctrine p {
          font-size: 15px; color: var(--muted); line-height: 1.75;
          margin-bottom: 10px; padding-left: 48px;
        }
        .hba-doctrine-refs {
          font-size: 13px; color: var(--accent); padding-left: 48px;
          font-style: italic;
        }

        /* ── Mission / Vision ── */
        .hba-vision-cards {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
          margin-bottom: 48px;
        }
        .hba-vision-card {
          padding: 36px 32px; border-radius: var(--radius);
          border-left: 3px solid var(--accent);
          background: var(--surface); border-right: 1px solid var(--border);
          border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
        }
        .hba-vision-card-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--primary); margin-bottom: 16px;
        }
        .hba-vision-card blockquote {
          font-family: var(--font-serif); font-style: italic;
          font-size: 16px; color: var(--ink); line-height: 1.75;
          margin: 0 0 12px;
        }
        .hba-vision-card cite {
          font-family: var(--font-sans); font-style: normal;
          font-size: 13px; color: var(--accent); letter-spacing: 0.04em;
        }

        .hba-values-grid {
          display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px;
        }
        .hba-value-card {
          text-align: center; padding: 24px 16px;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); transition: all 0.3s var(--ease);
        }
        .hba-value-card:hover { transform: translateY(-3px); box-shadow: 0 6px 20px rgba(0,0,0,0.05); }
        .hba-value-icon {
          width: 44px; height: 44px; border-radius: 10px;
          background: rgba(30,90,69,0.08); color: var(--primary);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 12px;
        }
        .hba-value-card h4 {
          font-family: var(--font-sans); font-size: 14px; font-weight: 600;
          margin-bottom: 6px; color: var(--ink);
        }
        .hba-value-card p { font-size: 13px; color: var(--muted); line-height: 1.5; }

        /* ── Timeline ── */
        .hba-timeline { position: relative; padding-left: 32px; }
        .hba-timeline::before {
          content: ''; position: absolute; left: 7px; top: 0; bottom: 0;
          width: 2px; background: var(--border);
        }
        .hba-timeline-item { position: relative; padding-bottom: 28px; }
        .hba-timeline-item:last-child { padding-bottom: 0; }
        .hba-timeline-item::before {
          content: ''; position: absolute; left: -29px; top: 6px;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--primary); border: 2px solid var(--bg);
        }
        .hba-timeline-year {
          font-family: var(--font-serif); font-size: 18px; color: var(--accent);
          font-style: italic; margin-bottom: 2px;
        }
        .hba-timeline-place {
          font-size: 14px; font-weight: 600; color: var(--ink); margin-bottom: 4px;
        }
        .hba-timeline-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }

        /* ── Contact ── */
        .hba-contact-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
          margin-bottom: 40px;
        }
        .hba-contact-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); padding: 32px;
        }
        .hba-contact-card h3 {
          font-family: var(--font-serif); font-size: 22px; margin-bottom: 20px;
        }
        .hba-contact-line {
          display: flex; align-items: flex-start; gap: 12px;
          margin-bottom: 16px; font-size: 15px; color: var(--ink);
        }
        .hba-contact-line svg { color: var(--primary); flex-shrink: 0; margin-top: 2px; }
        .hba-contact-line small { display: block; font-size: 13px; color: var(--muted); margin-top: 2px; }
        .hba-map-placeholder {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: var(--radius); overflow: hidden; height: 100%; min-height: 280px;
        }
        .hba-map-placeholder iframe {
          width: 100%; height: 100%; border: none; min-height: 280px;
        }

        /* ── Footer ── */
        .hba-footer {
          background: var(--ink); color: rgba(255,255,255,0.7);
          padding: 64px 24px 32px;
        }
        .hba-footer-inner {
          max-width: 1200px; margin: 0 auto;
        }
        .hba-footer-top {
          display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px;
          padding-bottom: 40px; border-bottom: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 32px;
        }
        .hba-footer-brand h4 {
          font-family: var(--font-serif); font-size: 20px; color: #fff;
          margin-bottom: 16px; font-weight: 400;
        }
        .hba-footer-verse {
          font-family: var(--font-serif); font-style: italic;
          font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.5);
        }
        .hba-footer-col h5 {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--accent); margin-bottom: 16px;
        }
        .hba-footer-col ul { list-style: none; }
        .hba-footer-col li { margin-bottom: 10px; }
        .hba-footer-col button {
          background: none; border: none; color: rgba(255,255,255,0.6);
          font-size: 14px; cursor: pointer; padding: 0;
          font-family: var(--font-sans); transition: color 0.2s;
        }
        .hba-footer-col button:hover { color: #fff; }
        .hba-footer-bottom {
          text-align: center; font-size: 13px; color: rgba(255,255,255,0.35);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hba-hero-inner { grid-template-columns: 1fr; gap: 40px; }
          .hba-visit-card { max-width: 420px; }
          .hba-vision-cards { grid-template-columns: 1fr; }
          .hba-values-grid { grid-template-columns: repeat(3, 1fr); }
          .hba-contact-grid { grid-template-columns: 1fr; }
          .hba-footer-top { grid-template-columns: 1fr; gap: 32px; }
        }

        @media (max-width: 768px) {
          .hba-nav-links { display: none; }
          .hba-cta-btn { display: none; }
          .hba-menu-btn { display: flex; }
          .hba-hero { padding: 100px 20px 60px; min-height: auto; }
          .hba-hero-inner { gap: 32px; }
          .hba-section { padding: 64px 20px; }
          .hba-pillars { grid-template-columns: 1fr; }
          .hba-visit-cards { grid-template-columns: 1fr; }
          .hba-values-grid { grid-template-columns: repeat(2, 1fr); }
          .hba-visit-card { max-width: none; }
          .hba-faith-page { padding: 60px 16px 72px; }
          .hba-doctrine { padding: 20px 20px; }
          .hba-doctrine p { padding-left: 0; }
          .hba-doctrine-refs { padding-left: 0; }
          .hba-schedule-time { min-width: 80px; }
        }

        @media (max-width: 480px) {
          .hba-values-grid { grid-template-columns: 1fr 1fr; }
          .hba-hero-actions { flex-direction: column; }
          .hba-hero-actions a, .hba-hero-actions button { width: 100%; justify-content: center; }
          .hba-visit-actions { flex-direction: column; }
          .hba-visit-actions a { text-align: center; justify-content: center; }
        }
      `}</style>

      {/* ═══════════════ HEADER ═══════════════ */}
      <header className={`hba-header ${scrolled ? "scrolled" : ""}`}>
        <div className="hba-header-inner">
          <div className="hba-wordmark" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Houston Brethren Assembly
          </div>
          <div className="hba-nav">
            <ul className="hba-nav-links">
              {[
                ["about", "About"],
                ["gatherings", "Gatherings"],
                ["beliefs", "Beliefs"],
                ["heritage", "Heritage"],
                ["contact", "Contact"],
              ].map(([id, label]) => (
                <li key={id}>
                  <button className="hba-nav-link" onClick={() => scrollTo(id)}>{label}</button>
                </li>
              ))}
            </ul>
            <button className="hba-cta-btn" onClick={() => scrollTo("contact")}>
              Plan a Visit
            </button>
            <button className="hba-menu-btn" onClick={() => setMobileMenu(true)} aria-label="Open menu">
              {Icons.menu}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-overlay ${mobileMenu ? "open" : ""}`} onClick={() => setMobileMenu(false)} />
      <div className={`mobile-drawer ${mobileMenu ? "open" : ""}`}>
        <button className="mobile-drawer-close" onClick={() => setMobileMenu(false)}>{Icons.x}</button>
        <nav>
          {[
            ["about", "About"],
            ["gatherings", "Gatherings"],
            ["beliefs", "Beliefs"],
            ["heritage", "Heritage"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)}>{label}</button>
          ))}
        </nav>
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hba-hero" id="hero">
        <div className="hba-hero-inner">
          <div className="hba-hero-left">
            <p className="hba-hero-label">A community gathering in His name</p>
            <h1>Houston Brethren Assembly</h1>
            <p className="hba-hero-welcome">
              We gather to worship, serve, and walk together in the love and truth of Christ — 
              committed to the simplicity of New Testament Christianity.
            </p>
            <div className="hba-hero-verse">
              "Endeavoring to keep the unity of the Spirit in the bond of peace."
              <cite>— Ephesians 4:3</cite>
            </div>
            <div className="hba-hero-actions">
              <button className="btn-primary" onClick={() => scrollTo("gatherings")}>
                Join Us This Sunday {Icons.arrowRight}
              </button>
              <a className="btn-outline" href="https://maps.google.com/?q=2880+Broadway+Bend+Dr,+Pearland,+TX+77584" target="_blank" rel="noopener noreferrer">
                Get Directions {Icons.externalLink}
              </a>
            </div>
          </div>

          <div className="hba-visit-card">
            <p className="hba-visit-card-label">Visit Information</p>
            <div className="hba-visit-item">
              {Icons.clock}
              <div className="hba-visit-item-text">
                <strong>Sunday Service</strong>
                <small>Starts at 10:00 AM</small>
              </div>
            </div>
            <div className="hba-visit-item">
              {Icons.mapPin}
              <div className="hba-visit-item-text">
                2880 Broadway Bend Dr.,<br />
                Pearland, TX 77584 — Building 1
              </div>
            </div>
            <div className="hba-visit-item">
              {Icons.mail}
              <div className="hba-visit-item-text">
                <a href="mailto:hbabrethren@gmail.com">hbabrethren@gmail.com</a>
              </div>
            </div>
            <div className="hba-visit-item">
              {Icons.globe}
              <div className="hba-visit-item-text">
                English & Malayalam
                <small>Translation support available</small>
              </div>
            </div>
            <div className="hba-visit-actions">
              <a className="btn-sm btn-sm-primary" href="https://maps.google.com/?q=2880+Broadway+Bend+Dr,+Pearland,+TX+77584" target="_blank" rel="noopener noreferrer">
                {Icons.mapPin} Open in Maps
              </a>
              <a className="btn-sm btn-sm-outline" href="mailto:hbabrethren@gmail.com">
                {Icons.mail} Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <div style={{ background: "var(--bg)" }}>
        <section className="hba-section" id="about" data-animate>
          <div className={animClass("about")} style={{ textAlign: "center" }}>
            <p className="hba-section-label">Welcome</p>
            <h2 className="hba-section-title">A Place for Every Believer</h2>
          </div>
          <p className={`hba-welcome-text ${animClass("about")}`} style={{ transitionDelay: "0.1s" }}>
            At Houston Brethren Assembly, we gather to worship, serve, and walk together in the love
            and truth of Christ. We are a community of believers committed to the simplicity 
            of New Testament Christianity.
          </p>
          <div className="hba-pillars">
            {[
              { icon: Icons.heart, title: "Worship", desc: "Gathering in reverence to exalt our Lord through prayer, song, and the breaking of bread." },
              { icon: Icons.users, title: "Fellowship", desc: "Building genuine relationships as we encourage one another in our walk with Christ." },
              { icon: Icons.book, title: "Scripture", desc: "Diligently studying God's Word as our sole authority for faith and practice." },
            ].map((p, i) => (
              <div className={`hba-pillar ${animClass("about")}`} style={{ transitionDelay: `${0.15 + i * 0.1}s` }} key={p.title}>
                <div className="hba-pillar-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ═══════════════ PLAN YOUR VISIT ═══════════════ */}
      <div style={{ background: "var(--surface-warm)" }}>
        <section className="hba-section" id="visit" data-animate>
          <div className={animClass("visit")}>
            <p className="hba-section-label">Plan Your Visit</p>
            <h2 className="hba-section-title">What to Expect</h2>
            <p className="hba-section-desc">
              We'd love to welcome you. Here's what you need to know before visiting.
            </p>
          </div>
          <div className="hba-visit-cards">
            {[
              { icon: Icons.church, title: "A Simple Gathering", desc: "Scripture-centered worship with prayer, hymns, and the breaking of bread. No formality — just believers gathered in His name." },
              { icon: Icons.family, title: "For Families", desc: "Sunday School runs alongside the adult Bible study so children can learn at their level in a welcoming environment." },
              { icon: Icons.globe, title: "Language Support", desc: "Services are primarily in English with Malayalam translation support available for our diverse community." },
            ].map((c, i) => (
              <div className={`hba-visit-info-card ${animClass("visit")}`} style={{ transitionDelay: `${0.1 + i * 0.08}s` }} key={c.title}>
                <div className="hba-pillar-icon" style={{ marginBottom: 14 }}>{c.icon}</div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ═══════════════ GATHERINGS ═══════════════ */}
      <div style={{ background: "var(--bg)" }}>
        <section className="hba-section" id="gatherings" data-animate>
          <div className={animClass("gatherings")}>
            <p className="hba-section-label">Gather With Us</p>
            <h2 className="hba-section-title">Gatherings</h2>
            <p className="hba-section-desc" style={{ marginBottom: 32 }}>
              Join us as we meet in His name throughout the week.
            </p>
          </div>

          <div className={animClass("gatherings")} style={{ transitionDelay: "0.1s" }}>
            <div className="hba-tabs">
              <button className={`hba-tab ${gatheringTab === "sunday" ? "active" : ""}`} onClick={() => setGatheringTab("sunday")}>
                Sunday
              </button>
              <button className={`hba-tab ${gatheringTab === "weekday" ? "active" : ""}`} onClick={() => setGatheringTab("weekday")}>
                Weekday & Special
              </button>
            </div>

            <div className="hba-schedule">
              {(gatheringTab === "sunday" ? sundaySchedule : weekdaySchedule).map((item, i) => (
                <div className="hba-schedule-item" key={i}>
                  <span className="hba-schedule-time">{item.time}</span>
                  <div className="hba-schedule-info">
                    <h4>{item.title}</h4>
                    {item.note && <p>{item.note}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`hba-calendar-card ${animClass("gatherings")}`} style={{ transitionDelay: "0.15s" }}>
            <div className="hba-calendar-header">
              <h4>Monthly Schedule</h4>
              <p>View upcoming meetings and events</p>
            </div>
            <div className="hba-calendar-embed">
              <iframe
                src="https://calendar.google.com/calendar/embed?src=hbabrethren%40gmail.com&ctz=America%2FChicago"
                title="HBA Calendar"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════ BELIEFS ═══════════════ */}
      <div style={{ background: "var(--surface-warm)" }}>
        <section className="hba-section" id="beliefs" data-animate>
          <div className={animClass("beliefs")}>
            <p className="hba-section-label">What We Believe</p>
            <h2 className="hba-section-title">Our Beliefs</h2>
            <p className="hba-section-desc">
              The foundational truths we hold dear and teach from Scripture.
            </p>
          </div>
          <div className={`hba-beliefs-list ${animClass("beliefs")}`} style={{ transitionDelay: "0.1s" }}>
            {beliefsSummary.map((b, i) => (
              <div className="hba-belief-item" key={i}>
                <span className="hba-belief-num">{i + 1}</span>
                <span className="hba-belief-text">{b}</span>
              </div>
            ))}
          </div>
          <div className={animClass("beliefs")} style={{ transitionDelay: "0.15s" }}>
            <button className="btn-primary" onClick={() => { setShowFaith(true); setTimeout(() => { const el = document.getElementById("faith-page"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 50); }}>
              Read the Full Statement of Faith {Icons.arrowRight}
            </button>
          </div>
        </section>
      </div>

      {/* ═══════════════ STATEMENT OF FAITH (inline expandable) ═══════════════ */}
      {showFaith && (
        <div className="hba-faith-page" id="faith-page">
          <div className="hba-faith-inner">
            <button className="hba-faith-back" onClick={() => setShowFaith(false)}>
              ← Back to Overview
            </button>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <p className="hba-section-label">Doctrinal Foundation</p>
              <h2 className="hba-section-title">Statement of Faith</h2>
              <p className="hba-section-desc" style={{ margin: "0 auto" }}>
                We believe in the following doctrinal truths as taught in Scripture.
              </p>
            </div>
            {statementOfFaith.map((doc, i) => (
              <div className="hba-doctrine" key={i} id={`doctrine-${i}`} data-animate>
                <div className={animClass(`doctrine-${i}`)}>
                  <div className="hba-doctrine-header">
                    <span className="hba-doctrine-num">{i + 1}</span>
                    <span className="hba-doctrine-title">{doc.title}</span>
                  </div>
                  <p>{doc.text}</p>
                  <p className="hba-doctrine-refs">{doc.refs}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══════════════ MISSION & VISION ═══════════════ */}
      <div style={{ background: "var(--bg)" }}>
        <section className="hba-section" id="mission" data-animate>
          <div className={animClass("mission")} style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="hba-section-label">Our Purpose</p>
            <h2 className="hba-section-title">Mission & Vision</h2>
          </div>

          <div className={`hba-vision-cards ${animClass("mission")}`} style={{ transitionDelay: "0.1s" }}>
            <div className="hba-vision-card">
              <p className="hba-vision-card-label">Our Vision</p>
              <blockquote>
                "These things saith he that is holy, he that is true, he that hath the key of David, 
                he that openeth, and no man shutteth… I have set before thee an open door, 
                and no man can shut it…"
              </blockquote>
              <cite>— Revelation 3:7–8</cite>
            </div>
            <div className="hba-vision-card">
              <p className="hba-vision-card-label">Our Mission</p>
              <blockquote>
                "All power is given unto me in heaven and in earth. Go ye therefore, and teach all nations, 
                baptizing them in the name of the Father, and of the Son, and of the Holy Ghost…"
              </blockquote>
              <cite>— Matthew 28:18–20</cite>
            </div>
          </div>

          <div className={`hba-values-grid ${animClass("mission")}`} style={{ transitionDelay: "0.2s" }}>
            {missionValues.map((v) => (
              <div className="hba-value-card" key={v.label}>
                <div className="hba-value-icon">{v.icon}</div>
                <h4>{v.label}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ═══════════════ HERITAGE ═══════════════ */}
      <div style={{ background: "var(--surface-warm)" }}>
        <section className="hba-section" id="heritage" data-animate>
          <div className={animClass("heritage")}>
            <p className="hba-section-label">Our Heritage</p>
            <h2 className="hba-section-title">A Legacy of Faith</h2>
            <p className="hba-section-desc" style={{ marginBottom: 32 }}>
              Tracing the movement of the Spirit through history.
            </p>
          </div>

          <div className={animClass("heritage")} style={{ transitionDelay: "0.1s" }}>
            <div className="hba-tabs">
              <button className={`hba-tab ${heritageTab === "origins" ? "active" : ""}`} onClick={() => setHeritageTab("origins")}>
                Origins
              </button>
              <button className={`hba-tab ${heritageTab === "kerala" ? "active" : ""}`} onClick={() => setHeritageTab("kerala")}>
                Our Heritage in India
              </button>
            </div>

            <div className="hba-timeline">
              {(heritageTab === "origins" ? originsTimeline : keralaTimeline).map((item, i) => (
                <div className="hba-timeline-item" key={i}>
                  <p className="hba-timeline-year">{item.year}</p>
                  <p className="hba-timeline-place">{item.place}</p>
                  <p className="hba-timeline-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <div style={{ background: "var(--bg)" }}>
        <section className="hba-section" id="contact" data-animate>
          <div className={animClass("contact")} style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="hba-section-label">Get In Touch</p>
            <h2 className="hba-section-title">Contact & Location</h2>
          </div>

          <div className={`hba-contact-grid ${animClass("contact")}`} style={{ transitionDelay: "0.1s" }}>
            <div className="hba-contact-card">
              <h3>Visit Us</h3>
              <div className="hba-contact-line">
                {Icons.mapPin}
                <div>
                  2880 Broadway Bend Dr.,<br />
                  Pearland, TX 77584 — Building 1
                </div>
              </div>
              <div className="hba-contact-line">
                {Icons.mail}
                <div>
                  <a href="mailto:hbabrethren@gmail.com" style={{ color: "var(--primary)", textDecoration: "none" }}>hbabrethren@gmail.com</a>
                </div>
              </div>
              <div className="hba-contact-line">
                {Icons.mail}
                <div>
                  Mailing Address
                  <small>P.O. Box 96675, Houston, TX 77213-6675</small>
                </div>
              </div>
              <div className="hba-contact-line">
                {Icons.clock}
                <div>
                  Sunday Service
                  <small>Starting at 10:00 AM</small>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
                <a className="btn-sm btn-sm-primary" href="https://maps.google.com/?q=2880+Broadway+Bend+Dr,+Pearland,+TX+77584" target="_blank" rel="noopener noreferrer">
                  {Icons.mapPin} Get Directions
                </a>
                <a className="btn-sm btn-sm-outline" href="mailto:hbabrethren@gmail.com">
                  {Icons.mail} Email Us
                </a>
              </div>
            </div>

            <div className="hba-map-placeholder">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3470.0!2d-95.34!3d29.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z2880+Broadway+Bend+Dr,+Pearland,+TX+77584!5e0!3m2!1sen!2sus!4v1"
                title="Location Map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="hba-footer">
        <div className="hba-footer-inner">
          <div className="hba-footer-top">
            <div className="hba-footer-brand">
              <h4>Houston Brethren Assembly</h4>
              <p className="hba-footer-verse">
                "Now unto him that is able to keep you from falling, and to present you faultless 
                before the presence of his glory with exceeding joy, To the only wise God our Saviour, 
                be glory and majesty, dominion and power, both now and ever. Amen."
                <br /><span style={{ color: "var(--accent)", fontStyle: "normal", fontSize: 12, letterSpacing: "0.06em" }}>— Jude 24–25</span>
              </p>
            </div>
            <div className="hba-footer-col">
              <h5>Navigation</h5>
              <ul>
                {[["about", "About"], ["gatherings", "Gatherings"], ["beliefs", "Beliefs"], ["heritage", "Heritage"], ["contact", "Contact"]].map(([id, label]) => (
                  <li key={id}><button onClick={() => scrollTo(id)}>{label}</button></li>
                ))}
              </ul>
            </div>
            <div className="hba-footer-col">
              <h5>Visit</h5>
              <ul>
                <li><button style={{ cursor: "default", color: "rgba(255,255,255,0.6)" }}>Sunday · 10:00 AM</button></li>
                <li><button style={{ cursor: "default", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>2880 Broadway Bend Dr.<br />Pearland, TX 77584</button></li>
                <li><button onClick={() => window.open("mailto:hbabrethren@gmail.com")}>hbabrethren@gmail.com</button></li>
              </ul>
            </div>
          </div>
          <p className="hba-footer-bottom">
            © {new Date().getFullYear()} Houston Brethren Assembly. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}