/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  User, 
  Briefcase, 
  Cpu, 
  Send,
  ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";
import React from 'react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "py-4 bg-midnight/80 backdrop-blur-md border-b border-white/10" : "py-6 bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-bold tracking-tighter"
        >
          <span className="text-electric">Y</span>SHARMA<span className="text-electric text-xs align-top">®</span>
        </motion.div>
        
        <div className="hidden md:flex gap-8">
          {["About", "Experience", "Skills", "Contact"].map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="nav-link"
            >
              {item}
            </motion.a>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4"
        >
          <a href="#" className="p-2 text-gray-400 hover:text-white transition-colors"><Github size={20} /></a>
          <a href="#" className="p-2 text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
        </motion.div>
      </div>
    </nav>
  );
};

const TypingAnimation = ({ texts }: { texts: string[] }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = texts[index % texts.length];
      
      if (isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        setSpeed(50);
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && displayText === currentFullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex(index + 1);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, speed]);

  return (
    <span className="text-electric border-r-2 border-electric ml-2 animate-pulse">
      {displayText}
    </span>
  );
};

const SectionHeading = ({ children, icon: Icon, subtitle }: { children: React.ReactNode, icon: any, subtitle?: string }) => (
  <div className="mb-12">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-2 mb-2"
    >
      <div className="w-2 h-2 rounded-full bg-electric"></div>
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
        {children}
      </h2>
    </motion.div>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-gray-300 text-lg max-w-2xl leading-relaxed mt-4"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Chip = ({ children, active }: { children: React.ReactNode; active?: boolean; key?: string | number }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-default ${active ? "bg-electric/20 border border-electric/50 text-blue-300" : "bg-white/5 border border-white/10 text-gray-300 shadow-sm"}`}
  >
    {children}
  </motion.div>
);

