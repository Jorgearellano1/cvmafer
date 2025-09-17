// app/page.tsx
"use client";

import Image from "next/image";
import { motion, type Variants, useScroll, useSpring } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Linkedin,
  MapPin,
  FileText,
  Trophy,
  Sparkles,
} from "lucide-react";

// ====== Datos del CV (edita a gusto) ======
type TimelineItem = { title: string; place: string; period: string; bullets: string[] };

const CV = {
  name: "María Fernanda Ugaz",
  headline: "Ingeniería Industrial — Datos, Finanzas y Logística",
  tagline:
    "Perfil analítico, sobrio y creativo. Excel avanzado, Power BI y automatización básica en Python. Enfocada en KPI, procesos y mejora continua.",
  location: "Lima, Perú",
  email: "mafer.mfu@gmail.com",
  linkedin: "https://www.linkedin.com/in/mariafernandaugazching",
  pdf: "/cv.pdf", // coloca tu archivo en /public/cv.pdf
  photo: "/mafercv.png", // coloca tu foto en /public/mafercv.png
  skills: [
    "Excel (Avanzado)",
    "Power BI",
    "Power Query",
    "Python (Básico)",
    "Minitab",
    "R Studio",
    "Visio",
    "G Suite / Microsoft 365",
  ],
  experience: [
    {
      title: "Practicante de Compensaciones",
      place: "AJE Global",
      period: "Ago 2025 – Actualidad",
      bullets: [
        "Soporte a procesos de nómina y administración de personal.",
        "Control y reportería de KPIs internos (vacaciones, headcount).",
        "Optimización de tareas administrativas del área.",
      ],
    },
  ] as TimelineItem[],
  education: [
    {
      title: "Ingeniería Industrial (Tercio Superior)",
      place: "Universidad de Lima",
      period: "2022 – Actualidad",
      bullets: ["Excel, Power BI, procesos y data-driven management."],
    },
  ] as TimelineItem[],
  highlights: [
    "Organización de eventos y voluntariado (liderazgo y gestión).",
    "Atención al cliente (comunicación, resiliencia).",
    "Deportista en telas aéreas y profesora (disciplina y constancia).",
  ],
};

// ====== Animaciones (suaves y accesibles) ======
const fadeUp: Variants = {
  hidden: { y: 14, opacity: 0 },
  show: (custom?: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.06 * (custom ?? 0) },
  }),
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

export default function Home() {
  return (
    <main className="min-h-dvh">
      <Nav />
      <Hero />
      <InfoStripe />
      <Sections />
      <Footer />
    </main>
  );
}

// ====== Barra de progreso de scroll (sutil, cálida) ======
function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%", background: "var(--color-brand-2)" }}
      className="h-0.5 w-full"
    />
  );
}

// ====== Nav con progreso y botones ======
function Nav() {
  return (
    <div className="sticky top-0 z-40 border-b border-border/80 bg-[color:var(--background)]/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <span className="font-semibold tracking-tight text-sm sm:text-base">
          <span
            className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
            style={{ background: "var(--color-brand-1)" }}
          />
          {CV.name}
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Abrir en nueva pestaña para móviles (mejor compatibilidad) */}
          <a
            href={CV.pdf}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir CV en PDF (se abre en una nueva pestaña)"
            className="group inline-flex items-center gap-2 rounded-xl border border-border px-3 py-1.5 text-xs sm:text-sm bg-[color:var(--muted)] hover:shadow-[0_8px_24px_rgba(231,111,81,0.10)] transition touch-manipulation"
          >
            <FileText className="h-4 w-4" />
            CV PDF
            <ArrowRight className="h-4 w-4 transition -translate-x-0 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
      <ProgressBar />
    </div>
  );
}

