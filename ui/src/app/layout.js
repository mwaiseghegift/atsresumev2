import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900">
        <AuthProvider>
          <Navbar />
          <div className={'content'}>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
