import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Glow Aesthetics | Votre Éclat est Notre Passion",
  description: "Votre destination beauté à Horgen, Suisse. Soins professionnels d'extensions de cils, soins du visage, microneedling et Icoone Laser qui subliment votre beauté naturelle.",
  keywords: ["salon de beauté", "Horgen", "extensions de cils", "soins du visage", "Icoone Laser", "microneedling", "spa", "Suisse"],
  authors: [{ name: "Glow Aesthetics" }],
  openGraph: {
    title: "Glow Aesthetics | Votre Éclat est Notre Passion",
    description: "Votre destination beauté à Horgen, Suisse. Soins professionnels qui subliment votre beauté naturelle.",
    type: "website",
    locale: "fr_CH",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#D6B7B4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-warm-white text-charcoal`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