// ====== Foto de perfil (animada + efectos sutiles) ======
function ProfilePhoto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -4, rotate: -0.4, scale: 1.02 }}
      whileTap={{ scale: 0.99 }}
      className="relative mx-auto md:mx-0 rounded-3xl border border-border bg-[color:var(--muted)] overflow-hidden shadow-[0_1px_0_rgba(0,0,0,0.03)]"
      style={{
        backgroundImage:
          "conic-gradient(from 180deg at 50% 50%, rgba(233,196,106,0.18), rgba(244,162,97,0.12), rgba(233,196,106,0.18))",
      }}
    >
      <div className="p-1 rounded-[calc(theme(borderRadius.2xl)+4px)] bg-[color:var(--muted)]">
        <Image
          src={CV.photo}
          alt={`${CV.name} — foto de perfil`}
          width={512}
          height={512}
          priority
          className="block h-auto w-32 sm:w-44 md:w-56 rounded-2xl object-cover"
          sizes="(min-width: 1024px) 14rem, (min-width: 640px) 11rem, 8rem"
        />
      </div>

      <span
        aria-hidden
        className="absolute right-2 bottom-2 h-3 w-3 rounded-full ring-2 ring-white"
        style={{ background: "var(--color-brand-2)" }}
      />
    </motion.div>
  );
}

// ====== Hero cálido (sin desvanecido), ahora con foto ======
function Hero() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 pt-10 sm:pt-12 md:pt-14 pb-8 sm:pb-10">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 sm:gap-6 md:gap-8 items-start justify-items-center md:justify-items-start">
        {/* Foto */}
        <ProfilePhoto />

        {/* Texto */}
        <div className="w-full">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--muted)] px-3 py-1 text-xs text-muted-foreground self-center md:self-auto">
              <Sparkles className="h-3.5 w-3.5" />
              Disponible para prácticas / junior
            </div>
          </motion.div>

          <motion.h1
            className="mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-center md:text-left text-balance"
            initial="hidden"
            animate="show"
            variants={fadeUp}
          >
            {CV.name}
          </motion.h1>

          <motion.p
            className="mt-3 text-base sm:text-lg text-foreground/80 text-center md:text-left text-pretty"
            initial="hidden"
            animate="show"
            custom={1}
            variants={fadeUp}
          >
            {CV.headline}
          </motion.p>

          <motion.p
            className="mt-2 max-w-2xl text-muted-foreground text-center md:text-left text-pretty mx-auto md:mx-0"
            initial="hidden"
            animate="show"
            custom={2}
            variants={fadeUp}
          >
            {CV.tagline}
          </motion.p>

          <motion.div
            className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 justify-center md:justify-start"
            initial="hidden"
            animate="show"
            custom={3}
            variants={fadeUp}
          >
            <a href={`mailto:${CV.email}`} className="btn-white w-full sm:w-auto justify-center">
              <Mail className="h-4 w-4" />
              Escribir a {CV.email}
            </a>
            <a
              target="_blank"
              href={CV.linkedin}
              className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-2xl border border-border px-4 py-2 bg-[color:var(--muted)] hover:shadow-[0_8px_24px_rgba(244,162,97,0.12)] transition"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ====== Franja de datos rápidos (chips cálidos) ======
