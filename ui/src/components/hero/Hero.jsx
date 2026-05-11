import Link from "next/link";
import {
  FiArrowRight, FiPlay, FiUser, FiFileText, FiZap,
  FiBarChart2, FiEdit3, FiCpu, FiDownload, FiBookmark,
  FiTwitter, FiLinkedin, FiGithub, FiCheckCircle,
} from "react-icons/fi";
import FAQAccordion from "./FAQAccordion";

// ─────────────────────────────────────────────────────────────────────────────
// Landing page – server component
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <div style={{ backgroundColor: "#060d18", color: "#fff" }}>
      <Navbar />
      <HeroSection />
      <FeatureStrip />
      <FeaturesSection />
      <AIShowcase />
      <HowItWorks />
      <ATSScoreSection />
      <FAQSection />
      <FooterCTA />
      <SiteFooter />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: "rgba(6,13,24,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          aria-label="ATS Resume V2 — home"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
            style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)" }}
          >
            A
          </div>
          <span className="font-bold text-base text-white tracking-tight">
            ATS Resume V2
          </span>
        </Link>

        {/* Nav links */}
        <nav
          className="hidden md:flex items-center gap-1 flex-1"
          aria-label="Main navigation"
        >
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "FAQ", href: "#faq" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-3 py-1.5 text-sm transition-colors rounded-lg hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          <Link
            href="/login"
            className="hidden sm:block text-sm transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Sign in
          </Link>
          <Link
            href="/builder"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-px"
            style={{ backgroundColor: "#14b8a6" }}
          >
            Get started free
          </Link>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
      style={{ paddingTop: "120px", paddingBottom: "80px", minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      {/* Background grid + glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(20,184,166,0.07) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "30%", right: "15%",
            width: "500px", height: "500px",
            background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: "60%", left: "10%",
            width: "350px", height: "350px",
            background: "radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">

        {/* ── Left: content ── */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-7"
            style={{
              backgroundColor: "rgba(20,184,166,0.10)",
              border: "1px solid rgba(20,184,166,0.22)",
              color: "#14b8a6",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#14b8a6" }}
              aria-hidden="true"
            />
            Free · ATS-Focused · AI Assisted
          </div>

          {/* H1 */}
          <h1
            id="hero-heading"
            className="font-extrabold leading-tight tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 5vw, 3.75rem)" }}
          >
            Build a resume that{" "}
            <span style={{ color: "#14b8a6" }}>passes filters</span>{" "}
            and gets noticed
          </h1>

          {/* Description */}
          <p
            className="text-lg leading-relaxed mb-8 max-w-lg"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            ATS Resume V2 uses Google Gemini AI to tailor your resume to the
            job, improve your ATS match score, and help you stand out to
            recruiters.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
              style={{ backgroundColor: "#14b8a6" }}
              aria-label="Start building your ATS resume for free"
            >
              Build my ATS resume free
              <FiArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:-translate-y-0.5 hover:bg-white/5"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.82)",
              }}
            >
              <FiPlay className="w-4 h-4" aria-hidden="true" />
              See how it works
            </a>
          </div>

          {/* Trust row */}
          <div
            className="flex flex-wrap gap-6 text-sm"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            {[
              { icon: <FiUser className="w-3.5 h-3.5" />, label: "No sign-up required" },
              { icon: <FiFileText className="w-3.5 h-3.5" />, label: "Instant PDF export" },
              { icon: <FiZap className="w-3.5 h-3.5" />, label: "Gemini AI powered" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                <span aria-hidden="true">{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: preview card ── */}
        <div className="flex justify-center lg:justify-end">
          <ResumePreviewCard />
        </div>

      </div>
    </section>
  );
}

function ResumePreviewCard() {
  return (
    <div
      className="w-full max-w-lg rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#0d1f35",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.55)",
      }}
    >
      {/* Card header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "#0a1628", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
      >
        <span className="text-sm font-semibold text-white">Software Engineer</span>
        <span
          className="text-xs font-bold px-2.5 py-0.5 rounded-full"
          style={{
            backgroundColor: "rgba(20,184,166,0.15)",
            color: "#14b8a6",
            border: "1px solid rgba(20,184,166,0.3)",
          }}
        >
          High Match
        </span>
      </div>

      {/* Card body */}
      <div className="flex" style={{ minHeight: "290px" }}>

        {/* Mini resume */}
        <div
          className="flex-1 p-3"
          style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
          aria-label="Resume preview"
        >
          <div
            className="rounded-lg overflow-hidden h-full p-3 text-left"
            style={{ backgroundColor: "#fff", fontSize: "10px", color: "#111" }}
          >
            <p className="font-black text-sm text-gray-900 leading-none">ALEX JOHNSON</p>
            <p className="text-gray-500 text-[10px] mt-0.5 mb-1">Software Engineer</p>
            <p className="text-gray-400 text-[9px] mb-2.5">
              alex.johnson@gmail.com · San Francisco, CA
            </p>

            <div
              className="h-px mb-2.5"
              style={{ backgroundColor: "#e5e7eb" }}
              aria-hidden="true"
            />

            <p className="font-bold text-[8px] uppercase tracking-wide text-gray-600 mb-1">
              Professional Summary
            </p>
            {[100, 100, 72].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded mb-1"
                style={{ width: `${w}%`, backgroundColor: "#e5e7eb" }}
                aria-hidden="true"
              />
            ))}

            <p className="font-bold text-[8px] uppercase tracking-wide text-gray-600 mt-2.5 mb-1">
              Experience
            </p>
            <p className="font-semibold text-[9px] text-gray-700 mb-1">
              Senior Software Engineer
            </p>
            {[95, 100, 80].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded mb-1"
                style={{ width: `${w}%`, backgroundColor: "#e5e7eb" }}
                aria-hidden="true"
              />
            ))}

            <p className="font-bold text-[8px] uppercase tracking-wide text-gray-600 mt-2.5 mb-1.5">
              Skills
            </p>
            <div className="flex flex-wrap gap-1" aria-hidden="true">
              {["React", "Node.js", "Python", "AWS", "SQL"].map((s) => (
                <span
                  key={s}
                  className="text-[7px] px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: "#f3f4f6", color: "#4b5563" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ATS score panel */}
        <div className="flex flex-col items-center px-4 py-4" style={{ minWidth: "170px" }}>
          <p className="text-xs font-semibold text-white mb-3 text-center">ATS Match Score</p>

          {/* Circle */}
          <div className="relative mb-4" aria-label="ATS match score: 87 percent — Great Match">
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              aria-hidden="true"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx="48" cy="48" r="38"
                fill="none"
                stroke="rgba(20,184,166,0.15)"
                strokeWidth="8"
              />
              <circle
                cx="48" cy="48" r="38"
                fill="none"
                stroke="#14b8a6"
                strokeWidth="8"
                strokeDasharray="239"
                strokeDashoffset="31"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white leading-none">87%</span>
              <span className="text-[9px] font-medium mt-0.5" style={{ color: "#14b8a6" }}>
                Great Match
              </span>
            </div>
          </div>

          {/* Keyword coverage */}
          <div className="w-full mb-4">
            <div className="flex justify-between text-[9px] mb-1">
              <span style={{ color: "rgba(255,255,255,0.55)" }}>Keyword Coverage</span>
              <span className="text-white font-semibold">29 / 32</span>
            </div>
            <div
              className="h-1.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full"
                style={{ width: "91%", backgroundColor: "#14b8a6" }}
              />
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="w-full">
            <p className="text-[9px] font-semibold text-white mb-2">AI Suggestions</p>
            {[
              "Use stronger action verbs",
              "Added relevant keywords",
              "Improved bullet clarity",
              "Optimized for ATS",
            ].map((s) => (
              <div
                key={s}
                className="flex items-center gap-1.5 text-[8px] mb-1.5"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <FiCheckCircle
                  className="w-2.5 h-2.5 shrink-0"
                  style={{ color: "#14b8a6" }}
                  aria-hidden="true"
                />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Card footer */}
      <div
        className="px-4 py-3"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <Link
          href="/builder"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "#14b8a6" }}
        >
          <FiDownload className="w-4 h-4" aria-hidden="true" />
          Download Optimized PDF
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Feature strip
// ─────────────────────────────────────────────────────────────────────────────

const STRIP_FEATURES = [
  { icon: FiBarChart2, title: "ATS scoring", sub: "Know your match" },
  { icon: FiEdit3, title: "Resume builder", sub: "Create with ease" },
  { icon: FiCpu, title: "AI customization", sub: "Tailored to every role" },
  { icon: FiFileText, title: "PDF export", sub: "Clean & ATS-safe" },
  { icon: FiBookmark, title: "Saved versions", sub: "Track & manage" },
];

function FeatureStrip() {
  return (
    <div
      style={{
        backgroundColor: "#0a1628",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 sm:grid-cols-5 gap-4">
        {STRIP_FEATURES.map(({ icon: Icon, title, sub }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon
              className="w-5 h-5 shrink-0"
              style={{ color: "#14b8a6" }}
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold text-white leading-tight">{title}</p>
              <p className="text-xs leading-tight" style={{ color: "rgba(255,255,255,0.45)" }}>
                {sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Features section — light background
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    badge: "Know before you apply",
    badgeColor: { bg: "#edfbf9", text: "#0d9488" },
    iconBg: "#edfbf9",
    iconColor: "#14b8a6",
    icon: FiBarChart2,
    title: "Know your match before you apply",
    desc: "Get an ATS score for any job description so you know exactly how strong your resume is before submitting.",
    stat: "87%",
    statLabel: "Average score improvement",
    statColor: "#14b8a6",
  },
  {
    badge: "Tailor every time",
    badgeColor: { bg: "#f5f0ff", text: "#7c3aed" },
    iconBg: "#f5f0ff",
    iconColor: "#7c3aed",
    icon: FiCpu,
    title: "Tailor every application in seconds",
    desc: "AI rewrites your summary, skills, and experience to match the job requirements — without changing your actual history.",
    stat: "3×",
    statLabel: "Faster resume customization",
    statColor: "#7c3aed",
  },
  {
    badge: "Clean & ready to send",
    badgeColor: { bg: "#fff7ed", text: "#ea580c" },
    iconBg: "#fff7ed",
    iconColor: "#ea580c",
    icon: FiFileText,
    title: "Export a clean, ATS-safe PDF",
    desc: "Download a professional, recruiter-friendly PDF that keeps your formatting and content intact.",
    stat: "100%",
    statLabel: "ATS-safe formatting",
    statColor: "#ea580c",
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      style={{ backgroundColor: "#f8fafc" }}
      className="py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#14b8a6" }}
          >
            Features
          </p>
          <h2
            id="features-heading"
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#111827" }}
          >
            Everything you need before you click apply
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "#6b7280" }}>
            Powerful tools to help you create, optimize, and export a resume that performs.
          </p>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-7 list-none p-0">
          {FEATURES.map(({
            badge, badgeColor, iconBg, iconColor, icon: Icon,
            title, desc, stat, statLabel, statColor,
          }) => (
            <li
              key={title}
              className="bg-white rounded-2xl p-7 flex flex-col"
              style={{ border: "1px solid #f3f4f6", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}
            >
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-5 self-start"
                style={{ backgroundColor: badgeColor.bg, color: badgeColor.text }}
              >
                {badge}
              </span>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: iconBg }}
                aria-hidden="true"
              >
                <Icon className="w-6 h-6" style={{ color: iconColor }} />
              </div>
              <h3 className="font-bold text-xl mb-3" style={{ color: "#111827" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#6b7280" }}>
                {desc}
              </p>
              <div className="mt-6 pt-5" style={{ borderTop: "1px solid #f3f4f6" }}>
                <p className="text-3xl font-black" style={{ color: statColor }}>
                  {stat}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#9ca3af" }}>
                  {statLabel}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI showcase — before / after
// ─────────────────────────────────────────────────────────────────────────────

function AIShowcase() {
  return (
    <section
      aria-labelledby="ai-heading"
      style={{ backgroundColor: "#060d18" }}
      className="py-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-3"
          style={{ color: "#14b8a6" }}
        >
          AI That Makes a Difference
        </p>
        <h2
          id="ai-heading"
          className="font-extrabold mb-4"
          style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}
        >
          See what the AI improves
        </h2>
        <p className="mb-12" style={{ color: "rgba(255,255,255,0.55)" }}>
          Smarter phrasing. Stronger impact. Higher match scores.
        </p>

        {/* Before / After */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 text-left mb-10">
          {/* Before */}
          <div
            className="flex-1 rounded-2xl p-6"
            style={{
              backgroundColor: "#0d1f35",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded mb-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.55)",
              }}
            >
              Before
            </span>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              • Responsible for developing web applications with JavaScript and
              React.
            </p>
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center">
            <FiArrowRight
              className="w-6 h-6 rotate-90 sm:rotate-0"
              style={{ color: "#14b8a6" }}
              aria-hidden="true"
            />
          </div>

          {/* After */}
          <div
            className="flex-1 rounded-2xl p-6"
            style={{
              backgroundColor: "rgba(20,184,166,0.07)",
              border: "1px solid rgba(20,184,166,0.25)",
            }}
          >
            <span
              className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded mb-4"
              style={{
                backgroundColor: "rgba(20,184,166,0.15)",
                color: "#14b8a6",
              }}
            >
              After
            </span>
            <p className="text-sm leading-relaxed text-white">
              •{" "}
              <span style={{ color: "#14b8a6" }}>Developed</span> responsive web
              applications using JavaScript and React,{" "}
              <span style={{ color: "#14b8a6" }}>improving performance by 20%</span>{" "}
              and enhancing user experience.
            </p>
          </div>
        </div>

        {/* Checkmarks */}
        <div
          className="flex flex-wrap justify-center gap-6"
          role="list"
          aria-label="AI improvements"
        >
          {[
            "Stronger action verbs",
            "Relevant keywords added",
            "Cleaner ATS phrasing",
            "Role-focused summary",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 text-sm"
              style={{ color: "rgba(255,255,255,0.75)" }}
              role="listitem"
            >
              <FiCheckCircle
                className="w-4 h-4 shrink-0"
                style={{ color: "#14b8a6" }}
                aria-hidden="true"
              />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// How it works — 4 steps
// ─────────────────────────────────────────────────────────────────────────────

const HOW_STEPS = [
  {
    n: "1",
    title: "Build or paste your resume details",
    desc: "Start from scratch or import your existing resume. Add your experience, skills, and education.",
    icon: FiEdit3,
  },
  {
    n: "2",
    title: "Add the job description",
    desc: "Paste the job post. Our AI will extract key requirements and keywords automatically.",
    icon: FiFileText,
  },
  {
    n: "3",
    title: "Review AI suggestions and score",
    desc: "See tailored suggestions and your ATS match score in real time.",
    icon: FiBarChart2,
  },
  {
    n: "4",
    title: "Download your optimized resume",
    desc: "Export a clean, ATS-friendly PDF ready to impress recruiters.",
    icon: FiDownload,
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-heading"
      style={{ backgroundColor: "#060d18" }}
      className="py-24"
    >
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "4rem" }}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#14b8a6" }}
          >
            How It Works
          </p>
          <h2
            id="how-heading"
            className="font-extrabold text-white"
            style={{ fontSize: "clamp(2rem,4vw,3rem)" }}
          >
            From job post to ready-to-send resume
          </h2>
        </div>

        {/* Steps */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0">
          {HOW_STEPS.map(({ n, title, desc, icon: Icon }) => (
            <li key={n} className="relative">
              {/* Step number badge */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm mb-4"
                style={{ backgroundColor: "#14b8a6" }}
                aria-label={`Step ${n}`}
              >
                {n}
              </div>

              {/* Card */}
              <div
                className="rounded-2xl p-5 h-full"
                style={{
                  backgroundColor: "#0d1f35",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <Icon
                  className="w-6 h-6 mb-3"
                  style={{ color: "#14b8a6" }}
                  aria-hidden="true"
                />
                <h3 className="text-white font-semibold text-sm mb-2 leading-snug">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 text-center">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
            style={{ backgroundColor: "#14b8a6" }}
          >
            Try the AI Resume Builder Free
            <FiArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ATS Score section
// ─────────────────────────────────────────────────────────────────────────────

const SCORE_BARS = [
  { label: "Keyword match", value: 87, display: "28 / 32" },
  { label: "Formatting safety", value: 98, display: "98%" },
  { label: "Role alignment", value: 90, display: "90%" },
  { label: "Experience relevance", value: 85, display: "85%" },
];

const SCORE_EXPLANATIONS = [
  { label: "Keyword match", desc: "shows how well you cover required skills." },
  { label: "Formatting safety", desc: "ensures your resume is ATS-friendly." },
  { label: "Role alignment", desc: "checks how relevant your experience is." },
  { label: "Experience relevance", desc: "measures the depth of your impact." },
];

function ATSScoreSection() {
  return (
    <section
      aria-labelledby="score-heading"
      style={{ backgroundColor: "#f1f5f9" }}
      className="py-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Score card */}
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: "#0d1f35",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p
            className="text-xs font-bold uppercase tracking-widest mb-6"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            ATS Score Report
          </p>

          {/* Circle + label */}
          <div className="flex items-center gap-6 mb-7">
            <div
              className="relative shrink-0"
              aria-label="ATS score: 87 out of 100 — Great Match"
            >
              <svg
                width="110"
                height="110"
                viewBox="0 0 110 110"
                aria-hidden="true"
                style={{ transform: "rotate(-90deg)" }}
              >
                <circle
                  cx="55" cy="55" r="46"
                  fill="none"
                  stroke="rgba(20,184,166,0.15)"
                  strokeWidth="9"
                />
                <circle
                  cx="55" cy="55" r="46"
                  fill="none"
                  stroke="#14b8a6"
                  strokeWidth="9"
                  strokeDasharray="289"
                  strokeDashoffset="38"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white leading-none">87</span>
                <span className="text-xs font-medium mt-0.5" style={{ color: "#14b8a6" }}>
                  Great Match
                </span>
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-snug">
                Strong ATS alignment
              </p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                Your resume is well-optimized for this role.
              </p>
            </div>
          </div>

          {/* Bars */}
          <div className="space-y-4">
            {SCORE_BARS.map(({ label, value, display }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>{label}</span>
                  <span className="font-semibold text-white">{display}</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  role="progressbar"
                  aria-valuenow={value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${label}: ${display}`}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${value}%`, backgroundColor: "#14b8a6" }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-6 flex items-center gap-2 text-xs rounded-xl px-4 py-3"
            style={{
              backgroundColor: "rgba(20,184,166,0.08)",
              border: "1px solid rgba(20,184,166,0.2)",
              color: "#14b8a6",
            }}
          >
            <FiCheckCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            Your resume is well-optimized for this role.
          </div>
        </div>

        {/* Text content */}
        <div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#14b8a6" }}
          >
            Understand Your Score
          </p>
          <h2
            id="score-heading"
            className="font-extrabold mb-4"
            style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)", color: "#111827" }}
          >
            Know exactly where your resume stands
          </h2>
          <p className="text-gray-500 mb-7 leading-relaxed">
            Our ATS score evaluates how well your resume aligns with the job
            description and ATS best practices — so you know before you apply.
          </p>

          <ul className="space-y-4 mb-7 list-none p-0">
            {SCORE_EXPLANATIONS.map(({ label, desc }) => (
              <li key={label} className="flex items-start gap-3">
                <FiCheckCircle
                  className="w-5 h-5 shrink-0 mt-0.5"
                  style={{ color: "#14b8a6" }}
                  aria-hidden="true"
                />
                <p className="text-sm text-gray-600 leading-relaxed">
                  <strong className="text-gray-800">{label}</strong> {desc}
                </p>
              </li>
            ))}
          </ul>

          <div
            className="flex items-start gap-3 p-4 rounded-xl text-sm"
            style={{
              backgroundColor: "rgba(20,184,166,0.06)",
              border: "1px solid rgba(20,184,166,0.18)",
              color: "#374151",
            }}
          >
            <span aria-hidden="true" className="text-lg">💡</span>
            <p>
              Aim for <strong>80%+</strong> to maximize your chances of getting
              shortlisted by recruiters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ section
// ─────────────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "What is ATS Resume V2?",
    a: "ATS Resume V2 is a free AI-powered resume builder that helps job seekers create ATS-optimized resumes. You can build your resume, paste any job description, and our AI — powered by Google Gemini — customizes your resume to match the role's keywords and requirements.",
  },
  {
    q: "Is ATS Resume V2 free to use?",
    a: "Yes, completely free. There are no subscriptions, paywalls, or hidden fees. You can build, optimize, and download your ATS-ready resume at no cost — forever.",
  },
  {
    q: "How does the AI resume optimizer work?",
    a: "ATS Resume V2 uses Google Gemini AI to compare your resume with a target job description. It identifies keyword gaps, rewrites your professional summary, tailors your skills, and adjusts your work experience descriptions — then generates a match score.",
  },
  {
    q: "Is my data safe and private?",
    a: "Yes. Your resume data is only used to generate your customized resume. We do not sell your data or share it with third parties. You can also download a JSON backup of your resume at any time.",
  },
  {
    q: "Do I need to create an account to use the resume builder?",
    a: "No. You can build and download your resume without signing up. Creating a free account lets you save your resume to the cloud and access it from any device.",
  },
  {
    q: "Can I cancel anytime?",
    a: "ATS Resume V2 is entirely free — there is no subscription to cancel. Simply stop using the tool whenever you like.",
  },
];

function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      style={{ backgroundColor: "#fff" }}
      className="py-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-3"
            style={{ color: "#14b8a6" }}
          >
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="font-extrabold"
            style={{ fontSize: "clamp(2rem,4vw,2.75rem)", color: "#111827" }}
          >
            Frequently asked questions
          </h2>
        </div>

        <FAQAccordion faqs={FAQ_ITEMS} />

        <p className="text-center mt-10 text-sm" style={{ color: "#9ca3af" }}>
          Still have questions?{" "}
          <Link
            href="/register"
            className="underline underline-offset-2"
            style={{ color: "#14b8a6" }}
          >
            Contact us →
          </Link>
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer CTA
// ─────────────────────────────────────────────────────────────────────────────

function FooterCTA() {
  return (
    <section
      aria-labelledby="cta-heading"
      style={{ backgroundColor: "#060d18" }}
      className="py-24"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-7 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(20,184,166,0.1)",
            border: "1px solid rgba(20,184,166,0.2)",
          }}
          aria-hidden="true"
        >
          <FiFileText className="w-7 h-7" style={{ color: "#14b8a6" }} />
        </div>

        <h2
          id="cta-heading"
          className="font-extrabold text-white mb-4"
          style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)" }}
        >
          Create a better resume for your next application
        </h2>
        <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.55)" }}>
          Free to use. No sign-up required. Built to help you get noticed.
        </p>

        <Link
          href="/builder"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white text-lg transition-all hover:-translate-y-0.5 hover:opacity-90"
          style={{ backgroundColor: "#14b8a6" }}
          aria-label="Start building your ATS resume for free"
        >
          Build my ATS resume free
          <FiArrowRight className="w-5 h-5" aria-hidden="true" />
        </Link>

        <div
          className="mt-5 flex justify-center gap-8 text-xs"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          <span>Instant PDF download</span>
          <span>Powered by Gemini AI</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Site footer
// ─────────────────────────────────────────────────────────────────────────────

const FOOTER_LINKS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
    isAnchor: true,
  },
  {
    title: "Resources",
    links: [
      { label: "Resume tips", href: "/builder" },
      { label: "ATS guide", href: "#features" },
      { label: "Blog", href: "/" },
    ],
    isAnchor: false,
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/" },
      { label: "Contact", href: "/register" },
    ],
    isAnchor: false,
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/" },
      { label: "Terms of service", href: "/" },
    ],
    isAnchor: false,
  },
];

function SiteFooter() {
  return (
    <footer
      style={{
        backgroundColor: "#040b14",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
      className="py-14"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 mb-10">

          {/* Brand column */}
          <div className="lg:w-60 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label="ATS Resume V2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
                style={{ background: "linear-gradient(135deg,#14b8a6,#0d9488)" }}
                aria-hidden="true"
              >
                A
              </div>
              <span className="font-bold text-base text-white">ATS Resume V2</span>
            </Link>
            <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.4)" }}>
              AI-powered resume optimization to help you get noticed by recruiters.
            </p>
            {/* Social */}
            <nav aria-label="Social media links" className="flex gap-3">
              {[
                { Icon: FiTwitter, label: "Twitter" },
                { Icon: FiLinkedin, label: "LinkedIn" },
                { Icon: FiGithub, label: "GitHub" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="transition-colors hover:text-white"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          {/* Link columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_LINKS.map(({ title, links, isAnchor }) => (
              <nav key={title} aria-label={`${title} links`}>
                <p className="text-sm font-semibold text-white mb-3">{title}</p>
                <ul className="space-y-2 list-none p-0">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      {isAnchor ? (
                        <a
                          href={href}
                          className="text-xs transition-colors hover:text-white"
                          style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="text-xs transition-colors hover:text-white"
                          style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                          {label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 text-center text-xs"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          © {new Date().getFullYear()} ATS Resume V2. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
