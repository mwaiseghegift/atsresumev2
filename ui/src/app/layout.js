import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import ConditionalNavbar from "../components/ConditionalNavbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
