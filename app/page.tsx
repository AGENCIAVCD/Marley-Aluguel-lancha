"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  Anchor,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  MapPinned,
  MessageCircle,
  ShipWheel,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511960175954";

const experienceCards = [
  {
    title: "Destinos paradisíacos",
    copy: "Aluguel de lancha para chegar a As Ilhas, Ilha das Couves e enseadas preservadas com tempo para mergulho e contemplação.",
    image: "/pexels/coast-emerald.jpg",
    imageAlt: "Costa verde de São Sebastião vista do mar em passeio privativo de lancha",
  },
  {
    title: "Conforto a bordo",
    copy: "Ventura 23 pés com embarque privativo e atmosfera criada para relaxar com exclusividade.",
    image: "/pexels/boats-aerial.jpg",
    imageAlt: "Lanchas navegando no litoral norte durante passeio privativo em São Sebastião",
  },
  {
    title: "Momentos únicos",
    copy: "Pôr do sol no mar, avistamento de baleias e roteiros desenhados para criar memórias raras no litoral norte.",
    image: "/pexels/turquoise-boats.jpg",
    imageAlt: "Barcos em água cristalina no litoral norte para passeio de lancha",
  },
  {
    title: "Roteiros privativos",
    copy: "Passeios com saída de Boiçucanga, paradas escolhidas com cuidado e ritmo pensado para o seu grupo.",
    image: "/pexels/hero-sao-sebastiao.jpg",
    imageAlt: "Ilha e mar azul em São Sebastião durante roteiro privativo de lancha",
  },
  {
    title: "Ventura 23 pés",
    copy: "Lancha para até 6 passageiros, ideal para navegar com conforto em passeios curtos ou personalizados.",
    image: "/images/ventura-23-pes-lancha-marley-boicucanga.png",
    imageAlt: "Lancha Ventura 23 pés da Marley em água cristalina no litoral norte",
  },
];

const plans = [
  {
    id: "tres-ilhas",
    label: "Preço promocional",
    selectorTitle: "Três Ilhas",
    title: "Passeio das três ilhas",
    price: "R$ 1.600,00",
    originalPrice: "R$ 2.300,00",
    duration: "3 horas",
    capacity: "Até 6 passageiros",
    embark: "Saída de Boiçucanga",
    tagline: "Ilha dos Gatos, Ilha das Couves e As Ilhas em um roteiro compacto e certeiro.",
    idealFor: "Perfeito para casal, família pequena ou grupo que quer mar bonito, banho e fotos sem comprometer o dia inteiro.",
    summary:
      "Passeio das três ilhas: Ilha dos Gatos, Ilha das Couves e As Ilhas, com duração de 3 horas e preço promocional de R$ 1.600,00.",
    benefits: ["Ilha dos Gatos", "Ilha das Couves", "As Ilhas", "Endereço do píer enviado após a reserva"],
    secretTitle: "O melhor custo por memória",
    secretCopy:
      "Esse roteiro funciona muito bem para quem quer sentir que fez algo especial sem transformar o passeio em uma grande produção.",
    secretBullets: ["Sai bonito nas fotos", "Cabe na agenda do fim de semana", "Entrega experiência premium com investimento menor"],
    image: "/pexels/boats-aerial.jpg",
    imageAlt: "Vista aérea de lanchas em roteiro das três ilhas saindo de Boiçucanga",
  },
  {
    id: "montao-do-trigo",
    label: "Roteiro exclusivo",
    selectorTitle: "Montão de Trigo",
    title: "Ilha Montão do Trigo",
    price: "R$ 2.800,00",
    originalPrice: null,
    duration: "3 a 4 horas",
    capacity: "Até 6 passageiros",
    embark: "Saída de Boiçucanga",
    tagline: "Um passeio para quem quer ir além do óbvio e conhecer um visual marcante do litoral.",
    idealFor: "Ideal para quem já conhece os roteiros mais básicos e quer uma navegação com cara de descoberta.",
    summary:
      "Ilha Montão do Trigo com duração de 3 a 4 horas, por R$ 2.800,00, para quem quer conhecer um roteiro menos comum no litoral.",
    benefits: ["Ilha Montão do Trigo", "Roteiro menos comum", "Navegação de 3 a 4 horas", "Endereço do píer enviado após a reserva"],
    secretTitle: "A escolha de quem quer novidade",
    secretCopy:
      "Montão do Trigo tem apelo de descoberta. É o roteiro certo para vender exclusividade sem depender de um passeio muito longo.",
    secretBullets: ["Menos previsível", "Mais sensação de roteiro especial", "Boa duração para aproveitar sem pressa"],
    image: "/pexels/coast-emerald.jpg",
    imageAlt: "Costa preservada no litoral norte em passeio de lancha para Ilha Montão do Trigo",
  },
  {
    id: "ilhabela",
    label: "Roteiro premium",
    selectorTitle: "Ilhabela com possibilidade de avistamento de baleias",
    title: "Ilhabela com possibilidade de avistamento de baleias",
    price: "R$ 4.600,00",
    originalPrice: null,
    duration: "3 a 4 horas",
    capacity: "Até 6 passageiros",
    embark: "Saída de Boiçucanga",
    tagline: "Ilhabela em meio período, com possibilidade de avistamento de baleias na temporada.",
    idealFor: "Ideal para clientes que querem impressionar convidados, celebrar uma data ou transformar o passeio no evento principal.",
    summary:
      "Ilhabela com possibilidade de avistamento de baleias, duração de 3 a 4 horas e investimento de R$ 4.600,00.",
    benefits: ["Navegação até Ilhabela", "Possibilidade de avistamento de baleias", "Duração de 3 a 4 horas", "Endereço do píer enviado após a reserva"],
    secretTitle: "O roteiro que vira história",
    secretCopy:
      "Aqui o valor não está só na distância. Está na chance de viver um dia raro, com Ilhabela no roteiro e natureza fazendo parte da surpresa.",
    secretBullets: ["Mais tempo a bordo", "Mais impacto para datas especiais", "Mais chance de uma experiência realmente incomum"],
    image: "/pexels/hero-sao-sebastiao.jpg",
    imageAlt: "Mar de São Sebastião no roteiro de lancha para Ilhabela com possibilidade de baleias",
  },
  {
    id: "personalizado",
    label: "Personalizado",
    selectorTitle: "Personalizado",
    title: "Passeios personalizados",
    price: "Sob consulta",
    originalPrice: null,
    duration: "Personalizado",
    capacity: "Até 6 passageiros",
    embark: "Saída de Boiçucanga",
    tagline: "Quer conhecer outras praias e ilhas? Converse com a equipe e crie um roteiro personalizado.",
    idealFor: "Perfeito para quem tem uma praia em mente, quer ajustar tempo de navegação ou precisa de uma experiência sob medida.",
    summary:
      "Passeios personalizados para conhecer outras praias e ilhas, com roteiro criado em conversa direta com a equipe Marley.",
    benefits: ["Roteiro criado com a equipe", "Praias e ilhas sob consulta", "Duração combinada antes da reserva", "Endereço do píer enviado após a reserva"],
    secretTitle: "A rota que nasce da conversa",
    secretCopy:
      "Esse roteiro é para transformar uma ideia em passeio. Em vez de encaixar o cliente em uma rota pronta, a Marley desenha a experiência com ele.",
    secretBullets: ["Mais flexibilidade", "Mais aderência ao perfil do grupo", "Boa opção para pedidos especiais"],
    image: "/pexels/turquoise-boats.jpg",
    imageAlt: "Água cristalina e barcos no litoral norte para passeio personalizado de lancha",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Marley Experiências no Mar",
  url: "https://lanchamarley.com.br",
  image: "https://lanchamarley.com.br/images/ventura-23-pes-lancha-marley-boicucanga.png",
  description:
    "Passeios privativos de lancha em São Sebastião com saída de Boiçucanga, roteiros para três ilhas, Ilha Montão do Trigo, Ilhabela e experiências personalizadas.",
  areaServed: ["São Sebastião", "Boiçucanga", "Ilhabela", "Litoral Norte de São Paulo"],
  telephone: "+55 11 96017-5954",
  priceRange: "R$ 1.600 - R$ 4.600",
  sameAs: ["https://marleyaluguellancha.vercel.app"],
  makesOffer: plans.map((plan) => ({
    "@type": "Offer",
    name: plan.title,
    description: plan.summary,
    price: plan.price === "Sob consulta" ? undefined : plan.price.replace("R$ ", "").replace(".", "").replace(",", "."),
    priceCurrency: plan.price === "Sob consulta" ? undefined : "BRL",
    availability: "https://schema.org/InStock",
    areaServed: "São Sebastião",
  })),
};

const highlights = [
  "Roteiros privativos com saída de Boiçucanga.",
  "O endereço do píer é enviado após a confirmação da reserva.",
  "Experiência pensada para casais, famílias e grupos pequenos.",
];

const primaryInteractiveClassName =
  "outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--color-aqua)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";
const experienceRotationIntervalMs = 4200;

function trackEvent(eventName: string, payload: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({
    event: eventName,
    page: "home",
    ...payload,
  });
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 36, filter: "blur(10px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.8, ease: "easeOut" as const, delay },
  };
}

