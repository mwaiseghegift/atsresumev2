"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  if (pathname === '/' || pathname === '/builder' || pathname === '/dashboard') return null; // these pages render their own headers
  return <Navbar />;
}
