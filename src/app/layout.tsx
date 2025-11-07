import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AppSetz',
  description: 'Professional Flutter development services. Transform your ideas into reality with high-quality, cross-platform mobile applications.',
  keywords: 'Flutter, Mobile App Development, Cross-platform, React Native, iOS, Android',
  authors: [{ name: 'Pavan Kumar' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/assets/appkraft_logo-removebg-preview.png',
    shortcut: '/assets/appkraft_logo-removebg-preview.png',
    apple: '/assets/appkraft_logo-removebg-preview.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
