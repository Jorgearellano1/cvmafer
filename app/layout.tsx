// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

const NAME = "María Fernanda Ugaz";
const SITE = "Portfolio — CV Futuro";
const DESCRIPTION =
  "Ingeniería Industrial — Datos, Finanzas y Logística. Excel Avanzado, Power BI y automatización básica en Python. Disponible para prácticas/junior en Lima, Perú.";
const EMAIL = "mafer.mfu@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/mariafernandaugazching";

export const metadata: Metadata = {
  title: {
    default: `${NAME} — ${SITE}`,
    template: `%s — ${NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE,
  keywords: [
    "Mafer Ugaz",
    "María Fernanda Ugaz",
    "Ingeniería Industrial",
    "Excel",
    "Power BI",
    "Python",
    "Logística",
    "Finanzas",
    "Lima",
  ],
  creator: NAME,
  authors: [{ name: NAME, url: LINKEDIN }],
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "profile",
    title: `${NAME} — ${SITE}`,
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${NAME} — ${SITE}` }],
    locale: "es_PE",
  },
  twitter: {
    card: "summary_large_image",
    title: `${NAME} — ${SITE}`,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
  themeColor: "#fffaf5", // coincide con la paleta cálida
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: NAME,
    email: EMAIL,
    url: "/",
    jobTitle: "Ingeniería Industrial",
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
    sameAs: [LINKEDIN],
  };

  return (
    <html lang="es" className="h-full">
      {/* Paleta CÁLIDA en claro (forzada desde globals.css) */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh bg-background text-foreground`}
      >
        {/* Fondos sutiles cálidos */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
          {/* halos superiores/inferiores */}
          <div className="absolute inset-x-0 -top-40 h-[28rem] bg-halo-top" />
          <div className="absolute inset-x-0 -bottom-40 h-[32rem] bg-halo-bottom" />
          {/* trama de puntos con desvanecimiento hacia bordes */}
          <div
            className="absolute inset-0 bg-grid-dot"
            style={{
              WebkitMaskImage:
                "radial-gradient(80rem 40rem at 50% 10%, black 60%, transparent 100%)",
              maskImage:
                "radial-gradient(80rem 40rem at 50% 10%, black 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Accesibilidad */}
        <a href="#contenido" className="skip-link">
          Saltar al contenido
        </a>

        {/* Contenedor principal */}
        <div id="contenido" className="mx-auto max-w-6xl px-4 sm:px-6">
          {children}
        </div>

        {/* SEO: Person JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
