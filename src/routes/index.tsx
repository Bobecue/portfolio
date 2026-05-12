import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  ArrowUpRight,
  Code2,
  Network,
  Globe,
  Palette,
  Wrench,
  GraduationCap,
  Trophy,
  Mail,
  Phone,
  MapPin,
  Sparkles,
  CircuitBoard,
  Cpu,
  Layers,
  Terminal,
  Activity,
} from "lucide-react";
import portrait from "@/assets/moses-portrait.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Moses Salivio — Engineering Solutions" },
      {
        name: "description",
        content:
          "Engineering solutions from circuits to code. Bridging hardware thinking and software execution.",
      },
      { property: "og:title", content: "Moses Salivio — Engineering Solutions" },
      {
        property: "og:description",
        content: "Bridging hardware thinking and software execution. Portfolio in deep charcoal & safety orange.",
      },
    ],
  }),
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function Reveal({
  children,
  delay = 0,
  className = "",
  layoutId,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  layoutId?: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay }}
      className={`${className} will-change-transform`}
      layoutId={layoutId}
    >
      {children}
    </motion.div>
  );
}

function SystemMonitoring() {
  const [time, setTime] = useState("");
  const [latency, setLatency] = useState(24);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utc8 = new Date(now.getTime() + (8 * 60 * 60 * 1000));
      const hours = String(utc8.getUTCHours()).padStart(2, '0');
      const minutes = String(utc8.getUTCMinutes()).padStart(2, '0');
      const seconds = String(utc8.getUTCSeconds()).padStart(2, '0');
      setTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    const latTimer = setInterval(() => {
      setLatency(Math.floor(Math.random() * (42 - 18 + 1) + 18));
    }, Math.random() * (5000 - 3000) + 3000);

    return () => {
      clearInterval(timer);
      clearInterval(latTimer);
    };
  }, []);

  return (
    <div className="hidden md:flex items-center gap-6 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
      <div className="flex flex-col">
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">System Time</span>
        <span className="font-mono text-[10px] text-white/80 tabular-nums">UTC+8 {time}</span>
      </div>
      <div className="h-6 w-px bg-white/10" />
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">Network Status</span>
          <span className="font-mono text-[10px] text-white/80 tabular-nums uppercase">Latency: {latency}ms</span>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-green shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
      </div>
    </div>
  );
}

