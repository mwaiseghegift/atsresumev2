import Builder from "../../components/builder";

export const metadata = {
  title: "Resume Builder",
  description:
    "Build your ATS-optimized resume with AI. Fill in your details, customize for any job description using Google Gemini AI, and download a professional PDF.",
  alternates: {
    canonical: "/builder",
  },
};

export default function BuilderPage() {
  return <Builder />;
}
