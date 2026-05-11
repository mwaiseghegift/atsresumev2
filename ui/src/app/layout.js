import { Open_Sans } from "next/font/google";
import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import ConditionalNavbar from "../components/ConditionalNavbar";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
});

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
