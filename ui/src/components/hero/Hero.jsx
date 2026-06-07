import Link from "next/link";
import FAQAccordion from "./FAQAccordion";

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG icons — no external dependency
// ─────────────────────────────────────────────────────────────────────────────

const Ico = {
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  check: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  checkCircle: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  sparkle: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  ),
  chart: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
    </svg>
  ),
  cpu: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/>
      <line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/>
      <line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>
    </svg>
  ),
  file: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  ),
  download: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  edit: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  zap: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  user: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  twitter: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  github: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <div className="antialiased" style={{ backgroundColor: "#030A14", color: "#fff" }}>
      <LandingNav />
      <HeroSection />
      <MetricsBar />
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
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

function LandingNav() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50"
      style={{
        backgroundColor: "rgba(3,10,20,0.90)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="ATSResume — home">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm shrink-0"
            style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)" }}
          >
            AR
          </span>
          <span className="font-bold text-base tracking-tight" style={{
            background: "linear-gradient(135deg,#14B8A6,#0D9488)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            ATSResume
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-0.5 flex-1" aria-label="Main navigation">
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "FAQ", href: "#faq" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-3.5 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{ color: "rgba(255,255,255,0.58)" }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Auth */}
        <div className="flex items-center gap-3 ml-auto shrink-0">
          <Link
            href="/login"
            className="hidden sm:block text-sm font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.58)" }}
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="hidden sm:block text-sm font-medium border rounded-lg px-3.5 py-1.5 transition-colors"
            style={{ color: "rgba(255,255,255,0.75)", borderColor: "rgba(255,255,255,0.12)" }}
          >
            Register
          </Link>
          <Link
            href="/builder"
            className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-px hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)", boxShadow: "0 2px 12px rgba(13,148,136,0.4)" }}
          >
            Get started free
          </Link>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hero section
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden"
      style={{ paddingTop: "100px", paddingBottom: "80px", minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(13,148,136,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Teal glow top-right */}
        <div className="absolute" style={{
          top: "5%", right: "5%", width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(13,148,136,0.16) 0%, transparent 65%)",
          filter: "blur(50px)",
        }} />
        {/* Purple glow bottom-left */}
        <div className="absolute" style={{
          bottom: "10%", left: "5%", width: "450px", height: "450px",
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 65%)",
          filter: "blur(50px)",
        }} />
        {/* Thin top accent line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(13,148,136,0.5), transparent)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* Left — content */}
          <div>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="font-extrabold leading-[1.08] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.6rem,5.2vw,4rem)" }}
            >
              Build a resume that{" "}
              <span style={{
                background: "linear-gradient(135deg,#14B8A6 0%,#0D9488 50%,#6366F1 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                beats the algorithm
              </span>{" "}
              and gets you hired
            </h1>

            {/* Sub */}
            <p className="text-lg leading-relaxed mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.60)" }}>
              Paste any job description. Our Gemini AI rewrites your resume to
              match it — then gives you an ATS score so you know before you apply.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-9">
              <Link
                href="/builder"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)", boxShadow: "0 4px 20px rgba(13,148,136,0.40)" }}
                aria-label="Build your ATS resume for free"
              >
                Build my resume free {Ico.arrow}
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:-translate-y-0.5"
                style={{ border: "1px solid rgba(255,255,255,0.13)", color: "rgba(255,255,255,0.80)", backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                See how it works
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-5 text-xs" style={{ color: "rgba(255,255,255,0.42)" }}>
              {[
                { icon: Ico.user,  label: "No sign-up required" },
                { icon: Ico.file,  label: "Instant PDF export" },
                { icon: Ico.zap,   label: "Gemini AI powered" },
              ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1.5 font-medium">
                  <span style={{ color: "#14B8A6" }}>{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — preview card */}
          <div className="flex justify-center lg:justify-end">
            <HeroPreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroPreviewCard() {
  return (
    <div className="relative w-full max-w-125">

      {/* Floating score badge — top left */}
      <div
        className="absolute -left-4 top-12 z-10 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold"
        style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)", boxShadow: "0 8px 24px rgba(13,148,136,0.45)", color: "#fff" }}
        aria-label="ATS Score: 87%"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
        </svg>
        ATS Score: 87%
      </div>

      {/* Floating keywords badge — bottom right */}
      <div
        className="absolute -right-4 bottom-16 z-10 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold"
        style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.35)", color: "#a5b4fc", backdropFilter: "blur(8px)" }}
        aria-label="29 of 32 keywords matched"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        29 / 32 keywords
      </div>

      {/* Main card */}
      <div
        className="rounded-2xl overflow-hidden w-full"
        style={{
          backgroundColor: "#0C1A2C",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 32px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(13,148,136,0.06)",
        }}
      >
        {/* Card header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ backgroundColor: "#091525", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#EF4444" }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#10B981" }} />
            </div>
            <span className="text-xs font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>
              resume_software_eng.pdf
            </span>
          </div>
          <span
            className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide"
            style={{ backgroundColor: "rgba(13,148,136,0.15)", color: "#14B8A6", border: "1px solid rgba(13,148,136,0.3)" }}
          >
            AI Optimized
          </span>
        </div>

        {/* Card body */}
        <div className="flex" style={{ minHeight: "300px" }}>

          {/* Mini resume preview */}
          <div
            className="flex-1 p-3.5"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
            aria-label="Resume preview"
          >
            <div
              className="rounded-xl h-full p-4 text-left"
              style={{ backgroundColor: "#fff", fontSize: "10px", color: "#111" }}
            >
              <p className="font-black text-[13px] text-gray-900 leading-none tracking-tight">ALEX JOHNSON</p>
              <p className="font-semibold text-[10px] mt-0.5 mb-0.5" style={{ color: "#0D9488" }}>Senior Software Engineer</p>
              <p className="text-gray-400 text-[9px] mb-3">alex.j@email.com · San Francisco, CA · linkedin.com/in/alex</p>

              <div className="h-px mb-3" style={{ backgroundColor: "#e5e7eb" }} aria-hidden="true" />

              <p className="font-bold text-[8px] uppercase tracking-widest text-gray-500 mb-1.5">Professional Summary</p>
              {[100, 100, 78].map((w, i) => (
                <div key={i} className="h-1.5 rounded-full mb-1.5" style={{ width: `${w}%`, backgroundColor: "#e5e7eb" }} aria-hidden="true" />
              ))}

              <p className="font-bold text-[8px] uppercase tracking-widest text-gray-500 mt-3 mb-1.5">Experience</p>
              <p className="font-bold text-[9px] mb-0.5 text-gray-800">Senior Engineer — Stripe</p>
              <p className="text-[8px] text-gray-500 mb-1.5">2021 – Present</p>
              {[95, 100, 85].map((w, i) => (
                <div key={i} className="h-1.5 rounded-full mb-1.5" style={{ width: `${w}%`, backgroundColor: "#e5e7eb" }} aria-hidden="true" />
              ))}

              <p className="font-bold text-[8px] uppercase tracking-widest text-gray-500 mt-3 mb-1.5">Skills</p>
              <div className="flex flex-wrap gap-1" aria-hidden="true">
                {["React", "Node.js", "Python", "AWS", "SQL", "TypeScript"].map((s) => (
                  <span key={s} className="text-[7px] font-medium px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: "#EFF6FF", color: "#1D4ED8" }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ATS score panel */}
          <div className="flex flex-col px-4 py-4" style={{ minWidth: "160px" }}>
            <p className="text-[10px] font-bold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
              ATS Match Score
            </p>

            {/* Ring chart */}
            <div className="relative mx-auto mb-4" aria-label="ATS match score: 87 percent">
              <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
                <circle cx="45" cy="45" r="36" fill="none" stroke="rgba(13,148,136,0.12)" strokeWidth="7"/>
                <circle cx="45" cy="45" r="36" fill="none" stroke="url(#scoreGrad)" strokeWidth="7"
                  strokeDasharray="226" strokeDashoffset="29" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0D9488"/>
                    <stop offset="100%" stopColor="#14B8A6"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-white leading-none">87%</span>
                <span className="text-[9px] font-semibold mt-0.5" style={{ color: "#14B8A6" }}>Great match</span>
              </div>
            </div>

            {/* Progress bars */}
            <div className="w-full mb-3 space-y-2.5">
              {[
                { label: "Keywords", val: 91 },
                { label: "Format", val: 98 },
                { label: "Relevance", val: 85 },
              ].map(({ label, val }) => (
                <div key={label}>
                  <div className="flex justify-between text-[9px] mb-1">
                    <span style={{ color: "rgba(255,255,255,0.45)" }}>{label}</span>
                    <span className="font-bold text-white">{val}%</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.07)" }} role="progressbar" aria-valuenow={val} aria-valuemin={0} aria-valuemax={100} aria-label={`${label}: ${val}%`}>
                    <div className="h-full rounded-full" style={{ width: `${val}%`, background: "linear-gradient(90deg,#0D9488,#14B8A6)" }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* AI suggestions */}
            <div className="space-y-1.5">
              {["Stronger action verbs", "Keywords added", "ATS-safe format", "Role-focused summary"].map((s) => (
                <div key={s} className="flex items-center gap-1.5 text-[8px]" style={{ color: "rgba(255,255,255,0.55)" }}>
                  <span style={{ color: "#14B8A6" }}>{Ico.checkCircle}</span>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card footer */}
        <div className="px-4 py-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <Link
            href="/builder"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)", boxShadow: "0 2px 12px rgba(13,148,136,0.3)" }}
          >
            {Ico.download} Download Optimized PDF
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Metrics bar
// ─────────────────────────────────────────────────────────────────────────────

function MetricsBar() {
  const stats = [
    { value: "10,000+", label: "Resumes built" },
    { value: "87%",     label: "Avg. ATS score" },
    { value: "3×",      label: "Faster to customize" },
    { value: "100%",    label: "Free forever" },
  ];

  return (
    <div style={{ backgroundColor: "#091525", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x" style={{ divideColor: "rgba(255,255,255,0.07)" }}>
          {stats.map(({ value, label }, i) => (
            <div key={label} className="py-6 px-6 text-center" style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.07)" : undefined }}>
              <p className="text-2xl font-black" style={{ color: "#14B8A6" }}>{value}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: "rgba(255,255,255,0.45)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Features — light section
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    badge: "Score before you apply",
    badgeBg: "#ECFDF5", badgeText: "#065F46",
    iconBg: "linear-gradient(135deg,#ECFDF5,#D1FAE5)", iconColor: "#059669",
    Icon: "chart",
    title: "Know your ATS score instantly",
    desc: "Get an ATS match score for any job description so you know exactly how competitive your resume is before you click apply.",
    stat: "87%", statLabel: "Average match score improvement", statColor: "#0D9488",
    accentColor: "#0D9488",
  },
  {
    badge: "AI-tailored in seconds",
    badgeBg: "#EEF2FF", badgeText: "#3730A3",
    iconBg: "linear-gradient(135deg,#EEF2FF,#E0E7FF)", iconColor: "#4F46E5",
    Icon: "cpu",
    title: "Let AI rewrite it for the role",
    desc: "Gemini AI rewrites your summary, skills, and work experience to match the job's exact requirements — without inventing anything.",
    stat: "3×", statLabel: "Faster resume customization", statColor: "#6366F1",
    accentColor: "#6366F1",
  },
  {
    badge: "Clean & recruiter-ready",
    badgeBg: "#FFF7ED", badgeText: "#9A3412",
    iconBg: "linear-gradient(135deg,#FFF7ED,#FFEDD5)", iconColor: "#EA580C",
    Icon: "file",
    title: "Export a clean, ATS-safe PDF",
    desc: "Download a professional, formatting-safe PDF that any ATS can parse and any recruiter will love.",
    stat: "100%", statLabel: "ATS-safe formatting guaranteed", statColor: "#EA580C",
    accentColor: "#EA580C",
  },
];

function FeaturesSection() {
  const iconMap = { chart: Ico.chart, cpu: Ico.cpu, file: Ico.file };

  return (
    <section id="features" aria-labelledby="features-heading" className="py-28" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0D9488" }}>
            Features
          </p>
          <h2
            id="features-heading"
            className="font-extrabold tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#0F172A" }}
          >
            Everything you need before you click apply
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "#64748B" }}>
            A complete toolkit to create, optimize, and export a resume that performs.
          </p>
        </div>

        {/* Cards */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
          {FEATURES.map(({ badge, badgeBg, badgeText, iconBg, iconColor, Icon, title, desc, stat, statLabel, statColor, accentColor }) => (
            <li
              key={title}
              className="bg-white rounded-2xl p-7 flex flex-col"
              style={{
                border: "1px solid #E2E8F0",
                boxShadow: "0 1px 8px rgba(0,0,0,0.06)",
                borderTop: `3px solid ${accentColor}`,
              }}
            >
              <span
                className="inline-block text-[11px] font-bold px-3 py-1 rounded-full mb-5 self-start uppercase tracking-wide"
                style={{ backgroundColor: badgeBg, color: badgeText }}
              >
                {badge}
              </span>
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0"
                style={{ background: iconBg }}
                aria-hidden="true"
              >
                <span style={{ color: iconColor }}>{iconMap[Icon]}</span>
              </div>
              <h3 className="font-bold text-lg mb-3 leading-snug" style={{ color: "#0F172A" }}>
                {title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#64748B" }}>
                {desc}
              </p>
              <div className="mt-7 pt-6" style={{ borderTop: "1px solid #F1F5F9" }}>
                <p className="text-3xl font-black leading-none" style={{ color: statColor }}>{stat}</p>
                <p className="text-xs mt-1 font-medium" style={{ color: "#94A3B8" }}>{statLabel}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI Showcase — before / after
// ─────────────────────────────────────────────────────────────────────────────

function AIShowcase() {
  return (
    <section aria-labelledby="ai-heading" className="py-28" style={{ backgroundColor: "#030A14" }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#14B8A6" }}>
            AI That Makes a Difference
          </p>
          <h2
            id="ai-heading"
            className="font-extrabold mb-4"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#fff" }}
          >
            See exactly what the AI improves
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: "rgba(255,255,255,0.50)" }}>
            Smarter phrasing. Stronger action verbs. Higher match scores.
          </p>
        </div>

        {/* Before / After cards */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-3">
          {/* Before */}
          <div
            className="flex-1 rounded-2xl p-6"
            style={{ backgroundColor: "#0C1A2C", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-md"
                style={{ backgroundColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}
              >
                Before — Generic
              </span>
              <span className="text-xs font-bold" style={{ color: "#EF4444" }}>42% match</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
              • Responsible for developing web applications with JavaScript and React.
            </p>
            <p className="text-sm leading-relaxed mt-2" style={{ color: "rgba(255,255,255,0.58)" }}>
              • Worked on backend services and helped with database management.
            </p>
          </div>

          {/* Center arrow */}
          <div className="flex items-center justify-center shrink-0">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center rotate-90 sm:rotate-0"
              style={{ backgroundColor: "rgba(13,148,136,0.15)", border: "1px solid rgba(13,148,136,0.3)" }}
            >
              <span style={{ color: "#14B8A6" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </span>
            </div>
          </div>

          {/* After */}
          <div
            className="flex-1 rounded-2xl p-6"
            style={{ backgroundColor: "rgba(13,148,136,0.07)", border: "1px solid rgba(13,148,136,0.22)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-md"
                style={{ backgroundColor: "rgba(13,148,136,0.15)", color: "#14B8A6" }}
              >
                After — AI Optimized
              </span>
              <span className="text-xs font-bold" style={{ color: "#14B8A6" }}>87% match</span>
            </div>
            <p className="text-sm leading-relaxed text-white">
              •{" "}
              <span style={{ color: "#14B8A6", fontWeight: 600 }}>Engineered</span> high-performance web applications using React and TypeScript,{" "}
              <span style={{ color: "#14B8A6", fontWeight: 600 }}>reducing page load by 40%</span>{" "}
              and improving engagement scores.
            </p>
            <p className="text-sm leading-relaxed text-white mt-2">
              •{" "}
              <span style={{ color: "#14B8A6", fontWeight: 600 }}>Architected</span> RESTful microservices with Node.js and PostgreSQL, supporting{" "}
              <span style={{ color: "#14B8A6", fontWeight: 600 }}>2M+ daily active users</span>.
            </p>
          </div>
        </div>

        {/* Score improvement badge */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-sm font-bold"
            style={{ background: "rgba(13,148,136,0.12)", border: "1px solid rgba(13,148,136,0.25)" }}
          >
            <span style={{ color: "#14B8A6" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
              </svg>
            </span>
            <span style={{ color: "rgba(255,255,255,0.6)" }}>ATS score improved from</span>
            <span style={{ color: "#EF4444" }}>42%</span>
            <span style={{ color: "rgba(255,255,255,0.35)" }}>→</span>
            <span style={{ color: "#14B8A6" }}>87%</span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-black"
              style={{ backgroundColor: "rgba(13,148,136,0.2)", color: "#14B8A6" }}
            >
              +45 pts
            </span>
          </div>
        </div>

        {/* Checkmarks */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list" aria-label="AI improvements">
          {[
            { label: "Stronger action verbs", color: "#0D9488" },
            { label: "Relevant keywords added", color: "#6366F1" },
            { label: "Cleaner ATS phrasing", color: "#0D9488" },
            { label: "Role-focused summary", color: "#6366F1" },
          ].map(({ label, color }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium"
              style={{ backgroundColor: "#0C1A2C", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.72)" }}
              role="listitem"
            >
              <span style={{ color }}>{Ico.check}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// How It Works — 4 steps
// ─────────────────────────────────────────────────────────────────────────────

const HOW_STEPS = [
  { n: "01", title: "Build or paste your resume", desc: "Start fresh or paste your existing content. Add experience, skills, and education in our guided editor.", iconKey: "edit", color: "#0D9488" },
  { n: "02", title: "Paste the job description", desc: "Drop in the full job posting. The AI extracts key requirements and keywords automatically.", iconKey: "file", color: "#6366F1" },
  { n: "03", title: "Review AI suggestions & score", desc: "See your tailored resume and ATS match score side by side. Accept or refine any change.", iconKey: "chart", color: "#F59E0B" },
  { n: "04", title: "Download your optimized resume", desc: "Export a clean, ATS-friendly PDF that's ready to impress recruiters immediately.", iconKey: "download", color: "#10B981" },
];

function HowItWorks() {
  const iconMap = { edit: Ico.edit, file: Ico.file, chart: Ico.chart, download: Ico.download };

  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="py-28" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0D9488" }}>
            How It Works
          </p>
          <h2
            id="how-heading"
            className="font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2rem,4vw,3rem)", color: "#0F172A" }}
          >
            From job post to offer-ready resume
          </h2>
        </div>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 list-none p-0 mb-12">
          {HOW_STEPS.map(({ n, title, desc, iconKey, color }) => (
            <li key={n}>
              <div
                className="bg-white rounded-2xl p-6 h-full"
                style={{ border: "1px solid #E2E8F0", boxShadow: "0 1px 6px rgba(0,0,0,0.05)", borderLeft: `4px solid ${color}` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm shrink-0"
                    style={{ background: `linear-gradient(135deg,${color}dd,${color}99)` }}
                    aria-label={`Step ${n}`}
                  >
                    {n}
                  </span>
                  <span style={{ color }}>{iconMap[iconKey]}</span>
                </div>
                <h3 className="font-bold text-sm mb-2 leading-snug" style={{ color: "#0F172A" }}>
                  {title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#64748B" }}>
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="text-center">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)", boxShadow: "0 4px 20px rgba(13,148,136,0.30)" }}
          >
            Try the AI Resume Builder Free {Ico.arrow}
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
  { label: "Keyword match",       value: 87, display: "28 / 32", color: "#0D9488" },
  { label: "Formatting safety",   value: 98, display: "98%",     color: "#6366F1" },
  { label: "Role alignment",      value: 90, display: "90%",     color: "#F59E0B" },
  { label: "Experience relevance",value: 85, display: "85%",     color: "#10B981" },
];

const SCORE_POINTS = [
  { label: "Keyword match",        desc: "measures how well your skills cover the job's required keywords." },
  { label: "Formatting safety",    desc: "ensures your PDF layout won't confuse ATS parsers." },
  { label: "Role alignment",       desc: "checks how closely your experience matches the role." },
  { label: "Experience relevance", desc: "scores the depth and impact of your work history." },
];

function ATSScoreSection() {
  return (
    <section aria-labelledby="score-heading" className="py-28" style={{ backgroundColor: "#030A14" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Score card */}
        <div
          className="rounded-2xl p-8"
          style={{ backgroundColor: "#0C1A2C", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 48px rgba(0,0,0,0.5)" }}
        >
          <p className="text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.38)" }}>
            ATS Score Report
          </p>

          {/* Ring + label */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative shrink-0" aria-label="ATS score: 87 out of 100 — Great Match">
              <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: "rotate(-90deg)" }} aria-hidden="true">
                <circle cx="55" cy="55" r="44" fill="none" stroke="rgba(13,148,136,0.10)" strokeWidth="9"/>
                <circle cx="55" cy="55" r="44" fill="none" stroke="url(#scoreGrad2)" strokeWidth="9"
                  strokeDasharray="276" strokeDashoffset="36" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="scoreGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0D9488"/>
                    <stop offset="100%" stopColor="#14B8A6"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-white leading-none">87</span>
                <span className="text-xs font-bold mt-0.5" style={{ color: "#14B8A6" }}>Great Match</span>
              </div>
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-snug">Strong ATS alignment</p>
              <p className="text-sm mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Your resume is well-optimized for this role.
              </p>
            </div>
          </div>

          {/* Bars */}
          <div className="space-y-4">
            {SCORE_BARS.map(({ label, value, display, color }) => (
              <div key={label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: "rgba(255,255,255,0.55)" }}>{label}</span>
                  <span className="font-bold text-white">{display}</span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                  role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${label}: ${display}`}
                >
                  <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }}/>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-6 flex items-center gap-2 text-xs rounded-xl px-4 py-3"
            style={{ backgroundColor: "rgba(13,148,136,0.08)", border: "1px solid rgba(13,148,136,0.18)", color: "#14B8A6" }}
          >
            {Ico.checkCircle}
            Your resume is well-optimized for this role — ready to apply.
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#14B8A6" }}>
            Understand Your Score
          </p>
          <h2
            id="score-heading"
            className="font-extrabold mb-5"
            style={{ fontSize: "clamp(1.75rem,3.5vw,2.5rem)", color: "#fff" }}
          >
            Know exactly where your resume stands
          </h2>
          <p className="mb-7 leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>
            Our ATS score evaluates four dimensions of your resume — so you know
            precisely what to improve before you apply.
          </p>

          <ul className="space-y-4 mb-8 list-none p-0">
            {SCORE_POINTS.map(({ label, desc }) => (
              <li key={label} className="flex items-start gap-3">
                <span
                  className="mt-0.5 shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: "rgba(13,148,136,0.15)", color: "#14B8A6" }}
                  aria-hidden="true"
                >
                  {Ico.check}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <strong className="text-white font-semibold">{label}</strong>{" "}{desc}
                </p>
              </li>
            ))}
          </ul>

          <div
            className="flex items-start gap-3 p-4 rounded-xl text-sm"
            style={{ backgroundColor: "rgba(13,148,136,0.07)", border: "1px solid rgba(13,148,136,0.20)" }}
          >
            <span className="text-lg shrink-0" aria-hidden="true">💡</span>
            <p style={{ color: "rgba(255,255,255,0.65)" }}>
              Aim for{" "}
              <strong className="text-white">80%+</strong>{" "}
              to maximize your chances of being shortlisted by recruiters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "What is ATSResume?",
    a: "ATSResume is a free AI-powered resume builder that helps job seekers create ATS-optimized resumes. Build your resume, paste any job description, and our AI — powered by Google Gemini — customizes it to match the role's keywords and requirements.",
  },
  {
    q: "Is ATSResume free to use?",
    a: "Yes, completely free. There are no subscriptions, paywalls, or hidden fees. You can build, optimize, and download your ATS-ready resume at no cost — forever.",
  },
  {
    q: "How does the AI resume optimizer work?",
    a: "ATSResume uses Google Gemini AI to compare your resume with a target job description. It identifies keyword gaps, rewrites your professional summary, tailors your skills, and adjusts your work experience — then generates an ATS match score.",
  },
  {
    q: "Is my data safe and private?",
    a: "Yes. Your resume data is only used to generate your customized resume. We do not sell or share your data with third parties. You can download a JSON backup of your resume at any time.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. You can build and download your resume without signing up. Creating a free account lets you save your resume to the cloud and access it from any device.",
  },
  {
    q: "Can I customize for multiple jobs?",
    a: "Absolutely. You can create as many AI-customized versions of your resume as you like — one for each role you're applying to. Each version is saved separately with its own ATS match score.",
  },
];

function FAQSection() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-28" style={{ backgroundColor: "#F8FAFC" }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "#0D9488" }}>FAQ</p>
          <h2
            id="faq-heading"
            className="font-extrabold tracking-tight"
            style={{ fontSize: "clamp(2rem,4vw,2.75rem)", color: "#0F172A" }}
          >
            Frequently asked questions
          </h2>
        </div>

        <FAQAccordion faqs={FAQ_ITEMS} />

        <p className="text-center mt-10 text-sm" style={{ color: "#94A3B8" }}>
          Still have questions?{" "}
          <Link href="/register" className="font-semibold underline underline-offset-2" style={{ color: "#0D9488" }}>
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
    <section aria-labelledby="cta-heading" className="py-28" style={{ backgroundColor: "#030A14" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative">

        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(13,148,136,0.14) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl mx-auto mb-8 flex items-center justify-center relative"
          style={{ background: "linear-gradient(135deg,rgba(13,148,136,0.20),rgba(13,148,136,0.08))", border: "1px solid rgba(13,148,136,0.25)" }}
          aria-hidden="true"
        >
          <span style={{ color: "#14B8A6" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
            </svg>
          </span>
        </div>

        <h2
          id="cta-heading"
          className="font-extrabold text-white mb-4 relative"
          style={{ fontSize: "clamp(1.9rem,3.8vw,2.8rem)", letterSpacing: "-0.02em" }}
        >
          Create a better resume for{" "}
          <span style={{
            background: "linear-gradient(135deg,#14B8A6,#6366F1)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            your next application
          </span>
        </h2>
        <p className="text-lg mb-10 relative" style={{ color: "rgba(255,255,255,0.50)" }}>
          Free to use. No sign-up required. Built to help you get noticed.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-6 relative">
          <Link
            href="/builder"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)", boxShadow: "0 6px 28px rgba(13,148,136,0.45)" }}
            aria-label="Build your ATS resume for free"
          >
            Build my resume free {Ico.arrow}
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-sm transition-all hover:-translate-y-0.5"
            style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            Create free account
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs font-medium relative" style={{ color: "rgba(255,255,255,0.35)" }}>
          <span className="flex items-center gap-1.5"><span style={{ color: "#14B8A6" }}>{Ico.check}</span>No credit card</span>
          <span className="flex items-center gap-1.5"><span style={{ color: "#14B8A6" }}>{Ico.check}</span>Instant PDF download</span>
          <span className="flex items-center gap-1.5"><span style={{ color: "#14B8A6" }}>{Ico.check}</span>Gemini AI powered</span>
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
      { label: "Features", href: "#features", anchor: true },
      { label: "How it works", href: "#how-it-works", anchor: true },
      { label: "FAQ", href: "#faq", anchor: true },
    ],
  },
  {
    title: "App",
    links: [
      { label: "Resume Builder", href: "/builder" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "AI Customizer", href: "/builder" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign in", href: "/login" },
      { label: "Register free", href: "/register" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "/" },
      { label: "Terms of service", href: "/" },
    ],
  },
];

function SiteFooter() {
  return (
    <footer
      className="py-14"
      style={{ backgroundColor: "#020710", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 mb-10">

          {/* Brand */}
          <div className="lg:w-64 shrink-0">
            <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label="ATSResume">
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm"
                style={{ background: "linear-gradient(135deg,#0D9488,#0F766E)" }}
                aria-hidden="true"
              >
                AR
              </span>
              <span className="font-bold text-base text-white">ATSResume</span>
            </Link>
            <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.38)" }}>
              AI-powered resume optimization to help you get noticed by recruiters and hired faster.
            </p>
            <nav aria-label="Social media links" className="flex gap-3">
              {[
                { icon: Ico.twitter,  label: "Twitter" },
                { icon: Ico.linkedin, label: "LinkedIn" },
                { icon: Ico.github,   label: "GitHub" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  {icon}
                </a>
              ))}
            </nav>
          </div>

          {/* Links */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {FOOTER_LINKS.map(({ title, links }) => (
              <nav key={title} aria-label={`${title} links`}>
                <p className="text-xs font-bold uppercase tracking-wider text-white mb-4">{title}</p>
                <ul className="space-y-2.5 list-none p-0">
                  {links.map(({ label, href, anchor }) => (
                    <li key={label}>
                      {anchor ? (
                        <a
                          href={href}
                          className="text-xs transition-colors hover:text-white"
                          style={{ color: "rgba(255,255,255,0.42)" }}
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="text-xs transition-colors hover:text-white"
                          style={{ color: "rgba(255,255,255,0.42)" }}
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

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.27)" }}
        >
          <span>© {new Date().getFullYear()} ATSResume. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            Powered by{" "}
            <span style={{ color: "#14B8A6", fontWeight: 600 }}>Google Gemini AI</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