function InfoStripe() {
  const items = [
    { icon: <MapPin className="h-4 w-4" />, label: CV.location },
    { icon: <Mail className="h-4 w-4" />, label: CV.email },
    { icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn" },
  ];
  return (
    <div className="mx-auto max-w-6xl px-4">
      <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
          {items.map((it, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-border bg-[color:var(--muted)] px-3.5 sm:px-4 py-3 flex items-center gap-2 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            >
              <span className="text-muted-foreground">{it.icon}</span>
              <span className="text-sm truncate">
                {i === 2 ? (
                  <a
                    href={CV.linkedin}
                    target="_blank"
                    className="underline decoration-[color:var(--color-brand-1)]/40 underline-offset-4 hover:decoration-[color:var(--color-brand-1)]"
                  >
                    {it.label}
                  </a>
                ) : (
                  it.label
                )}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ====== Secciones principales ======
function Sections() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:py-12 space-y-12 sm:space-y-16">
      <Block title="Experiencia" k="exp">
        <Timeline items={CV.experience} accent="brand-1" />
      </Block>

      <Block title="Educación" k="edu">
        <Timeline items={CV.education} accent="brand-2" />
      </Block>

      <Block title="Habilidades" k="skills">
        <SkillCloud />
      </Block>

      <Block title="Logros & Actividades" k="highlights">
        <ul className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
          {CV.highlights.map((h, i) => (
            <motion.li
              key={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className="rounded-2xl border border-border bg-[color:var(--muted)] p-3.5 sm:p-4 text-sm leading-relaxed"
            >
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--muted)] mr-2 text-muted-foreground border border-border">
                <Trophy className="h-3.5 w-3.5" />
              </span>
              {h}
            </motion.li>
          ))}
        </ul>
      </Block>

      <CTA />
    </section>
  );
}

function Block({
  title,
  children,
  k,
}: {
  title: string;
  children: React.ReactNode;
  k: string;
}) {
  return (
    <section id={k} className="space-y-5 sm:space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-lg sm:text-2xl font-semibold tracking-tight text-balance"
      >
        {title}
      </motion.h2>
      {children}
    </section>
  );
}

function Timeline({
  items,
  accent = "brand-1",
}: {
  items: TimelineItem[];
  accent?: "brand-1" | "brand-2" | "brand-3";
}) {
  return (
    <div className="relative">
      {/* línea central con degradado cálido (oculta en móvil para limpiar) */}
      <div
        className="hidden sm:block absolute left-4 top-0 bottom-0 w-px opacity-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-brand-2), transparent)",
        }}
      />
      <ul className="space-y-4 sm:space-y-6">
        {items.map((it, i) => (
          <motion.li
            key={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
            variants={fadeUp}
            whileHover={{ y: -2 }}
            className="relative pl-0 sm:pl-10"
          >
            <span
              className="hidden sm:block absolute left-2 top-2 h-3 w-3 rounded-full shadow-[0_0_0_3px_rgba(0,0,0,0.02)]"
              style={{ background: `var(--color-${accent})` }}
            />
            <div className="rounded-2xl border border-border bg-[color:var(--muted)] p-3.5 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-medium text-[15px] sm:text-base">{it.title}</h3>
                <span className="text-xs text-muted-foreground">{it.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">{it.place}</p>
              <ul className="mt-3 space-y-2 text-sm text-foreground/80">
                {it.bullets.map((b, j) => (
                  <li key={j} className="leading-relaxed text-pretty">
                    • {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function SkillCloud() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="flex flex-wrap gap-2"
    >
      {CV.skills.map((s, i) => (
        <motion.span
          key={s}
          custom={i}
          variants={fadeUp}
          whileHover={{ y: -2 }}
          className="group inline-flex items-center gap-2 rounded-2xl border border-border bg-[color:var(--muted)] px-3 py-1.5 text-xs sm:text-sm"
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full transition"
            style={{ background: "var(--color-brand-1)" }}
          />
          {s}
        </motion.span>
      ))}
    </motion.div>
  );
}

function CTA() {
  return (
    <div className="rounded-3xl border border-border p-5 sm:p-6 md:p-8 text-center bg-[linear-gradient(180deg,rgba(233,196,106,0.10),rgba(244,162,97,0.10))]">
      <h3 className="text-base sm:text-lg md:text-xl font-semibold">¿Conversamos?</h3>
      <p className="mt-1 text-muted-foreground text-pretty">
        Lista para sumar en Finanzas, Logística o Marketing, con foco en datos y procesos.
      </p>
      <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3">
        <a href={`mailto:${CV.email}`} className="btn-white w-full sm:w-auto justify-center">
          <Mail className="h-4 w-4" />
          Contactar
        </a>
        <a
          href={CV.linkedin}
          target="_blank"
          className="inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-2xl border border-border px-4 py-2 bg-[color:var(--muted)] hover:shadow-[0_8px_24px_rgba(231,111,81,0.12)] transition"
        >
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 text-center text-xs sm:text-sm text-muted-foreground">
        © {new Date().getFullYear()} {CV.name}.
      </div>
    </footer>
  );
}
