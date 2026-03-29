import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "JibhaExpress - Réexpédition Europe → Maroc | جيبها إكسبريس",
  description: "Service de réexpédition de colis depuis l'Europe (Portugal) vers le Maroc. Adresse virtuelle gratuite au Portugal. Livraison express DHL, FedEx, UPS, Tawssil.",
  keywords: "réexpédition maroc, colis europe maroc, adresse portugal, forwarding maroc, livraison maroc, e-commerce maroc, jibha express",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JibhaExpress",
  },
  openGraph: {
    title: "JibhaExpress - Votre adresse en Europe, livré au Maroc",
    description: "Achetez en Europe, recevez au Maroc. Service de réexpédition depuis le Portugal.",
    type: "website",
    locale: "fr_FR",
    siteName: "JibhaExpress",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#1a56db" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
