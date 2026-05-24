import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Github, Linkedin, Mail, Code2, Trophy,
  Menu, X, ChevronDown, ArrowRight,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────── */

const NAV_ITEMS = [
  { label: 'Stats', id: 'stats' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const SKILLS: Record<string, string[]> = {
  Languages: ['C++', 'Python', 'Go', 'JavaScript', 'SQL'],
  'Tools & DevOps': ['Git', 'Docker', 'Kubernetes', 'Linux', 'GCP', 'CI/CD'],
  Concepts: ['Data Structures', 'Algorithms', 'System Design', 'REST APIs', 'Scripting'],
};

const PROJECTS = [
  {
    name: 'Pexels Web Service & DevOps Pipeline',
    desc: 'Developed and deployed a scalable web service using Go with Docker and Kubernetes on GCP. Built CI/CD pipeline and auto-scaling system, reducing deployment time by 40%.',
    tech: ['Go', 'Docker', 'Kubernetes', 'GCP', 'CI/CD'],
    featured: true,
  },
  {
    name: 'PixScout',
    desc: 'Go-based client for Pexels API enabling seamless photo/video search and metadata retrieval. Implemented rate-limiting and optimized API calls, improving reliability by 25%.',
    tech: ['Go', 'REST API', 'Pexels API'],
    featured: false,
  },
  {
    name: 'Contest CLI',
    desc: 'Terminal helper for Codeforces and LeetCode. Fetch problems, track progress, analyze performance — all from the command line.',
    tech: ['Python', 'Click', 'REST API'],
    featured: false,
  },
];

const SOCIALS = [
  { name: 'GitHub', link: 'https://github.com/Sushanta175', icon: <Github size={20} /> },
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/sushanta-sahu-5aa981258', icon: <Linkedin size={20} /> },
  { name: 'LeetCode', link: 'https://leetcode.com/u/aspfx6Rvsw/', icon: <Code2 size={20} /> },
  { name: 'Codeforces', link: 'https://codeforces.com/profile/Sushanta_Sahu', icon: <Trophy size={20} /> },
];


/* ─── Animated Counter ─────────────────────────────────────── */

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => setCount(Math.round(obj.val)),
          });
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}</span>;
}


