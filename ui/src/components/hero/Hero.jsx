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
            <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-[rgba(16,34,45,0.82)] border-b border-[rgba(233,196,106,0.12)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 rounded-lg bg-[linear-gradient(135deg,#2A9D8F,#F4A261)] flex items-center justify-center shadow-lg shadow-black/20 transition-shadow">
                            <span className="text-[#082029] font-black text-sm">A</span>
                        </div>
                        <span className="theme-brand text-white font-bold text-lg tracking-tight">
                            ATS<span className="theme-accent-text">Resume</span>
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
                                <span className="absolute bottom-1 left-4 right-4 h-px bg-[linear-gradient(90deg,#2A9D8F,#E9C46A)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
                            </Link>
                        ))}
                        <Link
                            href="/builder"
                            className="theme-button-primary ml-3 px-4 py-1.5 text-sm font-semibold"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* ── Hero Section ── */}
            <section className="relative min-h-screen bg-[linear-gradient(180deg,#173744_0%,#10222d_100%)] overflow-hidden flex flex-col">
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
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[rgba(42,157,143,0.22)] blur-[120px]" />
                    <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-[rgba(233,196,106,0.16)] blur-[80px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full bg-[rgba(231,111,81,0.14)] blur-[80px]" />
                </div>

                {/* Hero content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-24 pb-16">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(233,196,106,0.12)] border border-[rgba(233,196,106,0.22)] text-[#f4c777] text-xs font-semibold uppercase tracking-widest mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E9C46A] animate-pulse" />
                        Free ATS Resume Builder
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tight max-w-4xl">
                        Get hired with an{" "}
                        <span className="block mt-1 bg-[linear-gradient(90deg,#E9C46A,#F4A261,#2A9D8F)] bg-clip-text text-transparent">
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
                    <p className="text-[rgba(248,243,231,0.72)] text-lg max-w-2xl mb-10 leading-relaxed">
                        ATSResume uses cutting-edge technology to analyze and optimize your resume for maximum visibility with applicant tracking systems. No formatting frustration — just results.
                    </p>

                    {/* CTA */}
                    <Link
                        href="/builder"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[linear-gradient(135deg,#E9C46A,#F4A261)] text-[#082029] font-bold text-lg shadow-lg shadow-black/20 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                    >
                        <span className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                        Build My Resume
                        <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>

                    {/* Trust line */}
                    <p className="mt-6 text-[rgba(248,243,231,0.5)] text-sm">Free forever · No sign-up required · Download PDF instantly</p>
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
        color: "bg-[linear-gradient(135deg,#2A9D8F,#264653)]",
    },
    {
        icon: <GrFingerPrint />,
        title: "Easy to Use",
        desc: "Build a professional, ATS-friendly resume in minutes. No more formatting frustration or wasted time.",
        color: "bg-[linear-gradient(135deg,#E9C46A,#F4A261)]",
    },
    {
        icon: <MdMoneyOff />,
        title: "Completely Free",
        desc: "No hidden fees or subscriptions. Just start building your dream resume with zero cost — forever.",
        color: "bg-[linear-gradient(135deg,#2A9D8F,#E9C46A)]",
    },
    {
        icon: <DiResponsive />,
        title: "Mobile-Friendly",
        desc: "Fully responsive so you can build your resume on any device, anywhere, at any time.",
        color: "bg-[linear-gradient(135deg,#264653,#2A9D8F)]",
    },
    {
        icon: <FcDataBackup />,
        title: "Download Backup",
        desc: "Export your resume data as JSON to keep it safe. Restore it anytime in the future.",
        color: "bg-[linear-gradient(135deg,#E9C46A,#E76F51)]",
    },
    {
        icon: <FcUpload />,
        title: "Upload Backup",
        desc: "Restore your resume from a saved JSON backup — perfect for switching devices.",
        color: "bg-[linear-gradient(135deg,#F4A261,#E76F51)]",
    },
];

const About = () => {
    return (
        <section className="bg-[linear-gradient(180deg,#10222d_0%,#173744_100%)] relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-px bg-[linear-gradient(90deg,transparent,rgba(233,196,106,0.4),transparent)]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                {/* Section header */}
                <div className="text-center mb-16">
                    <p className="text-[#f4c777] text-xs font-semibold uppercase tracking-widest mb-3">Why ATSResume?</p>
                    <h2 className="theme-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Everything you need to
                        <span className="block bg-[linear-gradient(90deg,#E9C46A,#2A9D8F)] bg-clip-text text-transparent">
                            land your dream job
                        </span>
                    </h2>
                </div>

                {/* Feature cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map(({ icon, title, desc, color }) => (
                        <div
                            key={title}
                            className="group relative bg-[rgba(19,47,59,0.72)] border border-[rgba(233,196,106,0.12)] rounded-2xl p-6 backdrop-blur-sm hover:-translate-y-1 hover:border-[rgba(233,196,106,0.32)] transition-all duration-300 overflow-hidden"
                        >
                            {/* Card glow on hover */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(233,196,106,0.10) 0%, transparent 70%)' }} />

                            {/* Icon */}
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} text-white text-2xl mb-5 shadow-lg`}>
                                {icon}
                            </div>

                            <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
                            <p className="text-[rgba(248,243,231,0.7)] text-sm leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 rounded-2xl bg-[linear-gradient(135deg,rgba(42,157,143,0.16),rgba(233,196,106,0.14),rgba(231,111,81,0.14))] border border-[rgba(233,196,106,0.2)] p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-white font-bold text-2xl">Ready to get started?</h3>
                        <p className="text-[rgba(248,243,231,0.68)] text-sm mt-1">Build your ATS-ready resume in minutes — completely free.</p>
                    </div>
                    <Link
                        href="/builder"
                        className="theme-button-primary shrink-0 px-8 py-3.5 text-base"
                    >
                        Build My Resume →
                    </Link>
                </div>
            </div>
        </section>
    );
};
