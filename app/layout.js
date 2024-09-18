import localFont from "next/font/local";
import "./globals.css";
import Head from 'next/head';
import Image from 'next/image';

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

  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen p-4">

          {/* Left Sectoin - Nav Bar */}
          <nav className="flex flex-col justify-between">
            <div>
              <Image alt="logo.png" src="/logo.png" width={40} height={40} />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <Image alt="home.png" src="/home.png" width={40} height={40}/>
              <Image alt="search.png" src="/search.png" width={40} height={40} />
              <Image alt="plus.png" src="/plus.png" width={40} height={40} />
              <Image alt="heart.png" src="/heart.png" width={40} height={40} />
              <Image alt="user.png" src="/user.png" width={40} height={40} />
            </div>
            <div className="flex flex-col justify-between gap-4">
              <Image alt="thumbtack.png" src="/thumbtack.png" width={40} height={40} />
              <Image alt="settings.png" src="/settings.png" width={40} height={40} />
            </div>
          </nav>

          {/* Middle Section - Main */}
          <div className="flex flex-col ps-16">

            {/* Render children Page */}
            <main className="flex flex-col align-middle grow">
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
