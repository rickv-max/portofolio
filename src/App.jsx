import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Terminal,
  Code2,
  Cpu,
  ExternalLink,
  Search,
  Zap,
  FileText,
  Briefcase,
  BookOpen,
  Layers,
} from "lucide-react";

// ==========================================
// CUSTOM BRAND ICONS (Pengganti Lucide Brand Icons yang dihapus)
// ==========================================
const GithubIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// ==========================================
// 1. STYLES & ASSETS (INJECTED CSS)
// ==========================================
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

  :root {
    --bg-color: #Fdfbf7;
    --border-color: #1a1a1a;
  }

  body {
    font-family: 'Space Grotesk', sans-serif;
    background-color: var(--bg-color);
    color: var(--border-color);
    overflow-x: hidden;
    cursor: none; 
  }

  .bg-grid-pattern {
    background-size: 24px 24px;
    background-image: radial-gradient(circle, #1a1a1a 1px, transparent 1px);
    opacity: 0.12;
  }

  /* Solid Neobrutalism Shadow Classes - Skala diperkecil */
  .neo-shadow-sm {
    box-shadow: 2px 2px 0px 0px var(--border-color);
  }
  .neo-shadow {
    box-shadow: 4px 4px 0px 0px var(--border-color);
  }
  .neo-shadow-hover:hover {
    box-shadow: 6px 6px 0px 0px var(--border-color);
    transform: translate(-2px, -2px);
  }
`;

// ==========================================
// 2. DATA CONSTANTS
// ==========================================
const TECH_STACK = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "Node.js",
  "Framer Motion",
  "GSAP",
  "OpenAI API",
  "PostgreSQL",
  "Prisma",
];

const PROJECTS = [
  {
    id: 1,
    title: "SkripsiGen",
    desc: "Mesin pencari jurnal akademik terverifikasi dengan jaminan DOI valid untuk referensi skripsi.",
    color: "bg-[#FFC82C]", // Premium Yellow
    tags: ["Search", "API", "React"],
    icon: <Search className="w-4 h-4" />,
    link: "https://skripsi-gen.vercel.app/",
  },
  {
    id: 2,
    title: "Flash Sitasi",
    desc: "Generator sitasi dan daftar pustaka otomatis super cepat hanya dengan menyalin DOI Jurnal.",
    color: "bg-[#00C49A]", // Premium Mint
    tags: ["Automation", "Utility", "Tools"],
    icon: <Zap className="w-4 h-4" />,
    link: "https://flash-sitasi.vercel.app/",
  },
  {
    id: 3,
    title: "Parafrase Tools",
    desc: "Alat parafrase cerdas untuk menyusun ulang teks akademik dengan rapi dan menghindari plagiasi.",
    color: "bg-[#FF5A5F]", // Premium Coral
    tags: ["NLP", "AI Tools", "Web App"],
    icon: <FileText className="w-4 h-4" />,
    link: "https://parafrase-tools.vercel.app/",
  },
  {
    id: 4,
    title: "LamaranGen",
    desc: "Generator otomatis untuk meracik surat lamaran kerja profesional dan terstruktur secara instan.",
    color: "bg-[#4D96FF]", // Premium Blue
    tags: ["Generator", "Career", "React"],
    icon: <Briefcase className="w-4 h-4" />,
    link: "https://generator-surat-lamaran-kerja-v2.vercel.app/",
  },
  {
    id: 5,
    title: "JokiTugasCepat",
    desc: "Platform layanan bantuan pengerjaan tugas akademik dan freelance yang cepat dan andal.",
    color: "bg-[#FF90E8]", // Premium Pink
    tags: ["Platform", "Service", "Web"],
    icon: <BookOpen className="w-4 h-4" />,
    link: "https://jokitugascepat.vercel.app/",
  },
  {
    id: 6,
    title: "AutoSkripsi Pro",
    desc: "AI cerdas pembangun draf skripsi komprehensif dari nol (Bab 1 hingga 5) lengkap dengan narasi akademik.",
    color: "bg-[#FF8A00]", // Premium Orange
    tags: ["AI", "Automation", "Education"],
    icon: <Layers className="w-4 h-4" />,
    link: "https://gemini.google.com/share/40a1fbf3a951",
  },
];

// ==========================================
// 3. COMPONENTS
// ==========================================

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) =>
      setMousePosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === "a" ||
        e.target.tagName.toLowerCase() === "button" ||
        e.target.closest("button") ||
        e.target.closest("a")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ backgroundColor: "white" }}
      animate={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
        scale: isHovering ? 2 : 1,
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
};

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center backdrop-blur-sm bg-[#Fdfbf7]/90 border-b-[3px] border-[#1a1a1a]"
    >
      <div className="font-bold text-lg tracking-tight">
        RickyM<span className="text-[#FF5A5F]">.</span>
      </div>
      <div className="hidden md:flex items-center gap-5 font-semibold text-xs">
        {["Expertise", "Projects", "Stack"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-[#FF5A5F] transition-colors"
          >
            {item}
          </a>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-4 py-1.5 bg-[#FFC82C] border-2 border-[#1a1a1a] text-xs font-bold rounded-none neo-shadow-sm transition-all hover:translate-x-[-1px] hover:translate-y-[-1px]"
      >
        Let's Talk
      </motion.button>
    </motion.nav>
  );
};

const Hero = () => {
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  };

  const wordVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 16, stiffness: 100 },
    },
  };

  const headline = "Building Digital Products & AI Tools.";

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-16 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 md:opacity-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[200px] h-[200px] bg-[#00C49A] rounded-full blur-[60px] -z-10 translate-x-[20%] translate-y-[20%]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[150px] h-[150px] bg-[#FF5A5F] rounded-full blur-[50px] -z-10 -translate-x-[20%] -translate-y-[20%]"
        />
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:block absolute right-[15%] top-[25%] w-12 h-12 bg-[#FFC82C] border-[3px] border-[#1a1a1a] neo-shadow z-0"
        />
      </div>

      <div className="max-w-4xl w-full z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1 mb-4 bg-white border-2 border-[#1a1a1a] neo-shadow-sm rounded-full font-bold text-[10px] tracking-wide uppercase"
          >
            Ricky Maulana — Developer
          </motion.div>

          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-[#1a1a1a] mb-4 flex flex-wrap justify-center md:justify-start overflow-hidden"
          >
            {headline.split(" ").map((word, index) => (
              <span
                key={index}
                className="overflow-hidden inline-block mr-2 mb-1 md:mr-3 md:mb-1"
              >
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-sm md:text-base font-medium max-w-lg text-gray-700 mb-6 mx-auto md:mx-0 leading-relaxed"
          >
            Saya merancang antarmuka web premium dengan integrasi AI yang
            mengubah ide kompleks menjadi produk siap pakai.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 bg-[#FF5A5F] text-white border-[3px] border-[#1a1a1a] font-bold text-sm flex items-center gap-2 neo-shadow transition-all hover:translate-x-[-2px] hover:translate-y-[-2px] w-full sm:w-auto justify-center"
            >
              Lihat Karya <ArrowUpRight className="w-4 h-4" />
            </motion.a>
            <div className="flex gap-2">
              {[
                // Diperbarui menggunakan Custom SVGs
                {
                  icon: <GithubIcon className="w-4 h-4" />,
                  color: "bg-white",
                  url: "https://github.com/USERNAME_ANDA",
                },
                {
                  icon: <LinkedinIcon className="w-4 h-4" />,
                  color: "bg-[#FFC82C]",
                  url: "https://linkedin.com/in/USERNAME_ANDA",
                },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-2 ${social.color} border-[3px] border-[#1a1a1a] neo-shadow transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]`}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Tech Stack Section Component (Pengganti Marquee) ---
