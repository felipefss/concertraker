import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Concertraker - Track your concert memories',
  description:
    "Keep track of all the concerts you've attended and connect with friends who shared the experience.",
};

export default function RootLayout({
  children,
  landing,
  main,
}: Readonly<{
  children: React.ReactNode;
  landing: React.ReactNode;
  main: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* {children} */}
        {main}
        {/* {landing} */}
      </body>
    </html>
  );
}