/* ─── App ──────────────────────────────────────────────────── */

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);

  /* Scroll state for navbar */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll-spy for active nav link */
  useEffect(() => {
    const ids = ['stats', 'skills', 'projects', 'contact'];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* GSAP entrance animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero stagger */
      gsap.fromTo('.hero-photo',    { opacity: 0, scale: 0.8 },  { opacity: 1, scale: 1, duration: 1, delay: 0.1, ease: 'back.out(1.4)' });
      gsap.fromTo('.hero-badge',    { opacity: 0, y: 10 },       { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out' });
      gsap.fromTo('.hero-title',    { opacity: 0, y: 40 },       { opacity: 1, y: 0, duration: 1, delay: 0.35, ease: 'power3.out' });
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 30 },       { opacity: 1, y: 0, duration: 0.8, delay: 0.55, ease: 'power3.out' });
      gsap.fromTo('.hero-desc',     { opacity: 0, y: 20 },       { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out' });
      gsap.fromTo('.hero-cta',      { opacity: 0, y: 20 },       { opacity: 1, y: 0, duration: 0.8, delay: 0.85, ease: 'power3.out' });
      gsap.fromTo('.hero-scroll',   { opacity: 0 },              { opacity: 1, duration: 0.6, delay: 1.4, ease: 'power2.out' });

      /* Section reveals */
      const sections = ['.stats-section', '.skills-section', '.projects-section', '.approach-section', '.contact-section'];
      sections.forEach((section) => {
        gsap.fromTo(
          `${section} .reveal`,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div ref={mainRef} className="relative min-h-screen dot-grid-bg">
      {/* ── Ambient orbs ─────────────────────────────────── */}
      <div className="orb orb-violet" aria-hidden="true" />
      <div className="orb orb-cyan" aria-hidden="true" />
      <div className="orb orb-emerald" aria-hidden="true" />

      {/* ── Navigation ───────────────────────────────────── */}
      <nav className={`nav-glass ${scrolled ? 'nav-scrolled' : ''}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex justify-between items-center">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="font-mono text-sm font-semibold gradient-text tracking-wide">
            SS
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link ${activeSection === item.id ? 'nav-link-active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="status-pulse" title="Available for work" />
            <button
              className="md:hidden text-slate-400 hover:text-white transition-colors z-50 relative"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu overlay ──────────────────────────── */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="mobile-menu-link"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center justify-center relative px-5 sm:px-8 pt-20" id="hero">
        <div className="text-center max-w-3xl relative z-10">
          {/* Profile photo */}
          <div className="hero-photo mb-8 opacity-0">
            <div className="profile-glow mx-auto">
              <div className="profile-inner">
                <img src="/images/my_photo.png" alt="Sushanta Sahu" className="profile-image" />
              </div>
            </div>
          </div>

          {/* Open to Work badge */}
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-6 opacity-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-mono">Open to Work</span>
          </div>

          {/* Name */}
          <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-bold mb-4 tracking-tight opacity-0">
            <span className="text-slate-100">Sushanta </span>
            <span className="gradient-text">Sahu</span>
          </h1>

          {/* Title */}
          <p className="hero-subtitle font-mono text-lg md:text-xl text-slate-400 mb-6 opacity-0">
            Competitive Programmer &amp; Problem Solver
          </p>

          {/* Description */}
          <p className="hero-desc text-slate-500 max-w-lg mx-auto mb-10 leading-relaxed opacity-0">
            I turn constraints into solutions — clean code, fast algorithms, and systems that scale.
          </p>

          {/* CTAs */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center opacity-0">
            <button onClick={() => scrollTo('projects')} className="btn-primary">
              View My Work <ArrowRight size={16} />
            </button>
            <button onClick={() => scrollTo('contact')} className="btn-outline">
              Get in Touch
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0">
          <ChevronDown size={24} className="text-slate-600 animate-bounce" />
        </div>
      </section>


      {/* ── LeetCode Stats ───────────────────────────────── */}
      <section id="stats" className="stats-section section-base">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-12">
            <span className="font-mono text-xs text-violet-400/60">01</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              <span className="gradient-text">LeetCode</span> Stats
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Main stat card */}
            <div className="reveal glass-card p-6 sm:p-8">
              <div className="text-6xl md:text-8xl font-bold gradient-text mb-2">
                <AnimatedCounter target={67} />
              </div>
              <div className="text-slate-500 font-mono text-sm mb-10">problems solved</div>

              {/* Difficulty breakdown */}
              <div className="space-y-5">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-emerald-400 font-mono">Easy</span>
                    <span className="text-xs text-slate-500 font-mono">23</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill progress-easy" style={{ width: '33%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-amber-400 font-mono">Medium</span>
                    <span className="text-xs text-slate-500 font-mono">38</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill progress-medium" style={{ width: '54%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-rose-400 font-mono">Hard</span>
                    <span className="text-xs text-slate-500 font-mono">6</span>
                  </div>
                  <div className="progress-bar"><div className="progress-fill progress-hard" style={{ width: '13%' }} /></div>
                </div>
              </div>
            </div>

            {/* Side stats */}
            <div className="reveal space-y-4">
              <div className="glass-card p-6">
                <div className="font-mono text-xs text-slate-500 mb-2">Active Since</div>
                <div className="text-2xl font-bold text-slate-200">2024</div>
              </div>
              <div className="glass-card p-6">
                <div className="font-mono text-xs text-slate-500 mb-2">Primary Languages</div>
                <div className="text-xl font-bold text-slate-200">C++, Go, Python</div>
              </div>
              <div className="glass-card p-6">
                <div className="font-mono text-xs text-slate-500 mb-2">Current Streak</div>
                <div className="text-2xl font-bold gradient-text">5 days 🔥</div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── Skills ───────────────────────────────────────── */}
      <section id="skills" className="skills-section section-base">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-12">
            <span className="font-mono text-xs text-violet-400/60">02</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Skills &amp; <span className="gradient-text">Technologies</span>
            </h2>
          </div>

          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} className="reveal mb-10">
              <h3 className="font-mono text-sm text-slate-500 mb-4 uppercase tracking-wider">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span key={skill} className="skill-badge">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ── Projects ─────────────────────────────────────── */}
      <section id="projects" className="projects-section section-base">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-12">
            <span className="font-mono text-xs text-violet-400/60">03</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Featured <span className="gradient-text">Projects</span>
            </h2>
          </div>

          <div className="space-y-6">
            {PROJECTS.map((project, i) => (
              <div key={i} className="reveal glass-card glass-card-hover group p-6 md:p-8 relative overflow-hidden">
                {project.featured && (
                  <span className="absolute top-4 right-4 text-xs font-mono px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    Featured
                  </span>
                )}
                <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-3 group-hover:text-white transition-colors pr-24">
                  {project.name}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-5 max-w-2xl">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Approach ─────────────────────────────────────── */}
      <section className="approach-section section-base">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <div className="reveal mb-12">
            <span className="font-mono text-xs text-violet-400/60">04</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              My <span className="gradient-text">Approach</span>
            </h2>
          </div>

          <div className="reveal">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug mb-10 gradient-text">
              I build systems that don't break under pressure.
            </p>

            <div className="code-block mb-10">
              <div className="code-block-inner">
                <span className="text-slate-600">{'// workflow'}</span><br />
                <span className="text-violet-400">const</span>{' '}
                <span className="text-cyan-300">approach</span>{' = ['}<br />
                <span className="ml-6 text-emerald-400">{'"read constraints"'}</span>,<br />
                <span className="ml-6 text-emerald-400">{'"prove edge cases"'}</span>,<br />
                <span className="ml-6 text-emerald-400">{'"write clean code"'}</span>,<br />
                <span className="ml-6 text-emerald-400">{'"optimize"'}</span>,<br />
                {'];'}
              </div>
            </div>

            <button onClick={() => scrollTo('contact')} className="btn-primary">
              Let's Connect <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>


      {/* ── Contact ──────────────────────────────────────── */}
      <section id="contact" className="contact-section section-base">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <div className="reveal mb-12">
            <span className="font-mono text-xs text-violet-400/60">05</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2">
              Get in <span className="gradient-text">Touch</span>
            </h2>
          </div>

          <div className="reveal">
            <p className="text-slate-400 mb-10 text-lg leading-relaxed max-w-lg mx-auto">
              Open to software engineering roles, freelance systems work, and interesting collaborations.
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&to=sushantasahu175@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex mb-10"
            >
              <Mail size={18} />
              sushantasahu175@gmail.com
            </a>

            <div className="flex justify-center gap-4 mb-16">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="relative z-10 py-8 border-t border-white/5 text-center">
        <p className="text-slate-600 text-xs font-mono">
          © 2026 Sushanta Sahu — Built with React &amp; GSAP
        </p>
      </footer>
    </div>
  );
}

export default App;
