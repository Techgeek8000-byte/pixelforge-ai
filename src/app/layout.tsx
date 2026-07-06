import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PixelForge AI — Free AI Image Generator, Avatars, Logos & More",
  description:
    "Generate stunning AI images for free. Create avatars, logos, wallpapers, thumbnails, art, and more. 100% free AI image tools powered by open-source models.",
  keywords: [
    "AI image generator",
    "free AI art",
    "AI avatar maker",
    "AI logo generator",
    "AI wallpaper",
    "text to image",
    "free AI tools",
    "AI art generator",
    "PixelForge",
  ],
  authors: [{ name: "PixelForge AI" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎨</text></svg>",
  },
  openGraph: {
    title: "PixelForge AI — Free AI Image Generator",
    description: "Generate stunning AI images for free. Avatars, logos, wallpapers, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7878398091851771"
          crossOrigin="anonymous"
        ></script>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CMV34ZVLE7"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CMV34ZVLE7');
            `,
          }}
        ></script>
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}