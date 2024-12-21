import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Periscope - Fetch and Read Web Content Instantly",
  description:
    "Periscope is a web content reader that removes popups, ads, and annoyances, providing a clean and distraction-free reading experience.",
  metadataBase: new URL('https://periscope.corsfix.com'),
  openGraph: {
    title: "Periscope - Fetch and Read Web Content Instantly",
    description: "Periscope is a web content reader that removes popups, ads, and annoyances, providing a clean and distraction-free reading experience.",
    images: [
      {
        url: '/periscope-2x1.png',
        width: 1200,
        height: 600,
        alt: 'Periscope - Web Content Reader'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Periscope - Fetch and Read Web Content Instantly",
    description: "Periscope is a web content reader that removes popups, ads, and annoyances, providing a clean and distraction-free reading experience.",
    images: ['/periscope-2x1.png']
  },
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any'
      },
      {
        url: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png'
      },
      {
        url: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png'
      }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
