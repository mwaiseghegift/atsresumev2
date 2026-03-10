import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900">
        <div className={'content'}>
          {children}
        </div>
      </body>
    </html>
  );
}
