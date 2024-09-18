'use client';

import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';


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

    console.log(pathName)


    const checkAuth = () => {
      const { username, jwt } = JSON.parse(localStorage.getItem('user')) || {}
      if (!username || !jwt) {
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

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen">

          {/* Left Sectoin - Nav Bar */}
          {username &&
            <nav className="flex flex-col justify-between pe-16">
              <div>
                <Link href='/'>
                  <Image alt="logo.png" src="/logo.png" width={40} height={40} />
                </Link>
              </div>
              <div className="flex flex-col justify-between gap-4">
                <Link href='/'>
                  <Image alt="home.png" src="/home.png" width={40} height={40} />
                </Link>
                <Link href='/search'>
                  <Image alt="search.png" src="/search.png" width={40} height={40} />
                </Link>
                {/* add overlay to add new post */}
                <Image alt="plus.png" src="/plus.png" width={40} height={40} />

                <Link href='/activity'>
                  <Image alt="heart.png" src="/heart.png" width={40} height={40} />
                </Link>
                <Image alt="user.png" src="/user.png" width={40} height={40} />
              </div>
              <div className="flex flex-col justify-between gap-4">
                <Image alt="thumbtack.png" src="/thumbtack.png" width={40} height={40} />
                <Image alt="settings.png" src="/settings.png" width={40} height={40} />
              </div>
            </nav>
          }

          {/* Middle Section - Main */}
          <div className="flex flex-col grow items-center">

            {/* Render children Page */}
            <main className="flex flex-col align-middle grow w-full">
              {children}
            </main>

            {/* Mid-Bottom footer */}
            <footer className="flex px-6 text-xs">
              Created by YcWong 2024
              <li>Threads Terms</li>
              <li>Privacy Policy</li>
              <li>Cookies Policy</li>
              <li>Report a problem </li>
            </footer>
          </div>
        </div>

        {/* Right Section */}
        <div>

        </div>

      </body>
    </html>
  );
}
