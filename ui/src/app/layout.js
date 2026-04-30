import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-shell">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
