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
  title: "Aluguel de Lancha em São Sebastião | Marley Experiências no Mar",
  description:
    "Aluguel de lancha em São Sebastião com passeios privativos, roteiros exclusivos, conforto premium e reserva rápida via WhatsApp.",
  keywords: [
    "aluguel de lancha em São Sebastião",
    "passeio de lancha em São Sebastião",
    "lancha privativa São Sebastião",
    "passeio privativo de lancha",
    "Marley Experiências no Mar",
    "aluguel de lancha Boiçucanga",
    "aluguel de lancha Barra do Una",
    "roteiro Ilha das Couves",
    "passeio As Ilhas São Sebastião",
  ],
  category: "travel",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Aluguel de Lancha em São Sebastião | Marley Experiências no Mar",
    description:
      "Passeios privativos de lancha em São Sebastião, saindo de Boiçucanga e Barra do Una, com reserva via WhatsApp.",
    locale: "pt_BR",
    type: "website",
    siteName: "Marley Experiências no Mar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aluguel de Lancha em São Sebastião | Marley Experiências no Mar",
    description:
      "Passeios privativos de lancha em São Sebastião com reserva rápida via WhatsApp.",
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
