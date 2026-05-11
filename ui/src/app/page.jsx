import Hero from "../components/hero/Hero";

export const metadata = {
  title: "ATS Resume V2 | AI Resume Builder & ATS Resume Optimizer",
  description:
    "Create ATS-friendly resumes with AI. ATS Resume V2 helps you customize resumes for specific job descriptions, improve keyword matching, and generate ATS match scores — free forever.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ATS Resume V2 | AI Resume Builder & ATS Resume Optimizer",
    description:
      "Build ATS-friendly resumes with AI. Paste a job description and get a tailored resume with an ATS match score in seconds.",
    url: "/",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "/#webapp",
      name: "ATS Resume V2",
      url: "https://atsresumev2.vercel.app",
      description:
        "AI-powered resume builder and ATS optimizer. Build, customize, and optimize your resume for any job description using Google Gemini AI.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "ATS resume optimization",
        "AI-powered resume customization with Google Gemini",
        "ATS match score generation",
        "PDF resume download",
        "Resume backup and restore",
        "Mobile-friendly resume builder",
      ],
    },
    {
      "@type": "Organization",
      "@id": "/#org",
      name: "ATS Resume V2",
      url: "https://atsresumev2.vercel.app",
      description:
        "AI-powered resume building and ATS optimization platform for job seekers.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an ATS resume builder?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An ATS (Applicant Tracking System) resume builder helps you create resumes that pass through automated screening software used by employers. ATS Resume V2 uses AI to analyze job descriptions and optimize your resume's keywords, structure, and content for maximum ATS compatibility.",
          },
        },
        {
          "@type": "Question",
          name: "How does the AI resume optimizer work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ATS Resume V2 uses Google Gemini AI to compare your resume with a target job description. It identifies keyword gaps, rewrites your professional summary, tailors your skills section, and adjusts your work experience descriptions — then generates a customized resume with an ATS match score.",
          },
        },
        {
          "@type": "Question",
          name: "Can this tool improve my resume match score?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. After you paste a job description into the AI Customizer, the tool generates a tailored version of your resume and an ATS match score showing how well your qualifications align with the role's requirements.",
          },
        },
        {
          "@type": "Question",
          name: "Does ATS Resume V2 rewrite my resume for a specific job description?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The AI customization feature rewrites your professional summary, skills, and work experience sections to align with the specific job description you provide — without altering your core qualifications or experience.",
          },
        },
        {
          "@type": "Question",
          name: "Is ATS Resume V2 free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, completely free. There are no subscriptions, paywalls, or hidden fees. You can build, optimize, and download your ATS-ready resume at no cost.",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
    </>
  );
}
