import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GTM_ID = "GTM-N2968K95";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lanchamarley.com.br"),
  title: {
    default: "Aluguel de Lancha em São Sebastião | Marley Experiências no Mar",
    template: "%s | Marley Experiências no Mar",
  },
  description:
    "Aluguel de lancha em São Sebastião com saída de Boiçucanga, roteiros privativos para até 6 passageiros, passeio das três ilhas, Montão do Trigo e Ilhabela.",
  keywords: [
    "aluguel de lancha em São Sebastião",
    "passeio de lancha em São Sebastião",
    "lancha privativa São Sebastião",
    "passeio privativo de lancha",
    "Marley Experiências no Mar",
    "aluguel de lancha Boiçucanga",
    "passeio de lancha Boiçucanga",
    "lancha em Boiçucanga",
    "Ventura 23 pés",
    "passeio de lancha Ilhabela",
    "Ilha Montão do Trigo",
    "Ilha dos Gatos",
    "roteiro Ilha das Couves",
    "passeio As Ilhas São Sebastião",
  ],
  category: "travel",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Aluguel de Lancha em São Sebastião | Marley Experiências no Mar",
    description:
      "Passeios privativos de lancha com saída de Boiçucanga para três ilhas, Montão do Trigo e Ilhabela.",
    url: "/",
    locale: "pt_BR",
    type: "website",
    siteName: "Marley Experiências no Mar",
    images: [
      {
        url: "/images/ventura-23-pes-lancha-marley-boicucanga.png",
        width: 1630,
        height: 965,
        alt: "Lancha Ventura 23 pés da Marley em água cristalina no litoral norte de São Sebastião",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aluguel de Lancha em São Sebastião | Marley Experiências no Mar",
    description:
      "Passeios privativos de lancha com saída de Boiçucanga para até 6 passageiros.",
    images: ["/images/ventura-23-pes-lancha-marley-boicucanga.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
      <Script id="google-tag-manager" strategy="beforeInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>
    </html>
  );
}
