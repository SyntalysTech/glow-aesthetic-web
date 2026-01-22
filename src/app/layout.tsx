import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://glow-aesthetic.vercel.app"),
  title: "Glow Aesthetics | Your Glow is Our Flow",
  description: "Ihr Beauty-Ziel in Horgen, Schweiz. Professionelle Wimpernverlängerungen, Gesichtsbehandlungen, Microneedling und Icoone Laser, die Ihre natürliche Schönheit unterstreichen.",
  keywords: ["Beauty-Salon", "Horgen", "Wimpernverlängerung", "Gesichtsbehandlungen", "Icoone Laser", "Microneedling", "Spa", "Schweiz"],
  authors: [{ name: "Glow Aesthetics" }],
  icons: {
    icon: "/images/logo-square.png",
    apple: "/images/logo-square.png",
  },
  openGraph: {
    title: "Glow Aesthetics | Your Glow is Our Flow",
    description: "Ihr Beauty-Ziel in Horgen, Schweiz. Professionelle Behandlungen, die Ihre natürliche Schönheit unterstreichen.",
    type: "website",
    locale: "de_CH",
    siteName: "Glow Aesthetics",
    images: [
      {
        url: "/images/logo-square.png",
        width: 500,
        height: 500,
        alt: "Glow Aesthetics Logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Glow Aesthetics | Your Glow is Our Flow",
    description: "Ihr Beauty-Ziel in Horgen, Schweiz. Professionelle Behandlungen, die Ihre natürliche Schönheit unterstreichen.",
    images: ["/images/logo-square.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#baaeb1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-warm-white text-charcoal`}>
        <AuthProvider>
          {children}
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
