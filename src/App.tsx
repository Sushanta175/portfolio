import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function TerminalHeader({ title = 'terminal' }: { title?: string }) {
  return (
    <div className="terminal-header">
      <div className="terminal-dot terminal-dot-red" />
      <div className="terminal-dot terminal-dot-yellow" />
      <div className="terminal-dot terminal-dot-green" />
      <span className="ml-3 font-mono text-xs text-muted">{title}</span>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="terminal-card p-4 sm:p-5">
      <div className="font-mono text-xs text-muted mb-2">{label}</div>
      <div className="font-mono text-xl sm:text-2xl text-primary mb-1">{value}</div>
    </div>
  );
}

function SkillBar({ name, level, percent }: { name: string; level: string; percent: number }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm text-secondary">{name}</span>
        <span className="font-mono text-xs text-muted">{level}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);

    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power2.out' }
      );

      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.4, ease: 'power2.out' }
      );

      gsap.fromTo('.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.6, ease: 'power2.out' }
      );

      gsap.fromTo('.hero-cta',
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, delay: 0.8, ease: 'power2.out' }
      );

      const sections = ['.leetcode-section', '.codeforces-section', '.skills-section', '.projects-section', '.approach-section', '.contact-section'];
      
      sections.forEach((section) => {
        gsap.fromTo(`${section} .reveal`,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });

      ScrollTrigger.create({
        trigger: '.leetcode-section',
        start: 'top 60%',
        onEnter: () => {
          gsap.fromTo('.stat-number',
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.5)' }
          );
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={mainRef} className="relative bg-neutral-950 min-h-screen grid-bg">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4 flex justify-between items-center bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-800">
        <div className="font-mono text-sm text-secondary">
          Sushanta<span className="hidden sm:inline"> Sahu</span>
        </div>
        <div className="hidden md:flex gap-8">
          {[
            { label: 'stats', id: 'leetcode' },
            { label: 'skills', id: 'skills' },
            { label: 'projects', id: 'projects' },
            { label: 'contact', id: 'contact' }
          ].map((item) => (
            <button 
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="font-mono text-xs text-muted hover:text-secondary transition-colors link-underline"
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="status-dot status-active" />
        </div>
      </nav>

      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        <div className="max-w-3xl text-center">
          <h1 className={`hero-title font-mono text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-primary mb-6 tracking-tight ${loaded ? '' : 'opacity-0'}`}>
            Competitive
            <br />
            Programmer
          </h1>
          <p className={`hero-subtitle font-mono text-lg md:text-xl text-secondary mb-4 ${loaded ? '' : 'opacity-0'}`}>
            & Problem Solver
          </p>
          <p className={`hero-desc text-muted max-w-lg mx-auto mb-10 leading-relaxed ${loaded ? '' : 'opacity-0'}`}>
            I turn constraints into solutions — clean code, fast algorithms, and systems that scale.
          </p>
          <button 
            onClick={() => scrollToSection('leetcode')}
            className={`hero-cta btn-minimal ${loaded ? '' : 'opacity-0'}`}
          >
            View Stats
          </button>
        </div>
      </section>

      <section id="leetcode" className="leetcode-section section-pinned">
        <div className="w-full max-w-5xl p-4 sm:p-6">
          <div className="reveal mb-8">
            <span className="font-mono text-xs text-muted">01</span>
            <h2 className="font-mono text-xl sm:text-2xl md:text-3xl text-primary mt-2">LeetCode</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="reveal terminal-card">
              <TerminalHeader title="leetcode stats" />
              <div className="p-4 sm:p-6">
                <div className="stat-number font-mono text-6xl md:text-7xl text-primary mb-2">67</div>
                <div className="font-mono text-sm text-muted mb-8">problems solved</div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-xs text-secondary">Easy</span>
                      <span className="font-mono text-xs text-muted">23</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '33%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-xs text-secondary">Medium</span>
                      <span className="font-mono text-xs text-muted">38</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '54%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-mono text-xs text-secondary">Hard</span>
                      <span className="font-mono text-xs text-muted">6</span>
                    </div>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: '13%' }} /></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal space-y-4">
              <StatCard label="Active Since" value="2024" />
              <StatCard label="Primary Languages" value="C++, Golang, Python" />
              <StatCard label="Current Streak" value="5 days" />
            </div>
          </div>
        </div>
      </section>

      <section className="codeforces-section section-pinned">
        <div className="w-full max-w-5xl px-4 sm:px-6">
          <div className="reveal mb-8">
            <span className="font-mono text-xs text-muted">02</span>
            <h2 className="font-mono text-xl sm:text-2xl md:text-3xl text-primary mt-2">Codeforces</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="reveal md:col-span-2 terminal-card">
              <TerminalHeader title="codeforces rating" />
              <div className="p-4 sm:p-6">
                <div className="stat-number font-mono text-4xl sm:text-5xl md:text-7xl text-primary mb-4">Brewing... ☕</div>
                <div className="inline-block px-3 py-1 border border-slate-700 rounded">
                  <span className="font-mono text-sm text-secondary">Aspiring Expert</span>
                </div>
              </div>
            </div>
            <div className="reveal space-y-4">
              <StatCard label="Contests" value="Yet to conquer..." />
              <StatCard label="Max Rating" value="On the rise..." />
              <StatCard label="Percentile" value="Calibrating..." />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="skills-section section-pinned">
        <div className="w-full max-w-4xl px-4 sm:px-6">
          <div className="reveal mb-8">
            <span className="font-mono text-xs text-muted">03</span>
            <h2 className="font-mono text-xl sm:text-2xl md:text-3xl text-primary mt-2">Skills</h2>
          </div>
          <div className="reveal terminal-card">
            <TerminalHeader title="languages & tools" />
            <div className="p-4 sm:p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                <SkillBar name="C++" level="Intermediate" percent={70} />
                <SkillBar name="Python" level="Intermediate" percent={75} />
                <SkillBar name="Golang" level="Intermediate" percent={65} />
                <SkillBar name="JavaScript" level="Beginner" percent={25} />
                <SkillBar name="SQL" level="Proficient" percent={70} />
                <SkillBar name="Git" level="Advanced" percent={85} />
                <SkillBar name="Linux" level="Proficient" percent={75} />
                <SkillBar name="Scripting" level="Intermediate" percent={70} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects-section section-pinned">
        <div className="w-full max-w-5xl px-4 sm:px-6">
          <div className="reveal mb-8">
            <span className="font-mono text-xs text-muted">04</span>
            <h2 className="font-mono text-xl sm:text-2xl md:text-3xl text-primary mt-2">Projects</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'PixScout', desc: 'Go-based client for Pexels API enabling seamless photo/video search and metadata retrieval. Implemented rate-limiting and optimized API calls, improving reliability by 25%.', tech: ['Go', 'REST API', 'Pexels API'], lines: '430' },
              { name: 'Contest CLI', desc: 'Terminal helper for Codeforces and LeetCode. Fetch problems, track progress, analyze performance.', tech: ['Python', 'Click', 'REST API'], lines: '1,234' },
              { name: 'Pexels Web Service & DevOps Pipeline', desc: 'Developed and deployed a scalable web service using Go with Docker and Kubernetes on GCP. Built CI/CD pipeline and auto-scaling system, reducing deployment time by 40%.', tech: ['Go', 'Docker', 'Kubernetes', 'GCP', 'CI/CD'], lines: '275' }
            ].map((project, i) => (
              <div key={i} className="reveal terminal-card hover:border-slate-700 hover:scale-[1.01] transition-colors">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-mono text-lg text-primary">{project.name}</h3>
                    <span className="font-mono text-xs text-muted">{project.lines} lines</span>
                  </div>
                  <p className="text-secondary text-sm leading-relaxed mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="font-mono text-xs px-2 py-1 bg-gray-900 text-muted rounded">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="approach-section section-pinned">
        <div className="w-full max-w-3xl px-4 sm:px-6">
          <div className="reveal mb-8">
            <span className="font-mono text-xs text-muted">05</span>
            <h2 className="font-mono text-xl sm:text-2xl md:text-3xl text-primary mt-2">Approach</h2>
          </div>
          <div className="reveal">
            <p className="text-xl sm:text-2xl md:text-3xl text-primary leading-relaxed mb-8">
              I build systems that don't break under pressure.
            </p>
            <div className="code-block mb-8">
              <span className="text-muted">// workflow</span><br />
              <span className="text-secondary">read constraints</span><br />
              <span className="text-secondary">prove edge cases</span><br />
              <span className="text-secondary">write clean code</span><br />
              <span className="text-secondary">optimize</span>
            </div>
            <button onClick={() => scrollToSection('contact')} className="btn-minimal">Get in Touch</button>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section section-pinned">
        <div className="w-full max-w-3xl px-4 sm:px-6">
          <div className="reveal mb-8">
            <span className="font-mono text-xs text-muted">06</span>
            <h2 className="font-mono text-xl sm:text-2xl md:text-3xl text-primary mt-2">Contact</h2>
          </div>
          <div className="reveal">
            <p className="text-secondary mb-8 leading-relaxed">
              Open to software engineering roles, freelance systems work, and interesting collaborations.
            </p>
            <div className="terminal-card mb-8">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-mono text-sm text-muted">Email</span>
                  <a 
                    href="https://mail.google.com/mail/?view=cm&to=sushantasahu175@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-primary hover:text-white transition-colors link-underline"
                  >
                    sushantasahu175@gmail.com
                  </a>
                </div>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  {[
                    {
                      name: 'GitHub',
                      link: 'https://github.com/Sushanta175'
                    },
                    {
                      name: 'LinkedIn',
                      link: 'https://www.linkedin.com/in/sushanta-sahu-5aa981258' 
                    },
                    {
                      name: 'Codeforces',
                      link: 'https://codeforces.com/profile/Sushanta_Sahu'
                    },
                    {
                      name: 'LeetCode',
                      link: 'https://leetcode.com/u/aspfx6Rvsw/'
                    }
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs px-4 py-3 border border-slate-700 text-muted hover:text-secondary hover:border-slate-500 transition transform hover:scale-105"
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <p className="font-mono text-xs text-dim">© 2026</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
