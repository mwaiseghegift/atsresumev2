import { Open_Sans } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import ConditionalNavbar from "../components/ConditionalNavbar";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://atsresumev2.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | ATS Resume V2",
    default: "ATS Resume V2 | AI Resume Builder & ATS Resume Optimizer",
  },
  description:
    "Create ATS-friendly resumes with AI. ATS Resume V2 helps job seekers build and optimize resumes for specific job descriptions, generate ATS match scores, and get more interviews.",
  keywords: [
    "ATS resume builder",
    "AI resume builder",
    "resume optimizer",
    "ATS resume checker",
    "resume match score",
    "AI resume customization",
    "applicant tracking system",
    "job application resume",
    "free resume builder",
    "resume keyword optimization",
  ],
  authors: [{ name: "ATS Resume V2" }],
  creator: "ATS Resume V2",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ATS Resume V2",
    title: "ATS Resume V2 | AI Resume Builder & ATS Resume Optimizer",
    description:
      "Build ATS-friendly resumes with AI. Customize for any job description, get a match score, and download a professional PDF — free forever.",
    images: [
      {
        url: "/assets/logo.png",
        width: 512,
        height: 512,
        alt: "ATS Resume V2 — AI-Powered Resume Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS Resume V2 | AI Resume Builder & ATS Optimizer",
    description:
      "Build ATS-friendly resumes with AI. Customize for any job description and get a match score.",
    images: ["/assets/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={openSans.variable}>
      <body className="app-shell" suppressHydrationWarning>
        <AuthProvider>
          <ConditionalNavbar />
          <main className="relative z-10">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
