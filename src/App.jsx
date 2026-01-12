import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Sun,
  Moon,
  Mail,
  MapPin,
  Award,
  Users,
  PenTool,
  Menu,
  X,
  Linkedin,
  Heart,
  Camera,
  Palette,
  Plane,
  Sparkles,
  ArrowUpRight,
  Rocket,
  BookOpen,
  Globe,
  CheckCircle,
  MessageSquare,
  Briefcase,
  GraduationCap,
} from "lucide-react";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, default to light if none
    if (localStorage.theme === "dark") return true;
    if (localStorage.theme === "light") return false;
    return false; // Default to light
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  // Sync 'dark' class to <html> and persist in localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDarkMode]);

  // Optional: Listen for system changes, but only if no preference saved
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (!localStorage.theme) {
        setIsDarkMode(mediaQuery.matches);
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "experience",
        "leadership",
        "education",
        "achievements",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const skills_ribbon = [
    "Strategic Communication",
    "HR Operations",
    "Leadership",
    "TruStudents Co-Founder",
    "Content Strategy",
    "Event Coordination",
    "Decision Making",
    "Financial Services",
    "Public Speaking",
  ];

  const experience = [
    {
      role: "Communication Strategist & Content Writer",
      company: "SafalUday Foundation",
      period: "Ongoing",
      details: [
        "Designed strategic communication plans for social-impact campaigns.",
        "Developed content for digital platforms and NGO reports.",
        "Collaborated with PR teams to align messaging with organizational goals.",
        "Managed website and social media visibility.",
      ],
    },
    {
      role: "Human Resource Intern",
      company: "The Entrepreneurship Network",
      period: "Jul 2024 - Oct 2024",
      details: [
        "Screened 150+ resumes and supported preliminary interview processes.",
        "Assisted in candidate evaluation and documentation.",
        "Maintained recruitment records and professional follow-ups.",
        "Supported day-to-day HR operations and workflows.",
      ],
    },
  ];

  return (
    <div className="min-h-screen transition-colors duration-700 overflow-x-hidden w-full selection:bg-blue-500 selection:text-white">
      {/* Dynamic Background with Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fafafa] dark:bg-[#050505]">
        <motion.div style={{ y: backgroundY }} className="absolute inset-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-400/10 dark:bg-purple-600/5 blur-[120px] rounded-full" />
        </motion.div>

        {/* Particle Animation */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0.1,
              y: Math.random() * 1000,
              x: Math.random() * 1000,
            }}
            animate={{
              y: [null, Math.random() * -500],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
          />
        ))}
      </div>

      <div className="relative z-10 w-full text-slate-900 dark:text-zinc-100">
        {/* Navbar */}
        <nav className="fixed w-full top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b border-slate-200/50 dark:border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <motion.div
              onClick={() => scrollTo("home")}
              className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm">
                A
              </div>
              ASNA<span className="text-blue-600">.</span>
            </motion.div>

            <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
              {[
                "home",
                "experience",
                "leadership",
                "education",
                "achievements",
              ].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`relative py-2 transition-colors ${
                    activeSection === id
                      ? "text-blue-600"
                      : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {id}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className="ml-4 p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-900 transition-colors"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2"
            >
              <Menu size={24} />
            </button>
          </div>
          <motion.div
            style={{ scaleX }}
            className="h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 origin-left"
          />
        </nav>

        {/* Hero */}
        <section
          id="home"
          className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex items-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    BBA Financial Services
                  </span>
                  <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <Sparkles size={12} /> Global Outlook
                  </span>
                </div>

                <h1 className="text-7xl md:text-[9rem] font-black tracking-tighter leading-[0.8] mb-10">
                  <span className="block text-slate-900 dark:text-white">
                    ASNA
                  </span>
                  <span className="block text-blue-600 italic">
                    SHOIB
                    <span className="text-slate-900 dark:text-white">.</span>
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-slate-500 dark:text-zinc-400 max-w-xl leading-relaxed mb-12 font-medium">
                  Results-driven leader specializing in Management, Operations &
                  Strategic Communication. <br />
                  <span className="text-blue-600">
                    Co-Founder of TruStudents.
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-6">
                  <button className="group flex items-center gap-3 px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-tighter shadow-2xl transition-transform hover:scale-105">
                    Let's Connect <ArrowUpRight />
                  </button>
                  <div className="flex gap-4">
                    <a
                      href="mailto:shoibasna@gmail.com"
                      className="w-14 h-14 border border-slate-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      <Mail size={20} />
                    </a>
                    <a
                      href="#"
                      className="w-14 h-14 border border-slate-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                    >
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="aspect-[4/5] bg-gradient-to-br from-blue-600 to-purple-600 rounded-[4rem] overflow-hidden shadow-2xl relative"
              >
                <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-white/5">
                  <span className="text-[14rem] font-black italic select-none">
                    AS
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-6 -left-6 p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Rocket className="text-orange-500" size={16} />
                  <span className="text-[9px] uppercase font-black text-slate-400 tracking-widest">
                    Leadership
                  </span>
                </div>
                <div className="text-xl font-black tracking-tight">
                  TruStudents
                </div>
                <div className="text-[10px] text-blue-600 font-bold uppercase mt-1">
                  Co-Founder
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Infinite Moving Ribbon */}
        <div className="py-12 bg-blue-600 dark:bg-blue-700 overflow-hidden flex whitespace-nowrap -rotate-1 scale-105 relative z-20">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center text-white"
          >
            {[...skills_ribbon, ...skills_ribbon].map((skill, i) => (
              <div key={i} className="flex items-center gap-16">
                <span className="text-3xl font-black uppercase tracking-tighter italic opacity-90">
                  {skill}
                </span>
                <Sparkles size={28} className="text-blue-300" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Experience Section */}
        <section id="experience" className="py-40 px-6 max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">
              Professional Background
            </span>
            <h2 className="text-7xl md:text-8xl font-black tracking-tighter italic">
              Experience<span className="text-blue-600">.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {experience.map((job, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="group p-10 lg:p-14 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl rounded-[4rem] border border-slate-200/50 dark:border-zinc-800/50 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                  <Briefcase size={140} className="text-blue-600" />
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-12 relative z-10">
                  <div className="lg:w-1/3">
                    <div className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-3">
                      {job.period}
                    </div>
                    <h3 className="text-4xl font-black tracking-tight mb-2 leading-tight">
                      {job.role}
                    </h3>
                    <p className="text-xl font-bold text-blue-600 mb-6">
                      {job.company}
                    </p>
                  </div>
                  <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.details.map((detail, di) => (
                      <div
                        key={di}
                        className="p-6 bg-white dark:bg-black/30 rounded-3xl border border-slate-100 dark:border-zinc-800/50 flex items-start gap-3 shadow-sm"
                      >
                        <CheckCircle
                          size={18}
                          className="text-blue-600 mt-1 shrink-0"
                        />
                        <p className="text-slate-600 dark:text-zinc-400 text-sm font-medium leading-relaxed">
                          {detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Leadership Section */}
        <section
          id="leadership"
          className="py-40 bg-slate-50 dark:bg-zinc-950 px-6 rounded-[5rem]"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-6xl font-black tracking-tighter mb-4 italic">
                Leadership Initiatives<span className="text-blue-600">.</span>
              </h2>
              <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">
                Co-Founding & Campus Governance
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "TruStudents",
                  role: "Co-Founder",
                  period: "Jan 2026 Launch",
                  icon: <Rocket />,
                  color: "bg-orange-500",
                  desc: "Leading pre-launch engagement and community framework development in partnership with Sidd Groups.",
                },
                {
                  title: "Editorial Club",
                  role: "Head",
                  period: "2024 - 2025",
                  icon: <PenTool />,
                  color: "bg-blue-500",
                  desc: "Directed the university's official magazine, managing creative teams and 10+ literary events.",
                },
                {
                  title: "ISF Ambassador",
                  role: "College Amb.",
                  period: "Ongoing",
                  icon: <Globe />,
                  color: "bg-emerald-500",
                  desc: "Promoting Integral University's startup ecosystem; coordinated national-level IDE Bootcamps.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-10 bg-white dark:bg-zinc-900 rounded-[3rem] border border-slate-200 dark:border-zinc-800 shadow-xl"
                >
                  <div
                    className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    {item.period}
                  </span>
                  <h4 className="text-2xl font-black tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-blue-600 font-bold mb-6 text-sm">
                    {item.role}
                  </p>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-40 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-12">
              <div>
                <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">
                  Academic Path
                </span>
                <h2 className="text-6xl font-black tracking-tighter italic">
                  Education<span className="text-blue-600">.</span>
                </h2>
              </div>

              <div className="relative pl-10 border-l-2 border-slate-200 dark:border-zinc-800 space-y-16">
                <div className="relative">
                  <div className="absolute -left-[49px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-black shadow-lg" />
                  <div className="text-[10px] font-black uppercase text-blue-600 mb-2">
                    Aug 2023 - Present
                  </div>
                  <h4 className="text-3xl font-black tracking-tight">
                    BBA Financial Services
                  </h4>
                  <p className="text-slate-500 font-bold text-lg">
                    Integral University, Lucknow
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[49px] top-0 w-4 h-4 rounded-full bg-slate-300 dark:bg-zinc-700 border-4 border-white dark:border-black" />
                  <div className="text-[10px] font-black uppercase text-slate-400 mb-2">
                    Apr 2021 - July 2022
                  </div>
                  <h4 className="text-3xl font-black tracking-tight">
                    Senior Secondary
                  </h4>
                  <p className="text-slate-500 font-bold text-lg">
                    Ryan International School, Shahjahanpur
                  </p>
                </div>
              </div>
            </div>

            <div className="p-10 lg:p-14 bg-slate-900 text-white rounded-[4rem] relative overflow-hidden shadow-2xl">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600/30 blur-3xl rounded-full" />
              <h3 className="text-4xl font-black tracking-tight mb-10 flex items-center gap-4 italic">
                <Heart className="text-red-500" /> Volunteering
              </h3>
              <div className="space-y-8 relative z-10">
                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Users size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="font-black text-lg mb-1 italic">
                      Shelter Renovation
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Assisted in critical fundraising initiatives for local
                      shelter renovation projects.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-black text-lg mb-1 italic">
                      Food Bank Distribution
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Volunteered in food preparation and distribution at local
                      food banks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Grid */}
        <section
          id="achievements"
          className="py-40 px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-zinc-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-6xl font-black tracking-tighter mb-8 italic leading-none">
                Recognitions<span className="text-blue-600">.</span>
              </h2>
              <p className="text-slate-500 font-medium mb-10">
                Certified excellence in team management, public speaking, and
                collaborative writing.
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: "HR Management", org: "GreatLearnings" },
                  { name: "Business Analyst", org: "Cursa" },
                  { name: "IDE Bootcamp 2024", org: "AICTE/Govt of India" },
                ].map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-5 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100/50 dark:border-blue-900/20"
                  >
                    <Award className="text-blue-600 shrink-0" size={20} />
                    <div>
                      <div className="text-sm font-black tracking-tight leading-none mb-1 italic">
                        {cert.name}
                      </div>
                      <div className="text-[10px] font-bold uppercase text-slate-400">
                        {cert.org}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Team Management & Leadership Recognition",
                "Winner: National Speech Competition",
                "Certified Co-Author (Global Publications)",
                "Winner: Nukkad Natak Competition",
                "IDE Bootcamp Anchoring Certificate",
                "Stage Presence & Monologue Awards",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="p-8 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl flex flex-col justify-between shadow-sm"
                >
                  <Award className="text-blue-600 mb-6" size={24} />
                  <div className="font-black tracking-tight text-xl leading-snug italic">
                    {item}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Hobby Marquee-style Icons */}
        <section className="py-24 px-6 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Palette size={24} />, label: "Painting" },
              { icon: <Plane size={24} />, label: "Travelling" },
              { icon: <Camera size={24} />, label: "Photography" },
              { icon: <BookOpen size={24} />, label: "Story Writing" },
            ].map((h, i) => (
              <div
                key={i}
                className="p-10 border border-slate-200 dark:border-zinc-800 rounded-[3rem] flex flex-col items-center gap-4 hover:border-blue-600 hover:bg-blue-50/20 transition-all group"
              >
                <div className="text-slate-300 group-hover:text-blue-600 transition-colors transform group-hover:scale-110 duration-300">
                  {h.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-40 pb-20 px-6 border-t border-slate-200 dark:border-zinc-800 bg-white/30 dark:bg-black/30">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="text-center md:text-left">
              <div className="text-4xl font-black tracking-tighter mb-2 italic">
                ASNA SHOIB<span className="text-blue-600">.</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                <MapPin size={12} /> Shahjahanpur • Lucknow, India
              </div>
            </div>
            <div className="flex gap-10">
              <a
                href="#"
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:shoibasna@gmail.com"
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors"
              >
                Mail
              </a>
              <a
                href="#"
                className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-blue-600 transition-colors"
              >
                Instagram
              </a>
            </div>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">
              © 2026 ASNA SHOIB — Co-Founder TruStudents
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[100] bg-white dark:bg-black p-10 flex flex-col text-slate-900 dark:text-zinc-100"
          >
            <div className="flex justify-between mb-20 items-center">
              <div className="text-2xl font-black tracking-tighter italic">
                ASNA SHOIB<span className="text-blue-600">.</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 bg-slate-100 dark:bg-zinc-900 rounded-xl"
              >
                <X size={28} />
              </button>
            </div>
            <div className="flex flex-col gap-8">
              {[
                "home",
                "experience",
                "leadership",
                "education",
                "achievements",
              ].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-5xl font-black tracking-tighter text-left uppercase italic hover:text-blue-600 transition-colors"
                >
                  {id}
                  <span className="text-blue-600">.</span>
                </button>
              ))}
              <div className="flex items-center gap-4 mt-8">
                <button
                  onClick={toggleDarkMode}
                  className="p-3 rounded-full bg-slate-100 dark:bg-zinc-800"
                >
                  {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
                </button>
                <span className="text-xl font-medium">
                  {isDarkMode ? "Light Mode" : "Dark Mode"}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