function TerminalBio() {
  const [screenIndex, setScreenIndex] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const screens = [
    {
      title: "Identity",
      lines: [
        "moses@portfolio:~$ whoami",
        "Moses Andrew Salivio",
        "Computer Engineering Student | CIT-U 2028 | Mandaue, Cebu, PH"
      ]
    },
    {
      title: "Summary",
      lines: [
        "moses@portfolio:~$ cat summary.txt",
        "CpE student with hands-on experience in systems-level programming,",
        "network infrastructure, and full-stack web development.",
        "Proficient in C++, TypeScript, and React.",
        "Familiar with Linux, Git, and Cisco networking.",
        "Eager to contribute to production-grade backend systems and data pipelines."
      ]
    },
    {
      title: "Experience",
      lines: [
        "moses@portfolio:~$ cat experience.txt",
        "[2023–2024] Creative Lead — USC CpE Creatives",
        "  → Led technical ops: live stream infra (OBS), real-time troubleshooting",
        "  → Enforced quality standards across 10+ campaigns and digital assets",
        "  → Coordinated cross-functional teams under strict deadlines",
        "",
        "[2021–2024] Student Council — Technical & Operations",
        "  → Managed team workflows across multiple academic organizations",
        "  → Executed cross-team projects with minimal supervision"
      ]
    },
    {
      title: "Projects",
      lines: [
        "moses@portfolio:~$ cat projects.txt",
        "[1] Local Athlete Spotlight — TypeScript, React, Vite, Node.js, Tailwind",
        "    github.com/Bobecue/local-athlete-spotlight | 29 commits",
        "    → Full-stack app: React/TS frontend + dedicated Node.js backend",
        "    → 97%+ strict TypeScript coverage, production-grade structure",
        "",
        "[2] Network Infrastructure — Cisco, Subnetting, Routing Protocols",
        "    → Configured topologies, static/dynamic routing, infra troubleshooting",
        "",
        "[3] Systems & OOP — C++, C#, Java",
        "    → Data structures, memory management, backend logic in .NET"
      ]
    },
    {
      title: "Skills",
      lines: [
        "moses@portfolio:~$ cat skills.txt",
        "Languages:      C++  C#  Java  JavaScript  TypeScript  Python(learning)",
        "Web/Backend:    React  Node.js  Next.js  REST APIs  Tailwind CSS",
        "Infrastructure: Linux  Git  Cisco  TCP/IP  Subnetting  OBS",
        "Methodologies:  OOP  Agile  Cross-functional collaboration",
        "",
        "moses@portfolio:~$ _"
      ]
    }
  ];

  const currentLines = screens[screenIndex].lines;

  const handleNext = () => {
    if (isTyping) return;
    if (screenIndex < screens.length - 1) {
      setScreenIndex(prev => prev + 1);
      setLineIndex(0);
      setCharIndex(0);
      setShowPrompt(false);
      setIsTyping(true);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStarted) {
          setIsStarted(true);
          setIsTyping(true);
        }
      },
      { threshold: 0.5 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isStarted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showPrompt) {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showPrompt, screenIndex]);

  useEffect(() => {
    if (!isStarted || !isTyping || lineIndex >= currentLines.length) {
      if (lineIndex >= currentLines.length && screenIndex < screens.length - 1) {
        setShowPrompt(true);
        setIsTyping(false);
      }
      return;
    }

    if (charIndex < currentLines[lineIndex].length) {
      const timeout = setTimeout(() => {
        setCharIndex(prev => prev + 1);
      }, 20);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setLineIndex(prev => prev + 1);
        setCharIndex(0);
      }, lineIndex === 0 ? 400 : 100);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex, isStarted, isTyping, screenIndex]);

  return (
    <div 
      ref={containerRef} 
      onClick={showPrompt ? handleNext : undefined}
      className={`terminal-window w-full min-h-[450px] font-mono text-sm mt-8 cursor-pointer transition-all duration-300 ${isTyping ? 'opacity-90' : 'opacity-100'}`}
    >
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-dot bg-[#ff5f56]" />
          <div className="terminal-dot bg-[#ffbd2e]" />
          <div className="terminal-dot bg-[#27c93f]" />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-[10px] text-white/20 uppercase tracking-[0.3em]">
          bash — {screenIndex + 1} / {screens.length}
        </div>
      </div>
      <div className="p-8 text-white/80 relative min-h-[400px] flex flex-col">
        <div className="scanline" />
        <div className="flex-1">
          {currentLines.slice(0, lineIndex).map((line, i) => (
            <div key={i} className={`${line.startsWith("moses@") ? "text-orange" : "text-white/60"} ${line === "" ? "h-4" : "mb-1.5"}`}>
              {line}
            </div>
          ))}
          {lineIndex < currentLines.length && (
            <div className={currentLines[lineIndex].startsWith("moses@") ? "text-orange" : "text-white/60"}>
              {currentLines[lineIndex].substring(0, charIndex)}
              <span className="cursor-blink" />
            </div>
          )}
        </div>
        
        <AnimatePresence>
          {showPrompt && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 text-white/20 text-xs animate-pulse flex items-center justify-between"
            >
              <span>Press Enter to continue →</span>
              <span className="text-[10px] uppercase tracking-widest hidden md:block">Click anywhere to advance</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NetworkTopology() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-15 overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 400 300">
        {/* Connections */}
        {[
          [100, 150, 200, 80],
          [100, 150, 200, 220],
          [200, 80, 300, 150],
          [200, 220, 300, 150],
          [200, 80, 200, 220],
        ].map(([x1, y1, x2, y2], i) => (
          <motion.line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="var(--orange)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.5,
            }}
          />
        ))}
        {/* Nodes */}
        {[
          [100, 150], [200, 80], [200, 220], [300, 150], [200, 150]
        ].map(([cx, cy], i) => (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r="4"
            fill="var(--orange)"
            animate={{ r: [4, 6, 4], opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`${className} will-change-transform`}
    >
      {children}
    </motion.div>
  );
}

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  const letters = text.split("");
  return (
    <span className="inline-block overflow-hidden align-bottom">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.03,
          }}
          className="inline-block whitespace-pre will-change-transform"
        >
          {letter}
        </motion.span>
      ))}
    </span>
  );
}

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(springY, [-500, 500], [10, -10]);
  const rotateY = useTransform(springX, [-500, 500], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX - innerWidth / 2);
      mouseY.set(clientY - innerHeight / 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] text-foreground cursor-none md:cursor-auto">
      {/* GLOW MASK */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-30 opacity-40 mix-blend-soft-light will-change-transform"
        style={{
          background: useTransform(
            [springX, springY],
            ([x, y]) =>
              `radial-gradient(600px circle at ${Number(x) + window.innerWidth / 2}px ${
                Number(y) + window.innerHeight / 2
              }px, rgba(255, 79, 0, 0.15), transparent 80%)`
          ),
        }}
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <a href="#top" className="font-display text-xl font-bold tracking-tight text-white">
            MS<span className="text-orange">.</span>
          </a>
          <div className="flex items-center gap-8">
            <div className="hidden items-center gap-10 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 lg:flex">
              <a href="#work" className="hover:text-orange transition-colors">Solutions</a>
              <a href="#about" className="hover:text-orange transition-colors">Approach</a>
              <a href="#contact" className="hover:text-orange transition-colors">Contact</a>
            </div>
            <SystemMonitoring />
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="top"
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center px-6 overflow-hidden"
      >
        <motion.div 
          style={{ rotateX, rotateY, perspective: 1000 }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <div className="retro-grid-perspective" />
        </motion.div>
        
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/5 blur-[120px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto w-full max-w-5xl text-center will-change-transform"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-5 py-2 backdrop-blur-xl"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
              System Status: High Performance
            </span>
          </motion.div>

          <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[1.1] tracking-tight text-white text-balance">
            <SplitText text="Engineering solutions from" delay={0.2} /> <br />
            <span className="text-orange">
              <SplitText text="circuits to code." delay={0.8} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.4, duration: 1 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-white/40 font-light leading-relaxed"
          >
            Bridging hardware thinking and software execution to build
            robust, scalable, and high-performance systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            <MagneticButton>
              <a
                href="/resume.pdf"
                target="_blank"
                className="shimmer-btn group relative block overflow-hidden rounded-full bg-orange px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Resume <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </MagneticButton>
            
            <MagneticButton>
              <a
                href="#contact"
                className="group relative block px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-all hover:text-white"
              >
                Start Project
                <div className="absolute bottom-0 left-0 h-px w-0 bg-orange transition-all group-hover:w-full" />
              </a>
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/20">Scroll</span>
        </div>
      </section>

      {/* BENTO PROJECTS */}
      <section id="work" className="relative px-6 py-40 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-24">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-px w-12 bg-orange" />
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange font-bold">
                01 — Case Studies
              </div>
            </div>
            <h2 className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl">
              Engineered <br />
              <span className="text-white/20 italic">at scale.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-[700px]">
            {/* Project 1: Real-Time Event Ops */}
            <Reveal className="md:col-span-4 md:row-span-1 h-full">
              <div className="glass-card group relative h-full min-h-[350px] overflow-hidden rounded-[32px] p-10 flex flex-col justify-between">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                  <CircuitBoard className="w-32 h-32 text-orange" />
                </div>
                <div>
                  <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
                    <div className="h-1 w-1 rounded-full bg-orange animate-pulse" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">Infrastructure</span>
                  </div>
                  <h3 className="font-display text-4xl font-bold text-white mb-4">Real-Time Event Ops</h3>
                  <p className="max-w-md text-white/40 leading-relaxed font-light">
                    Mission-critical technical operations for high-stakes environments. 
                    Managed OBS infrastructure and performed real-time troubleshooting to maintain system uptime.
                  </p>
                </div>
                <div className="flex items-center justify-between pt-10">
                  <div className="flex gap-4 font-mono text-[10px] text-white/30 uppercase tracking-widest">
                    <span>Performance</span>
                    <span>Monitoring</span>
                  </div>
                  <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-orange group-hover:border-orange transition-all">
                    <ArrowUpRight className="w-5 h-5 group-hover:text-black transition-colors" />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Project 2: Local Athlete Spotlight */}
            <Reveal delay={0.1} className="md:col-span-2 md:row-span-2 h-full">
              <div className="glass-card group relative h-full min-h-[400px] overflow-hidden rounded-[32px] p-10 flex flex-col justify-between border-orange/10">
                <div className="absolute top-4 right-4 z-10">
                   <div className="bg-orange/10 border border-orange/30 px-3 py-1 rounded-full text-[8px] font-bold text-orange tracking-widest pulse-orange">
                     29 PRODUCTION COMMITS
                   </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-orange/5 to-transparent" />
                <div>
                  <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
                    <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">Full-Stack</span>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-4">Local Athlete Spotlight</h3>
                  <p className="text-white/40 leading-relaxed font-light">
                    Architected a full-stack React/Node.js app with 97% TypeScript coverage to showcase rising talent.
                  </p>
                  
                  {/* Tech Stack Row */}
                  <div className="mt-8 flex flex-wrap gap-4">
                    {[
                      { icon: Globe, name: 'React' },
                      { icon: Cpu, name: 'Node.js' },
                      { icon: Code2, name: 'TypeScript' }
                    ].map(tech => (
                      <div key={tech.name} className="flex items-center gap-2">
                        <tech.icon className="w-4 h-4 text-orange" />
                        <span className="font-mono text-[8px] uppercase tracking-widest text-white/50" style={{ fontVariant: 'small-caps' }}>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="mt-10 grid grid-cols-2 gap-4">
                    <div className="h-32 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-orange/20 transition-all">
                      <Cpu className="w-8 h-8 text-white/10" />
                    </div>
                    <div className="h-32 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-orange/20 transition-all">
                      <Layers className="w-8 h-8 text-white/10" />
                    </div>
                  </div>
                  <a 
                    href="https://github.com/Bobecue/local-athlete-spotlight" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] text-orange uppercase tracking-widest hover:translate-x-1 transition-transform"
                  >
                    <span>Explore System</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Project 3: Network Infrastructure Design */}
            <Reveal delay={0.2} className="md:col-span-4 md:row-span-1 h-full">
              <div className="glass-card group relative h-full min-h-[300px] overflow-hidden rounded-[32px] p-10 flex flex-col justify-between">
                <NetworkTopology />
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                  <div>
                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 backdrop-blur-md">
                      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">Networking</span>
                    </div>
                    <h3 className="font-display text-4xl font-bold text-white mb-4">Network Infrastructure</h3>
                    <p className="max-w-sm text-white/40 leading-relaxed font-light">
                      Configuring network topologies using Cisco equipment, subnetting, and routing protocols—foundational for edge-to-cloud management.
                    </p>
                  </div>
                  <div className="flex-1 max-w-[200px] h-32 rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden relative group-hover:border-orange/30 transition-all">
                     <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,var(--orange)_1px,transparent_1px)] bg-[length:16px_16px]" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TECHNICAL CORE */}
      <section id="stack" className="relative px-6 py-40 border-t border-white/5 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-20">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-px w-12 bg-orange" />
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange font-bold">
                02 — Technical Core
              </div>
            </div>
            <h2 className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl">
              Languages <span className="text-white/20">&</span> <br />
              <span className="text-orange italic">Tooling.</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['C++', 'C#', 'Java', 'JS', 'TS', 'Python'].map((lang, i) => (
              <Reveal key={lang} delay={i * 0.05}>
                <div className="glass-card group flex flex-col items-center justify-center p-8 rounded-2xl">
                  <span className="font-display text-2xl font-bold text-white/60 group-hover:text-orange transition-colors">{lang}</span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.4} className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              { title: 'Version Control', value: 'Git (29+ Commits)', icon: Sparkles },
              { title: 'Environment', value: 'Linux Systems', icon: Cpu },
              { title: 'Methodology', value: 'Agile Rituals', icon: Layers },
            ].map((tool) => (
              <div key={tool.title} className="glass-card p-8 rounded-2xl flex items-center gap-6">
                <tool.icon className="w-6 h-6 text-orange" />
                <div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30 mb-1">{tool.title}</div>
                  <div className="font-display text-lg font-bold text-white">{tool.value}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* EVOLUTION / ABOUT */}
      <section id="about" className="relative px-6 py-40 border-t border-white/5">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-24 items-center">
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-orange" />
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-orange font-bold">
                03 — Evolution
              </div>
            </div>
            <h2 className="font-display text-5xl font-bold tracking-tight text-white mb-10">
              Terminal <br />
              <span className="text-white/20 italic">Command</span> center.
            </h2>
            <TerminalBio />
          </Reveal>

          <Reveal delay={0.2} className="relative">
             <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 relative group">
                <img 
                  src={portrait} 
                  alt="Moses Salivio" 
                  loading="lazy"
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-10 left-10">
                  <div className="font-display text-2xl font-bold text-white mb-1">Moses Salivio</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-orange uppercase" style={{ fontVariant: 'small-caps' }}>Athlete of the Year</div>
                </div>
             </div>
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange/10 blur-[80px] -z-10" />
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative px-6 py-40 bg-[#0a0a0a]">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-6xl font-bold tracking-tight text-white mb-8">
              Let's build the <br />
              <span className="text-orange">future of engineering.</span>
            </h2>
            <p className="text-white/40 text-lg font-light mb-12">
              Ready to collaborate on complex systems or innovative software? 
              Reach out and let's start the conversation.
            </p>
            <div className="flex flex-col items-center gap-8">
              <a 
                href="mailto:saliviomosesandrew8@gmail.com"
                className="text-2xl font-display font-medium text-white hover:text-orange transition-colors underline underline-offset-8 decoration-white/10 hover:decoration-orange"
              >
                saliviomosesandrew8@gmail.com
              </a>
              <div className="flex gap-10">
                <a href="https://github.com/Bobecue" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </Reveal>
        </div>

        <footer className="mt-40 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
            © 2026 Moses Salivio — All Rights Reserved
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20">
            Engineered in Cebu, PH
          </div>
        </footer>
      </section>
    </main>
  );
}