function formatPreferredDate(date: string) {
  if (!date) {
    return "a definir";
  }

  const [year, month, day] = date.split("-");

  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
}

function buildGenericWhatsappHref() {
  const message = "Olá, Marley! Tenho interesse em reservar um passeio de lancha. Podem me passar mais informações?";

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function buildHeroWhatsappHref(people: string, date: string, itinerary: string) {
  const plan = plans.find((item) => item.id === itinerary) ?? plans[0];
  const guestsLabel = `${people} ${people === "1" ? "pessoa" : "pessoas"}`;
  const message = [
    "Olá, Marley! Quero reservar um passeio de lancha.",
    "",
    `Roteiro de interesse: ${plan.title}`,
    `Data desejada: ${formatPreferredDate(date)}`,
    `Quantidade de pessoas: ${guestsLabel}`,
    `Duração: ${plan.duration}`,
    `Investimento: ${plan.price}`,
    `Saída: ${plan.embark}`,
    "",
    "Podem me confirmar a disponibilidade e os próximos passos?",
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

const clientFacts = ["São Sebastião", "Saída de Boiçucanga", "Até 6 passageiros"];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [activeItinerary, setActiveItinerary] = useState(plans[0].id);
  const [revealedPlan, setRevealedPlan] = useState<string | null>(null);
  const [activeExperience, setActiveExperience] = useState(0);
  const [isExperienceSectionVisible, setIsExperienceSectionVisible] = useState(false);
  const [isExperienceInteracting, setIsExperienceInteracting] = useState(false);
  const [people, setPeople] = useState("1");
  const [date, setDate] = useState("");
  const experienceSectionRef = useRef<HTMLElement | null>(null);
  const experienceTrackRef = useRef<HTMLDivElement | null>(null);
  const experienceRefs = useRef<Array<HTMLElement | null>>([]);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -140]);

  const activePlanIndex = plans.findIndex((plan) => plan.id === activeItinerary);
  const selectedPlan = plans[activePlanIndex] ?? plans[0];
  const isPlanRevealed = revealedPlan === selectedPlan.id;
  const heroWhatsappHref = buildHeroWhatsappHref(people, date, activeItinerary);
  const genericWhatsappHref = buildGenericWhatsappHref();

  function selectPlan(planId: string) {
    const plan = plans.find((item) => item.id === planId) ?? plans[0];

    setActiveItinerary(plan.id);
    setRevealedPlan(null);
    trackEvent("select_plan", {
      selected_plan: plan.id,
      plan_label: plan.label,
      plan_price: plan.price,
    });
  }

  function movePlan(direction: 1 | -1) {
    const nextIndex = (activePlanIndex + direction + plans.length) % plans.length;
    selectPlan(plans[nextIndex].id);
  }

  function selectExperience(index: number) {
    const nextIndex = (index + experienceCards.length) % experienceCards.length;
    const track = experienceTrackRef.current;
    const card = experienceRefs.current[nextIndex];

    setActiveExperience(nextIndex);

    if (!track || !card) {
      return;
    }

    track.scrollTo({
      left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  }

  function moveExperience(direction: 1 | -1) {
    selectExperience(activeExperience + direction);
  }

  function releaseExperienceInteraction() {
    window.setTimeout(() => setIsExperienceInteracting(false), 260);
  }

  useEffect(() => {
    const section = experienceSectionRef.current;

    if (!section) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsExperienceSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || !isExperienceSectionVisible || isExperienceInteracting) {
      return;
    }

    const timer = window.setInterval(() => {
      const nextIndex = (activeExperience + 1 + experienceCards.length) % experienceCards.length;
      const track = experienceTrackRef.current;
      const card = experienceRefs.current[nextIndex];

      setActiveExperience(nextIndex);

      if (track && card) {
        track.scrollTo({
          left: card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2,
          behavior: "smooth",
        });
      }
    }, experienceRotationIntervalMs);

    return () => window.clearInterval(timer);
  }, [activeExperience, isExperienceInteracting, isExperienceSectionVisible, shouldReduceMotion]);

  function togglePlanSecret() {
    const nextValue = isPlanRevealed ? null : selectedPlan.id;

    setRevealedPlan(nextValue);
    trackEvent("reveal_plan_secret", {
      plan: selectedPlan.id,
      plan_label: selectedPlan.label,
      state: nextValue ? "open" : "closed",
    });
  }

  return (
    <main className="overflow-x-hidden bg-[var(--color-seafoam)] text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <section className="relative min-h-[100svh] overflow-hidden bg-[var(--color-navy)] text-white">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video
            aria-hidden="true"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/pexels/hero-sao-sebastiao.jpg"
            className="h-full w-full scale-[1.06] object-cover object-[center_48%]"
            src="/videos/hero-marley-lancha-optimized.mp4"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,16,31,0.88)_0%,rgba(6,16,31,0.72)_24%,rgba(6,16,31,0.4)_48%,rgba(6,16,31,0.18)_68%,rgba(6,16,31,0.12)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,47,0.16)_0%,rgba(10,25,47,0.28)_22%,rgba(10,25,47,0.5)_58%,rgba(10,25,47,0.94)_100%)]" />
        <div className="absolute left-0 top-0 h-full w-[58%] bg-[radial-gradient(circle_at_18%_38%,rgba(10,25,47,0.16),transparent_34%)]" />

        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col px-5 pb-24 pt-6 sm:px-8 lg:px-12 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="flex w-full items-center justify-between gap-4 rounded-full border border-white/16 bg-[rgba(255,255,255,0.09)] px-3 py-2.5 backdrop-blur-xl sm:px-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className="relative flex h-12 w-[5.8rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[var(--color-navy)] shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-white/18 sm:w-[6.6rem]">
                  <Image
                    src="/images/logo-marley-oficial.jpeg"
                    alt="Logo da Marley Experiências no Mar, aluguel de lancha em São Sebastião"
                    width={128}
                    height={85}
                    className="h-full w-full object-cover"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-sans text-[0.6rem] uppercase tracking-[0.34em] text-[var(--color-sand)]">
                    Marley
                  </p>
                  <p className="truncate text-sm text-white/90 sm:text-[0.95rem]">Experiências no Mar</p>
                </div>
              </div>

              <div className="hidden items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-white/58 md:flex">
                {clientFacts.map((fact, index) => (
                  <span key={fact} className="inline-flex items-center gap-2">
                    {index > 0 ? <span className="h-1 w-1 rounded-full bg-[var(--color-sand)]/70" /> : null}
                    <span>{fact}</span>
                  </span>
                ))}
              </div>

              <a
                href={genericWhatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("whatsapp_click", {
                    cta_location: "header",
                    plan: activeItinerary,
                    guests: people,
                    preferred_date: date || "a_definir",
                  })
                }
                className={`shrink-0 rounded-full border border-white/14 bg-white/12 px-4 py-2 text-xs font-medium text-white hover:border-[var(--color-sand)] hover:bg-white/18 sm:mr-3 sm:px-5 sm:text-sm lg:mr-5 ${primaryInteractiveClassName}`}
              >
                Reservar
              </a>
            </div>
          </motion.div>

          <div className="flex flex-1 items-center py-10 lg:py-14">
            <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,0.92fr)_25.5rem] lg:items-center lg:gap-16">
              <div className="max-w-[39rem] min-w-0">
                <motion.p
                  {...fadeUp()}
                  className="mb-5 inline-flex rounded-full border border-white/14 bg-[rgba(10,25,47,0.5)] px-4 py-2 text-balance font-sans text-[0.72rem] uppercase tracking-[0.32em] text-[var(--color-sand)]/96 shadow-[0_12px_40px_rgba(0,0,0,0.22)] backdrop-blur-md"
                >
                  Aluguel de lancha em São Sebastião
                </motion.p>
                <motion.h1
                  {...fadeUp(0.08)}
                  className="max-w-[13ch] text-balance font-display text-[2.52rem] leading-[1] tracking-[-0.025em] text-white sm:text-[3.72rem] sm:leading-[0.96] lg:text-[4.46rem] lg:leading-[0.94]"
                >
                  Aluguel de lancha para navegar pelo lado exclusivo de São Sebastião.
                </motion.h1>
                <motion.p
                  {...fadeUp(0.16)}
                  className="mt-7 max-w-xl pl-1 text-base leading-8 text-white/78 sm:text-[1.08rem]"
                >
                  Passeios privativos de lancha com conforto e segurança, com saída de Boiçucanga e
                  endereço do píer enviado após a confirmação da reserva.
                </motion.p>

                <motion.div
                  {...fadeUp(0.22)}
                  className="mt-9 flex flex-col gap-3 pl-1 sm:flex-row"
                >
                  <a
                    href={heroWhatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", {
                        cta_location: "hero_primary",
                        plan: activeItinerary,
                        guests: people,
                        preferred_date: date || "a_definir",
                      })
                    }
                    className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-sand)] px-6 py-4 text-center text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-aqua)] ${primaryInteractiveClassName}`}
                  >
                    Reservar meu passeio de lancha
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                  <a
                    href="#roteiros"
                    onClick={() =>
                      trackEvent("view_plans", {
                        cta_location: "hero_secondary",
                      })
                    }
                    className={`inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-4 text-center text-sm font-medium text-white hover:bg-white/10 ${primaryInteractiveClassName}`}
                  >
                    Ver roteiros
                  </a>
                </motion.div>
              </div>

              <motion.aside
                id="reserva-rapida"
                {...fadeUp(0.3)}
                className="min-w-0 scroll-mt-24 rounded-[2rem] border border-white/12 bg-[rgba(8,19,37,0.78)] p-5 shadow-[0_28px_100px_rgba(3,8,18,0.4)] backdrop-blur-xl lg:justify-self-end lg:translate-y-8"
              >
                <p className="font-sans text-[0.68rem] uppercase tracking-[0.35em] text-[var(--color-sand)]">
                  Reserva imediata
                </p>
                <h2 className="mt-4 text-balance font-display text-3xl leading-none text-white">
                  Reserve sua data
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
                  Receba disponibilidade para seu passeio de lancha direto no WhatsApp.
                </p>

                <div className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm text-white/72">
                      <ShipWheel aria-hidden="true" className="h-4 w-4 text-[var(--color-sand)]" />
                      Qual passeio?
                    </span>
                    <select
                      name="itinerary"
                      autoComplete="off"
                      value={activeItinerary}
                      onChange={(event) => selectPlan(event.target.value)}
                      className={`w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white focus:border-[var(--color-aqua)] ${primaryInteractiveClassName}`}
                    >
                      {plans.map((plan) => (
                        <option key={plan.id} value={plan.id} className="text-[var(--color-navy)]">
                          {plan.title}
                        </option>
                      ))}
                    </select>
                    <a
                      href="#roteiros"
                      onClick={() =>
                        trackEvent("view_plans", {
                          cta_location: "booking_form_helper",
                        })
                      }
                      className={`mt-2 inline-flex text-xs font-semibold text-[var(--color-sand)] underline-offset-4 hover:text-[var(--color-aqua)] hover:underline ${primaryInteractiveClassName}`}
                    >
                      Não sabe qual escolher? Ver tipos de passeio
                    </a>
                  </label>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm text-white/72">
                      <Users aria-hidden="true" className="h-4 w-4 text-[var(--color-sand)]" />
                      Quantas pessoas?
                    </span>
                    <select
                      name="guests"
                      autoComplete="off"
                      value={people}
                      onChange={(event) => setPeople(event.target.value)}
                      className={`w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white focus:border-[var(--color-aqua)] ${primaryInteractiveClassName}`}
                    >
                      {Array.from({ length: 6 }, (_, index) => index + 1).map((amount) => (
                        <option key={amount} value={String(amount)} className="text-[var(--color-navy)]">
                          {amount} {amount === 1 ? "pessoa" : "pessoas"}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 flex items-center gap-2 text-sm text-white/72">
                      <CalendarDays aria-hidden="true" className="h-4 w-4 text-[var(--color-sand)]" />
                      Qual data?
                    </span>
                    <input
                      type="date"
                      name="preferred-date"
                      autoComplete="off"
                      lang="pt-BR"
                      value={date}
                      onChange={(event) => setDate(event.target.value)}
                      className={`w-full rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-white focus:border-[var(--color-aqua)] ${primaryInteractiveClassName}`}
                    />
                  </label>

                  <a
                    href={heroWhatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() =>
                      trackEvent("whatsapp_click", {
                        cta_location: "booking_form",
                        plan: activeItinerary,
                        guests: people,
                        preferred_date: date || "a_definir",
                      })
                    }
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-4 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-aqua)] ${primaryInteractiveClassName}`}
                  >
                    Reservar passeio pelo WhatsApp
                    <MessageCircle aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </section>

      <section ref={experienceSectionRef} className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
        <motion.div {...fadeUp()} className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[var(--color-navy)]/72">
              Experiência no mar
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
              Cada parada transforma o passeio de lancha em uma memória marcante.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[rgba(10,25,47,0.1)] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-navy)]/68 shadow-[0_14px_34px_rgba(10,25,47,0.07)]">
              Deslize para ver mais
            </span>
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                onClick={() => moveExperience(-1)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,25,47,0.12)] bg-white text-[var(--color-navy)] shadow-[0_14px_34px_rgba(10,25,47,0.08)] hover:bg-[var(--color-navy)] hover:text-white ${primaryInteractiveClassName}`}
                aria-label="Experiência anterior"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => moveExperience(1)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(10,25,47,0.12)] bg-white text-[var(--color-navy)] shadow-[0_14px_34px_rgba(10,25,47,0.08)] hover:bg-[var(--color-navy)] hover:text-white ${primaryInteractiveClassName}`}
                aria-label="Próxima experiência"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="relative mt-10 overflow-hidden rounded-[2.6rem]">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-[linear-gradient(90deg,var(--background),transparent)] sm:w-16" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-[linear-gradient(270deg,var(--background),transparent)] sm:w-16" />
          <button
            type="button"
            onClick={() => moveExperience(-1)}
            className={`absolute left-2 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/92 text-[var(--color-navy)] shadow-[0_20px_50px_rgba(10,25,47,0.18)] backdrop-blur-md hover:bg-[var(--color-sand)] sm:hidden ${primaryInteractiveClassName}`}
            aria-label="Experiência anterior"
          >
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => moveExperience(1)}
            className={`absolute right-2 top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/92 text-[var(--color-navy)] shadow-[0_20px_50px_rgba(10,25,47,0.18)] backdrop-blur-md hover:bg-[var(--color-sand)] sm:hidden ${primaryInteractiveClassName}`}
            aria-label="Próxima experiência"
          >
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>

          <div
            ref={experienceTrackRef}
            onPointerDown={() => setIsExperienceInteracting(true)}
            onPointerUp={releaseExperienceInteraction}
            onPointerCancel={releaseExperienceInteraction}
            onMouseLeave={releaseExperienceInteraction}
            onScroll={(event) => {
              const container = event.currentTarget;
              const center = container.scrollLeft + container.clientWidth / 2;
              const nextIndex = Array.from(container.children).reduce(
                (closestIndex, child, index) => {
                  const element = child as HTMLElement;
                  const childCenter = element.offsetLeft + element.offsetWidth / 2;
                  const closestElement = container.children[closestIndex] as HTMLElement;
                  const closestCenter = closestElement.offsetLeft + closestElement.offsetWidth / 2;

                  return Math.abs(childCenter - center) < Math.abs(closestCenter - center) ? index : closestIndex;
                },
                0,
              );

              setActiveExperience((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
            }}
            className="flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain px-1 py-3 [scrollbar-width:none] [touch-action:pan-x] sm:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {experienceCards.map((card, index) => (
              <motion.article
                ref={(node) => {
                  experienceRefs.current[index] = node;
                }}
                key={card.title}
                {...fadeUp(index * 0.08)}
                className="group relative min-h-[25rem] min-w-[min(64vw,19rem)] snap-start overflow-hidden rounded-[2rem] bg-[var(--color-navy)] shadow-[0_26px_70px_rgba(10,25,47,0.18)] ring-1 ring-white/70 sm:min-h-[28rem] sm:min-w-[24rem] sm:rounded-[2.4rem] lg:min-w-[26rem]"
              >
                <motion.div
                  whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 64vw, (max-width: 1024px) 50vw, 26rem"
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,47,0.02)_18%,rgba(10,25,47,0.9)_100%)]" />
                <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                  <p className="font-sans text-[0.68rem] uppercase tracking-[0.35em] text-[var(--color-sand)]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-3 text-balance font-display text-[1.7rem] leading-none text-white sm:text-3xl">{card.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-white/74">{card.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-navy)]/54">
            {activeExperience + 1}/{experienceCards.length}
          </span>
          <div className="flex items-center gap-2">
            {experienceCards.map((card, index) => (
              <button
                key={card.title}
                type="button"
                onClick={() => selectExperience(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeExperience === index ? "w-9 bg-[var(--color-navy)]" : "w-2.5 bg-[rgba(10,25,47,0.18)] hover:bg-[rgba(10,25,47,0.38)]"
                } ${primaryInteractiveClassName}`}
                aria-label={`Ver ${card.title}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        id="roteiros"
        className="relative overflow-hidden bg-[var(--color-navy)] py-18 text-white lg:py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(114,213,242,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(197,160,89,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
          <motion.div {...fadeUp()} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-lg">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.4em] text-[var(--color-sand)]">
                Roteiros de passeio
              </p>
              <h2 className="mt-4 text-balance font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
                Escolha entre roteiros prontos ou crie um passeio personalizado com a equipe Marley.
              </h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-white/68 sm:text-base sm:leading-7">
                Três ilhas, Montão do Trigo, Ilhabela com possibilidade de avistamento de baleias ou um roteiro sob medida para outras praias e ilhas.
              </p>
              <a
                href="#reserva-rapida"
                onClick={() =>
                  trackEvent("back_to_booking", {
                    cta_location: "plans_section",
                    selected_plan: activeItinerary,
                  })
                }
                className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-sand)] px-5 py-3 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-aqua)] ${primaryInteractiveClassName}`}
              >
                Montar minha reserva
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <div className="space-y-4 text-white/74">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  {...fadeUp(index * 0.08)}
                  className="flex items-start gap-3 border-b border-white/10 pb-4"
                >
                  <Waves aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-[var(--color-sand)]" />
                  <p>{highlight}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_16.5rem] lg:items-start">
            <motion.div
              key={selectedPlan.id}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-[1.8rem] bg-[var(--color-navy)] text-[var(--color-navy)] shadow-[0_34px_110px_rgba(0,0,0,0.28)] sm:rounded-[2.2rem]"
            >
              <motion.div
                animate={{ rotateY: isPlanRevealed ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative [transform-style:preserve-3d]"
              >
                <div className="relative overflow-hidden rounded-[1.8rem] bg-[var(--color-navy)] [backface-visibility:hidden] sm:rounded-[2.2rem]">
                  <Image
                    src={selectedPlan.image}
                    alt={selectedPlan.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 64vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,25,47,0.94)_0%,rgba(10,25,47,0.78)_44%,rgba(10,25,47,0.24)_100%)]" />
                  <div className="relative flex min-h-[50rem] flex-col justify-between p-5 text-white sm:min-h-[46rem] sm:p-8 lg:min-h-[42rem] lg:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-[0.7rem] uppercase tracking-[0.36em] text-[var(--color-sand)]">
                          {selectedPlan.label}
                        </p>
                        <h3 className="mt-3 max-w-[16ch] font-display text-4xl leading-none sm:mt-4 sm:text-6xl">
                          {selectedPlan.title}
                        </h3>
                      </div>
                      <div className="rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.18em] text-white/86 backdrop-blur-md sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.22em]">
                        {activePlanIndex + 1}/{plans.length}
                      </div>
                    </div>

                    <div className="max-w-3xl">
                      <p className="max-w-md text-base leading-7 text-white/78 sm:text-lg sm:leading-8">{selectedPlan.tagline}</p>
                      <div className="mt-6 grid gap-3 sm:mt-8 md:grid-cols-[0.86fr_1fr] md:items-end">
                        <div className="rounded-[1.35rem] border border-white/16 bg-white/12 p-4 backdrop-blur-md sm:rounded-[1.6rem] sm:p-5">
                          <p className="text-xs uppercase tracking-[0.2em] text-white/62 sm:text-sm sm:tracking-[0.22em]">Investimento</p>
                          <p className="mt-2 font-display text-5xl leading-none text-[var(--color-sand)] sm:text-6xl">
                            {selectedPlan.price}
                          </p>
                          <p className="mt-3 text-sm text-white/64">Passeio privativo para até 6 passageiros.</p>
                          {selectedPlan.originalPrice ? (
                            <p className="mt-2 text-sm text-white/58 line-through">Valor real {selectedPlan.originalPrice}</p>
                          ) : null}
                        </div>

                        <div className="grid gap-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-[1.2rem] border border-white/12 bg-white/10 p-3 sm:p-4">
                              <Clock3 aria-hidden="true" className="h-4 w-4 text-[var(--color-sand)]" />
                              <p className="mt-3 text-sm text-white/64">Duração</p>
                              <p className="mt-1 font-semibold">{selectedPlan.duration}</p>
                            </div>
                            <div className="rounded-[1.2rem] border border-white/12 bg-white/10 p-3 sm:p-4">
                              <Users aria-hidden="true" className="h-4 w-4 text-[var(--color-sand)]" />
                              <p className="mt-3 text-sm text-white/64">Grupo</p>
                              <p className="mt-1 font-semibold">{selectedPlan.capacity}</p>
                            </div>
                          </div>
                          <div className="rounded-[1.2rem] border border-white/12 bg-white/10 p-3 sm:p-4">
                            <MapPinned aria-hidden="true" className="h-4 w-4 text-[var(--color-sand)]" />
                            <p className="mt-3 text-sm text-white/64">Embarque</p>
                            <p className="mt-1 font-semibold">{selectedPlan.embark}</p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {selectedPlan.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-start gap-3 border-t border-white/12 pt-3 text-sm text-white/84">
                            <Sparkles aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-sand)]" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={genericWhatsappHref}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() =>
                            trackEvent("whatsapp_click", {
                              cta_location: "pricing_chart",
                              plan: selectedPlan.id,
                              plan_label: selectedPlan.label,
                              plan_price: selectedPlan.price,
                              guests: people,
                              preferred_date: date || "a_definir",
                            })
                          }
                          className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-sand)] px-6 py-4 text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-aqua)] ${primaryInteractiveClassName}`}
                        >
                          Reservar este roteiro
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                        <button
                          type="button"
                          onClick={togglePlanSecret}
                          className={`inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-4 text-sm font-semibold text-white hover:bg-white/10 ${primaryInteractiveClassName}`}
                        >
                          Ver detalhe secreto
                          <Eye aria-hidden="true" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 overflow-hidden rounded-[1.8rem] bg-[var(--color-sand)] text-[var(--color-navy)] [backface-visibility:hidden] [transform:rotateY(180deg)] sm:rounded-[2.2rem]">
                  <div className="absolute inset-0 opacity-[0.18]">
                    <Image
                      src={selectedPlan.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 64vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative flex min-h-[50rem] flex-col justify-between p-5 sm:min-h-[46rem] sm:p-8 lg:min-h-[42rem] lg:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-[0.7rem] uppercase tracking-[0.34em] text-[var(--color-navy)]/60">
                          Carta virada
                        </p>
                        <h3 className="mt-4 max-w-[16ch] font-display text-5xl leading-none sm:text-6xl">
                          {selectedPlan.secretTitle}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={togglePlanSecret}
                        className={`rounded-full border border-[var(--color-navy)]/18 bg-[var(--color-navy)]/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${primaryInteractiveClassName}`}
                      >
                        Voltar
                      </button>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-end">
                      <div>
                        <p className="text-xl leading-9 text-[var(--color-navy)]/78">{selectedPlan.secretCopy}</p>
                        <p className="mt-8 rounded-[1.4rem] bg-white/40 p-5 text-base leading-7 text-[var(--color-navy)]/82">
                          {selectedPlan.idealFor}
                        </p>
                      </div>
                      <div className="space-y-3">
                        {selectedPlan.secretBullets.map((item) => (
                          <div key={item} className="flex items-start gap-3 border-t border-[var(--color-navy)]/18 pt-4">
                            <Anchor aria-hidden="true" className="mt-1 h-4 w-4 shrink-0" />
                            <span className="text-lg leading-7">{item}</span>
                          </div>
                        ))}
                        <a
                          href={genericWhatsappHref}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() =>
                            trackEvent("whatsapp_click", {
                              cta_location: "pricing_secret",
                              plan: selectedPlan.id,
                              plan_label: selectedPlan.label,
                              plan_price: selectedPlan.price,
                              guests: people,
                              preferred_date: date || "a_definir",
                            })
                          }
                          className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-navy)] px-6 py-4 text-sm font-semibold text-white hover:bg-[var(--color-navy)]/88 ${primaryInteractiveClassName}`}
                        >
                          Quero esse roteiro
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.aside {...fadeUp(0.08)} className="order-first flex flex-col gap-3 lg:order-none">
              <div className="rounded-[1.4rem] border border-white/12 bg-white/5 p-2.5">
                <div className="mb-2 flex items-center justify-between gap-2 px-1">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-white/62">Roteiros</p>
                  <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.68rem] font-semibold text-white/74">
                    {activePlanIndex + 1}/{plans.length}
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => movePlan(-1)}
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[var(--color-sand)] hover:text-[var(--color-navy)] ${primaryInteractiveClassName}`}
                      aria-label="Roteiro anterior"
                    >
                      <ChevronLeft aria-hidden="true" className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => movePlan(1)}
                      className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[var(--color-sand)] hover:text-[var(--color-navy)] ${primaryInteractiveClassName}`}
                      aria-label="Próximo roteiro"
                    >
                      <ChevronRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 lg:block lg:space-y-1">
                  {plans.map((plan) => {
                    const active = plan.id === selectedPlan.id;

                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => selectPlan(plan.id)}
                        className={`block min-h-[6.4rem] rounded-[1rem] p-2.5 text-left transition lg:min-h-[5.15rem] lg:w-full ${
                          active ? "bg-white text-[var(--color-navy)] shadow-[0_0_0_2px_var(--color-aqua)]" : "bg-white/5 text-white/72 hover:bg-white/8 hover:text-white"
                        } ${primaryInteractiveClassName}`}
                      >
                        <span className={`block line-clamp-2 text-[0.62rem] font-semibold uppercase leading-snug tracking-[0.14em] ${active ? "text-[var(--color-navy)]/70" : "text-[var(--color-sand)]"}`}>
                          {plan.selectorTitle}
                        </span>
                        <span className="mt-1.5 block font-display text-xl leading-none">{plan.price}</span>
                        <span className={`mt-1 block text-[0.72rem] ${active ? "text-[var(--color-navy)]/68" : "text-white/56"}`}>
                          {plan.duration}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {plans.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => selectPlan(plan.id)}
                      className={`h-2 rounded-full transition-all ${
                        plan.id === selectedPlan.id ? "w-8 bg-[var(--color-sand)]" : "w-2 bg-white/24 hover:bg-white/50"
                      } ${primaryInteractiveClassName}`}
                      aria-label={`Selecionar ${plan.title}`}
                    />
                  ))}
                </div>
              </div>

              <div className="hidden">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-sand)]">Comparativo rápido</p>
                <div className="mt-5 space-y-4 text-sm text-white/72">
                  <p>Três ilhas: promocional de entrada para vender uma experiência privativa e objetiva.</p>
                  <p>Montão do Trigo: roteiro menos comum para quem quer sensação de descoberta.</p>
                  <p>Ilhabela: melhor escolha para quem busca um passeio com mais impacto.</p>
                  <p>Personalizado: conversa direta para montar outras praias e ilhas.</p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => movePlan(-1)}
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/16 text-white hover:bg-white/10 ${primaryInteractiveClassName}`}
                    aria-label="Roteiro anterior"
                  >
                    <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => movePlan(1)}
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/16 text-white hover:bg-white/10 ${primaryInteractiveClassName}`}
                    aria-label="Próximo roteiro"
                  >
                    <ChevronRight aria-hidden="true" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-6 overflow-hidden rounded-[2.2rem] border border-[rgba(10,25,47,0.12)] bg-white p-6 shadow-[0_34px_90px_rgba(10,25,47,0.12)] lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <motion.div
            {...fadeUp()}
            className="relative min-h-[22rem] overflow-hidden rounded-[2rem] border border-white shadow-[0_28px_80px_rgba(10,25,47,0.22)] ring-1 ring-[rgba(10,25,47,0.08)]"
          >
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src="/images/ventura-23-pes-lancha-marley-boicucanga.png"
                alt="Lancha Ventura 23 pés da Marley em água cristalina para passeio privativo em São Sebastião"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,47,0.02)_8%,rgba(10,25,47,0.24)_52%,rgba(10,25,47,0.7)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.35em] text-[var(--color-sand)]">
                Modelo da lancha
              </p>
              <h3 className="mt-3 font-display text-4xl leading-none">Ventura 23 pés</h3>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.08)} className="flex flex-col justify-center">
            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[var(--color-navy)]/72">
              Embarcação
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
              Uma Ventura 23 pés para passeios elegantes e confortáveis no litoral.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[color:rgba(10,25,47,0.84)]">
              A lancha une porte ideal para grupos pequenos, navegação agradável e saída de Boiçucanga.
              O endereço do píer de embarque é enviado após a confirmação do passeio.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-[rgba(10,25,47,0.1)] bg-[#dfecef] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_34px_rgba(10,25,47,0.08)]">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-navy)]/78">Capacidade</p>
                <p className="mt-2 text-lg text-[var(--color-navy)]">Até 6 passageiros</p>
              </div>
              <div className="rounded-[1.4rem] border border-[rgba(10,25,47,0.1)] bg-[#dfecef] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_14px_34px_rgba(10,25,47,0.08)]">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-navy)]/78">Embarque</p>
                <p className="mt-2 text-lg text-[var(--color-navy)]">Saída de Boiçucanga</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[linear-gradient(180deg,#edf4f7_0%,#f8fafc_100%)] px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <motion.div {...fadeUp()} className="max-w-2xl">
            <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.4em] text-[var(--color-navy)]/72">
              Prova social e autoridade
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
              Nossa missão é transformar um dia comum em uma memória inesquecível.
            </h2>
            <p className="mt-6 text-base leading-7 text-[color:rgba(10,25,47,0.72)]">
              A Marley nasce para oferecer aluguel de lancha em São Sebastião com atendimento humano,
              reserva simples pelo WhatsApp e roteiros que respeitam o ritmo de quem está a bordo.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.08)}
            className="relative overflow-hidden rounded-[2.2rem] border border-[rgba(10,25,47,0.16)] bg-white p-8 shadow-[0_34px_90px_rgba(10,25,47,0.18)]"
          >
            <div className="absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-sand),transparent)]" />
            <div className="absolute -top-12 right-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.34),transparent_68%)] blur-2xl" />

            <div className="mx-auto flex max-w-sm flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 scale-110 rounded-[1.8rem] bg-[rgba(10,25,47,0.08)] blur-2xl" />
                <Image
                  src="/images/logo-marley-oficial.jpeg"
                  alt="Logo da Marley Experiências no Mar"
                  width={220}
                  height={147}
                  className="relative h-auto w-full max-w-[15rem] rounded-[1.25rem] object-cover shadow-[0_18px_45px_rgba(10,25,47,0.18)] ring-1 ring-[rgba(10,25,47,0.08)]"
                />
              </div>
              <p className="mt-6 font-display text-4xl">Marley</p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.32em] text-[var(--color-navy)]/66">
                Experiências no mar
              </p>
              <div className="mt-8 grid w-full gap-3 text-left">
                <div className="flex items-center gap-3 rounded-2xl border border-[rgba(10,25,47,0.08)] bg-[#eef4f7] px-4 py-3 shadow-[0_12px_28px_rgba(10,25,47,0.06)]">
                  <MapPinned aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--color-navy)]/68" />
                  <span>Saída de Boiçucanga</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-[rgba(10,25,47,0.08)] bg-[#eef4f7] px-4 py-3 shadow-[0_12px_28px_rgba(10,25,47,0.06)]">
                  <ShipWheel aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--color-navy)]/68" />
                  <span>Passeios privativos com até 6 passageiros</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-5 pb-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.4rem] bg-[var(--color-navy)] px-6 py-10 text-white sm:px-10 lg:px-12 lg:py-14">
          <motion.div
            {...fadeUp()}
            className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="max-w-2xl">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.4em] text-[var(--color-sand)]">
                Reserve sua experiência
              </p>
              <h2 className="mt-4 text-balance font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
                Escolha a data. A Marley cuida do seu passeio no mar.
              </h2>
            </div>
            <a
              href={genericWhatsappHref}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent("whatsapp_click", {
                  cta_location: "final_cta",
                  plan: activeItinerary,
                  guests: people,
                  preferred_date: date || "a_definir",
                })
              }
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-sand)] px-6 py-4 text-center text-sm font-semibold text-[var(--color-navy)] hover:bg-[var(--color-aqua)] ${primaryInteractiveClassName}`}
            >
              Reservar passeio de lancha
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <a
        href={genericWhatsappHref}
        target="_blank"
        rel="noreferrer"
        onClick={() =>
          trackEvent("whatsapp_click", {
            cta_location: "sticky_whatsapp",
            plan: activeItinerary,
            guests: people,
            preferred_date: date || "a_definir",
          })
        }
        className={`fixed bottom-[max(0.85rem,env(safe-area-inset-bottom))] left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[20.5rem] -translate-x-1/2 items-center gap-2.5 rounded-full bg-[var(--color-sand)] px-3 py-2 text-xs font-semibold text-[var(--color-navy)] shadow-[0_20px_50px_rgba(10,25,47,0.22)] hover:bg-[var(--color-aqua)] lg:bottom-8 lg:left-8 lg:w-auto lg:min-w-[18rem] lg:max-w-none lg:translate-x-0 lg:justify-between lg:px-5 lg:py-4 lg:text-sm ${primaryInteractiveClassName}`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-navy)] lg:h-11 lg:w-11">
            <MessageCircle aria-hidden="true" className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-navy)] px-1 text-[10px] text-white">
              1
            </span>
          </span>
          <span className="min-w-0">
            <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-navy)]/72 sm:block lg:text-xs lg:tracking-[0.22em]">
              Reserva via WhatsApp
            </span>
            <span className="block truncate leading-5">Reservar passeio pelo WhatsApp</span>
          </span>
        </span>
        <ArrowUpRight aria-hidden="true" className="hidden h-4 w-4 shrink-0 lg:block" />
      </a>
    </main>
  );
}
