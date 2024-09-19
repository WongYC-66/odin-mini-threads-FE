'use client';

import localFont from "next/font/local";
import "./globals.css";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import NavBarLeft from "./ui/layout/navBar-left";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children, title }) {

  const router = useRouter();
  const pathName = usePathname();
  const [username, setUsername] = useState('')

  // Check user's Authentication, if not signed-in, redirect to sign-in page
  useEffect(() => {
    const checkAuth = () => {
      const { username, id, token } = JSON.parse(localStorage.getItem('user')) || {}
      if (!username || !token) {
        console.log('Invalid login credentials, please log in');
        router.push('/sign-in');
        return
      }
      setUsername(username)
    }

    if (pathName != '/sign-in' && pathName != '/sign-up')
      checkAuth();

  }, [router, pathName]);

  return (
    <html lang="en">

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <div className="flex h-screen bg-slate-50">

          {/* Left Section - Nav Bar */}
          {username && <NavBarLeft username={username} />}

          {/* Middle Section - Main */}
          <div className="flex flex-col grow items-center">

            {/* Render children Page */}
            <main className="flex flex-col align-middle grow w-full">
              {children}
            </main>

            {/* Mid-Bottom footer */}
            <footer className="flex px-6 text-xs">
              <li className="hover:cursor-pointer list-none mx-1"> Created by YcWong 2024 </li>
              <li className="hover:cursor-pointer list-none mx-1">Threads Terms</li>
              <li className="hover:cursor-pointer list-none mx-1">Privacy Policy</li>
              <li className="hover:cursor-pointer list-none mx-1">Cookies Policy</li>
              <li className="hover:cursor-pointer list-none mx-1">Report a problem </li>
            </footer>
          </div>
        </div>

      </body>

    </html>
  );
}
