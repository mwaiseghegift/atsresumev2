import Link from "next/link";
import { GrOptimize, GrFingerPrint } from "react-icons/gr";
import { MdMoneyOff } from "react-icons/md";
import { DiResponsive } from "react-icons/di";
import { FcDataBackup, FcUpload } from "react-icons/fc";
import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
    return (
        <>
            {/* ── Navbar ── */}
            <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-slate-900/70 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-700 flex items-center justify-center shadow-lg shadow-fuchsia-900/40 group-hover:shadow-fuchsia-700/50 transition-shadow">
                            <span className="text-white font-black text-sm">A</span>
                        </div>
                        <span className="text-white font-bold text-lg tracking-tight">
                            ATS<span className="text-fuchsia-400">Resume</span>
                        </span>
                    </Link>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center gap-1">
                        {[
                            { href: "/builder", label: "Builder" },
                            { href: "/templates", label: "Templates" },
                            { href: "/examples", label: "Examples" },
                        ].map(({ href, label }) => (
                            <Link
                                key={label}
                                href={href}
                                className="relative px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors group"
                            >
                                {label}
                                <span className="absolute bottom-1 left-4 right-4 h-px bg-fuchsia-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                            </Link>
                        ))}
                        <Link
                            href="/builder"
                            className="ml-3 px-4 py-1.5 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="relative min-h-screen bg-slate-900 overflow-hidden flex flex-col">
                {/* Background decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Grid */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                            backgroundSize: '60px 60px',
                        }}
                    />
                    {/* Glows */}
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-fuchsia-700/20 blur-[120px]" />
                    <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-700/15 blur-[80px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-violet-600/10 blur-[80px]" />
                </div>

                {/* Hero content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-300 text-xs font-semibold uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse" />
                        Free ATS Resume Builder
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight max-w-4xl">
                        Get hired with an{" "}
                        <span className="block mt-1 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">
                            <Typewriter
                                words={['optimized', 'perfect', 'professional']}
                                loop={0}
                                cursor
                                cursorStyle='|'
                                typeSpeed={100}
                                deleteSpeed={50}
                                delaySpeed={1500}
                            />
                        </span>
                        <span className="block mt-1">Resume.</span>
                    </h1>

                    {/* Sub */}
                    <p className="text-slate-400 text-lg max-w-2xl mb-10 leading-relaxed">
                        ATSResume uses cutting-edge technology to analyze and optimize your resume for maximum visibility with applicant tracking systems. No formatting frustration — just results.
                    </p>

                    {/* CTA */}
                    <Link
                        href="/builder"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-lg shadow-lg shadow-fuchsia-900/40 hover:shadow-fuchsia-700/50 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                        Build My Resume
                        <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>

                    {/* Trust line */}
                    <p className="mt-6 text-slate-600 text-sm">Free forever · No sign-up required · Download PDF instantly</p>
                </div>
            </section>

            {/* ── Features Section ── */}
            <About />
        </>
    );
}

const features = [
    {
        icon: <GrOptimize />,
        title: "ATS-Optimized",
        desc: "Cutting-edge technology analyzes and optimizes your resume for maximum visibility with Applicant Tracking Systems.",
        color: "from-fuchsia-500 to-pink-600",
        glow: "fuchsia",
    },
    {
        icon: <GrFingerPrint />,
        title: "Easy to Use",
        desc: "Build a professional, ATS-friendly resume in minutes. No more formatting frustration or wasted time.",
        color: "from-violet-500 to-purple-600",
        glow: "violet",
    },
    {
        icon: <MdMoneyOff />,
        title: "Completely Free",
        desc: "No hidden fees or subscriptions. Just start building your dream resume with zero cost — forever.",
        color: "from-emerald-500 to-teal-600",
        glow: "emerald",
    },
    {
        icon: <DiResponsive />,
        title: "Mobile-Friendly",
        desc: "Fully responsive so you can build your resume on any device, anywhere, at any time.",
        color: "from-sky-500 to-blue-600",
        glow: "sky",
    },
    {
        icon: <FcDataBackup />,
        title: "Download Backup",
        desc: "Export your resume data as JSON to keep it safe. Restore it anytime in the future.",
        color: "from-amber-500 to-orange-600",
        glow: "amber",
    },
    {
        icon: <FcUpload />,
        title: "Upload Backup",
        desc: "Restore your resume from a saved JSON backup — perfect for switching devices.",
        color: "from-rose-500 to-red-600",
        glow: "rose",
    },
];

const About = () => {
    return (
        <section className="bg-slate-900 relative overflow-hidden">
            {/* Subtle top separator glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Section header */}
                <div className="text-center mb-16">
                    <p className="text-fuchsia-400 text-xs font-semibold uppercase tracking-widest mb-3">Why ATSResume?</p>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Everything you need to
                        <span className="block bg-gradient-to-r from-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                            land your dream job
                        </span>
                    </h2>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map(({ icon, title, desc, color }) => (
                        <div
                            key={title}
                            className="group relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm hover:-translate-y-1 hover:border-slate-600/80 transition-all duration-300 overflow-hidden"
                        >
                            {/* Card glow on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(192,38,211,0.08) 0%, transparent 70%)' }} />

                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${color} text-white text-2xl mb-5 shadow-lg`}>
                                {icon}
                            </div>

                            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA strip */}
                <div className="mt-20 rounded-2xl bg-gradient-to-r from-fuchsia-900/40 to-purple-900/40 border border-fuchsia-500/20 p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-white font-bold text-2xl">Ready to get started?</h3>
                        <p className="text-slate-400 text-sm mt-1">Build your ATS-ready resume in minutes — completely free.</p>
                    </div>
                    <Link
                        href="/builder"
                        className="shrink-0 px-8 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white font-bold text-base hover:-translate-y-0.5 hover:shadow-lg hover:shadow-fuchsia-900/50 transition-all duration-200"
                    >
                        Build My Resume →
                    </Link>
                </div>
            </div>
        </section>
    );
};
