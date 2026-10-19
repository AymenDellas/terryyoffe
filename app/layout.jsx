import './globals.css';

export const metadata = {
  title: 'Terry Yoffe — Coaching & Mentoring',
  description: 'One-to-one coaching with Terry Yoffe pairs practical strategy with mindset work to get at the pattern behind it.',
};

export const viewport = { themeColor: '#1b1b1a', colorScheme: 'dark' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/dm-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
