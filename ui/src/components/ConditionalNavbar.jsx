"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  // These render their own header (or none, for /print). Dashboard is a prefix match
  // so nested routes (e.g. /dashboard/jobs) don't get a second navbar on top of theirs.
  if (pathname === '/' || pathname === '/builder' || pathname === '/print' || pathname.startsWith('/dashboard')) return null;
  return <Navbar />;
}
