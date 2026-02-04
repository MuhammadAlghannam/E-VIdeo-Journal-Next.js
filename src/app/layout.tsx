import Providers from "@/providers/Providers";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "HIS",
    template: "%s | HIS",
  },
  description:
    "Discover medical excellence: access cutting-edge medical content, research, and educational resources from leading healthcare professionals worldwide.",
  metadataBase: new URL("https://hypospadias-journals.com"),
  alternates: {
    canonical: "/",
  },
  applicationName: "HIS",
  keywords: [
    "HIS",
    "Hypospadias",
    "medical videos",
    "medical education",
    "surgical education",
    "featured videos",
    "medical research",
  ],
  openGraph: {
    type: "website",
    url: "/",
    siteName: "HIS",
    title: "HIS",
    description:
      "Discover medical excellence: access cutting-edge medical content, research, and educational resources from leading healthcare professionals worldwide.",
    images: [
      {
        url: "/images/logos/logo.svg",
        width: 1200,
        height: 630,
        alt: "HIS",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased min-h-screen flex flex-col`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