const ExperienceCard = ({ role, company, period, description, tags }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative pl-6 border-l border-white/10 pb-12 last:pb-0"
  >
    <div className="absolute w-2 h-2 bg-electric rounded-full -left-[5px] top-1 shadow-[0_0_10px_rgba(37,99,235,0.8)]"></div>
    <div className="text-xs text-electric font-mono mb-1 uppercase tracking-widest">{period}</div>
    <h3 className="text-xl font-bold text-white mb-1">{role}</h3>
    <p className="text-gray-500 font-medium mb-4">{company}</p>
    <p className="text-gray-400 text-sm leading-relaxed mb-6">
      {description}
    </p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => (
        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-gray-600 px-2 py-1 bg-white/5 rounded border border-white/5">
          {tag}
        </span>
      ))}
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  return (
    <div className="min-h-screen bg-midnight selection:bg-electric selection:text-white relative overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="fixed top-[-100px] right-[-100px] w-[600px] h-[600px] bg-electric/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-[-50px] left-[-50px] w-[400px] h-[400px] bg-electric/10 rounded-full blur-[100px] pointer-events-none z-0" />

      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-electric z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20">
        <div className="relative z-10 max-w-7xl mx-auto px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="glass-card max-w-4xl mx-auto flex flex-col items-center text-center py-16"
          >
            <div className="mb-4 text-electric font-mono text-sm tracking-widest uppercase font-bold">
              Full Stack Developer & Architect
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold mb-6 leading-none tracking-tighter text-white">
              Yashika Sharma<span className="text-electric">.</span>
            </h1>
            <div className="h-12 md:h-16 mb-8 text-2xl md:text-3xl text-gray-400 font-light">
              Crafting
              <TypingAnimation texts={["Immersive UIs", "Scalable Systems", "Digital Experiences", "Clean Architecture"]} />
            </div>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
              Transforming complex technical requirements into elegant, high-performance digital products and seamless user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary">Download Portfolio</button>
              <button className="px-8 py-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-semibold text-sm transition-all text-white">View Projects</button>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 hidden md:block"
          >
            <ChevronDown size={32} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 max-w-7xl mx-auto px-10 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-12">
            <SectionHeading icon={User} subtitle="Engineering excellence through technical precision and creative vision.">
              Identity & Vision
            </SectionHeading>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 glass-card aspect-[4/5] relative overflow-hidden group p-0!"
          >
            <img 
              src="https://picsum.photos/seed/yashika/800/1000" 
              alt="Yashika Sharma" 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight to-transparent opacity-60" />
            <div className="absolute bottom-0 left-0 p-8">
              <p className="text-xl font-display font-medium text-white italic">"Design is not just what it looks like and feels like. Design is how it works."</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 glass-card"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Expertise Overview</h3>
            <div className="space-y-6 text-gray-400 leading-relaxed text-lg font-light">
              <p>
                My approach to software engineering is rooted in the belief that code should be as expressive as it is functional. 
                With a deep background in full-stack architecture, I focus on building systems that scale effortlessly 
                while providing end-users with intuitive, immersive interfaces.
              </p>
              <p>
                I specialize in high-performance cloud applications, Leveraging modern tools like React, Node.js, and AWS 
                to deliver robust solutions that solve real-world problems.
              </p>
              <div className="pt-8 grid grid-cols-2 gap-12 border-t border-white/10">
                <div className="space-y-1">
                  <h4 className="text-electric font-mono text-3xl font-bold">03+</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Years Prof. Exp</p>
                </div>
                <div className="space-y-1">
                  <h4 className="text-electric font-mono text-3xl font-bold">50+</h4>
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Deployments</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-10">
          <SectionHeading icon={Briefcase} subtitle="Evolution of my technical career through diverse roles and challenges.">
            Professional History
          </SectionHeading>
          
          <div className="glass-card">
            <div className="space-y-4">
              <ExperienceCard 
                role="Senior Full Stack Developer"
                company="TechInnovate Solutions"
                period="2022 - Present"
                description="Architecting high-traffic SaaS workflows, optimizing database queries for millions of records, and managing the move to serverless architectures."
                tags={["Architect", "Cloud", "Performance"]}
              />
              <ExperienceCard 
                role="Software Engineer"
                company="Global Systems Inc."
                period="2020 - 2022"
                description="Core developer for enterprise-level fintech dashboards. Implemented real-time data streaming and complex state management patterns."
                tags={["Fintech", "Scale", "Stability"]}
              />
              <ExperienceCard 
                role="Frontend Developer Intern"
                company="Creative Studio"
                period="2019 - 2020"
                description="Developed high-impact landing pages with custom shader effects and complex animations using GSAP and Three.js."
                tags={["Creative", "UI/UX", "Motion"]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 max-w-7xl mx-auto px-10 relative z-10">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-12">
            <SectionHeading icon={Cpu} subtitle="My technological toolkit for building the next generation of web applications.">
              Technical Arsenal
            </SectionHeading>
            
            <div className="glass-card shadow-none border-electric/30 bg-electric/10">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Code2 size={20} className="text-electric" /> Specialization
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Deep expertise in building reactive, component-based UIs with a strong focus on 
                state management, performance optimization, and accessibility standards.
              </p>
            </div>
          </div>

          <div className="glass-card flex flex-col gap-8">
            {[
              { label: "Frontend", skills: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind"] },
              { label: "Backend", skills: ["Node.js", "Go", "PostgreSQL", "Redis", "GraphQL"] },
              { label: "Infra", skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"] }
            ].map((group) => (
              <div key={group.label}>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{group.label}</h4>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((s, i) => <Chip key={s} active={i % 2 === 0}>{s}</Chip>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid md:grid-cols-12 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-7"
            >
              <SectionHeading icon={Mail} subtitle="Looking for a technical partner or have a project in mind? Let's talk.">
                Collaboration
              </SectionHeading>
              
              <form className="glass-card grid gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-electric transition-colors" />
                  <input type="email" placeholder="Email Address" className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-electric transition-colors" />
                </div>
                <input type="text" placeholder="Subject" className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-electric transition-colors" />
                <textarea rows={5} placeholder="Project Details" className="w-full p-4 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-electric transition-colors resize-none" />
                <button className="btn-primary w-full">Send Message</button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:col-span-5 flex flex-col gap-4"
            >
              <div className="bg-electric rounded-2xl p-10 relative overflow-hidden flex-1 shadow-2xl">
                <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <h3 className="text-3xl font-bold text-white mb-2 relative z-10">Let's build.</h3>
                <p className="text-blue-100 mb-8 relative z-10">Open for new challenges and visionary projects.</p>
                <div className="space-y-4 relative z-10">
                  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 text-white font-mono text-sm">
                    yashika.s.1624@inspiria.edu.in
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 text-center text-xs font-bold uppercase tracking-widest text-white hover:bg-white/20 transition-colors cursor-pointer">LinkedIn</div>
                    <div className="flex-1 bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 text-center text-xs font-bold uppercase tracking-widest text-white hover:bg-white/20 transition-colors cursor-pointer">GitHub</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-10 py-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 uppercase tracking-[0.3em] border-t border-white/5 relative z-10">
        <div>© {new Date().getFullYear()} DESIGNED BY Y.SHARMA</div>
        <div className="flex gap-8 mt-6 md:mt-0">
          <span>Based in New Delhi</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Status: Open for Collaboration
          </span>
        </div>
      </footer>
    </div>
  );
}