const TechStack = () => {
  return (
    <section id="stack" className="py-8 px-4 max-w-4xl mx-auto relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center md:items-start"
      >
        <p className="text-xs font-bold text-[#1a1a1a]/50 uppercase tracking-widest mb-4">
          Tech Arsenal
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
          {TECH_STACK.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -2 }}
              className="px-3 py-1.5 bg-white border-2 border-[#1a1a1a] text-xs font-bold text-[#1a1a1a] flex items-center neo-shadow-sm cursor-default"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-12 px-4 max-w-4xl mx-auto relative z-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
          Featured <span className="text-[#00C49A]">Projects.</span>
        </h2>
        <div className="w-16 h-1 bg-[#1a1a1a] relative">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-[#FFC82C]" />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className={`group flex flex-col justify-between p-4 ${project.color} border-[3px] border-[#1a1a1a] rounded-xl neo-shadow transition-all duration-300 hover:shadow-[6px_6px_0px_0px_#1a1a1a] bg-opacity-90`}
          >
            <div>
              <div className="w-10 h-10 bg-white border-[3px] border-[#1a1a1a] rounded-lg flex items-center justify-center neo-shadow-sm mb-4">
                {project.icon}
              </div>
              <h3 className="text-lg font-bold mb-1.5 leading-tight">
                {project.title}
              </h3>
              <p className="font-medium text-[#1a1a1a]/80 mb-4 leading-snug text-xs">
                {project.desc}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white border border-[#1a1a1a] text-[9px] font-bold uppercase rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-xs bg-white px-3 py-1.5 border-[3px] border-[#1a1a1a] neo-shadow-sm transition-all group-hover:translate-x-[-1px] group-hover:translate-y-[-1px]"
              >
                View Live <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-[#Fdfbf7] pt-12 pb-6 px-4 mt-12 relative overflow-hidden border-t-[6px] border-[#FF5A5F]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="max-w-sm">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">
            Let's Build <br />
            <span className="text-[#FFC82C]">Together.</span>
          </h2>
          <p className="text-sm text-gray-300 mb-6">
            Punya ide produk yang ingin direalisasikan? Terbuka untuk diskusi
            project Web Dev & AI.
          </p>
          <motion.a
            href="mailto:hello@rickymaulana.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex px-4 py-2 bg-[#00C49A] text-[#1a1a1a] border-[3px] border-[#1a1a1a] font-bold text-sm neo-shadow-sm transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]"
          >
            hello@rickymaulana.com
          </motion.a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="font-bold text-sm mb-1 text-[#FF5A5F]">Socials</h4>
          {["LinkedIn", "Twitter", "GitHub", "Dribbble"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-semibold hover:text-[#FFC82C] transition-colors flex items-center gap-1.5 group"
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {link}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-10 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-medium text-gray-500">
        <p>© {new Date().getFullYear()} Ricky Maulana. All rights reserved.</p>
        <p>Built with React, Tailwind & Framer Motion.</p>
      </div>
    </footer>
  );
};

// ==========================================
// 4. MAIN APP CONTAINER
// ==========================================
export default function App() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="relative min-h-screen selection:bg-[#FF5A5F] selection:text-white">
        {/* Background Grid Layer */}
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0" />

        <CustomCursor />
        <Navbar />

        <main className="relative z-10">
          <Hero />
          <TechStack />
          <Projects />
        </main>

        <Footer />
      </div>
    </>
  );
}
