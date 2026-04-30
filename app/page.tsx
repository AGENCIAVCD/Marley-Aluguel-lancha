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
import { useState } from "react";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5511956773322";

const experienceCards = [
  {
    title: "Destinos paradisíacos",
    copy: "Aluguel de lancha para chegar a As Ilhas, Ilha das Couves e enseadas preservadas com tempo para mergulho e contemplação.",
    image: "/pexels/coast-emerald.jpg",
  },
  {
    title: "Conforto a bordo",
    copy: "Ventura 23 pes com embarque privativo e atmosfera criada para relaxar com exclusividade.",
    image: "/pexels/boats-aerial.jpg",
  },
  {
    title: "Momentos únicos",
    copy: "Pôr do sol no mar, avistamento de baleias e roteiros desenhados para criar memórias raras no litoral norte.",
    image: "/pexels/turquoise-boats.jpg",
  },
];

const plans = [
  {
    id: "tres-ilhas",
    label: "Preco promocional",
    title: "Passeio das tres ilhas",
    price: "R$ 1.600,00",
    originalPrice: "R$ 2.300,00",
    duration: "3 horas",
    capacity: "Até 6 passageiros",
    embark: "Saida de Boicucanga",
    tagline: "Ilha dos Gatos, Ilha das Couves e As Ilhas em um roteiro compacto e certeiro.",
    idealFor: "Perfeito para casal, familia pequena ou grupo que quer mar bonito, banho e fotos sem comprometer o dia inteiro.",
    summary:
      "Passeio privativo ideal para quem quer curtir tres paradas classicas com praticidade, visual bonito e tempo para banho.",
    benefits: ["Ilha dos Gatos", "Ilha das Couves", "As Ilhas", "Endereco do pier enviado apos a reserva"],
    secretTitle: "O melhor custo por memoria",
    secretCopy:
      "Esse plano funciona muito bem para quem quer sentir que fez algo especial sem transformar o passeio em uma grande producao.",
    secretBullets: ["Sai bonito nas fotos", "Cabe na agenda do fim de semana", "Entrega experiencia premium com investimento menor"],
    image: "/pexels/boats-aerial.jpg",
  },
  {
    id: "montao-do-trigo",
    label: "Roteiro exclusivo",
    title: "Ilha Montao do Trigo",
    price: "R$ 2.800,00",
    originalPrice: null,
    duration: "3 a 4 horas",
    capacity: "Até 6 passageiros",
    embark: "Saida de Boicucanga",
    tagline: "Um passeio para quem quer ir alem do obvio e conhecer um visual marcante do litoral.",
    idealFor: "Ideal para quem ja conhece os roteiros mais basicos e quer uma navegacao com cara de descoberta.",
    summary:
      "Roteiro privativo ate a Ilha Montao do Trigo, com navegacao cenica, pausa para contemplar e tempo para aproveitar o mar.",
    benefits: ["Ilha Montao do Trigo", "Roteiro menos comum", "Navegacao de 3 a 4 horas", "Endereco do pier enviado apos a reserva"],
    secretTitle: "A escolha de quem quer novidade",
    secretCopy:
      "Montao do Trigo tem apelo de descoberta. E o roteiro certo para vender exclusividade sem depender de um passeio muito longo.",
    secretBullets: ["Menos previsivel", "Mais sensacao de roteiro especial", "Boa duracao para aproveitar sem pressa"],
    image: "/pexels/coast-emerald.jpg",
  },
  {
    id: "ilhabela",
    label: "Plano Premium",
    title: "Ilhabela com chance de avistamento de baleias",
    price: "R$ 4.600,00",
    originalPrice: null,
    duration: "3 a 4 horas",
    capacity: "Até 6 passageiros",
    embark: "Saida de Boicucanga",
    tagline: "Ilhabela em meio periodo, com possibilidade de avistamento de baleias na temporada.",
    idealFor: "Ideal para clientes que querem impressionar convidados, celebrar uma data ou transformar o passeio no evento principal.",
    summary:
      "Experiencia mais exclusiva para quem quer navegar ate Ilhabela e aproveitar um roteiro de 3 a 4 horas com possibilidade de avistar baleias.",
    benefits: ["Navegacao ate Ilhabela", "Possibilidade de avistamento de baleias", "Duracao de 3 a 4 horas", "Endereco do pier enviado apos a reserva"],
    secretTitle: "O plano que vira historia",
    secretCopy:
      "Aqui o valor nao esta so na distancia. Esta na chance de viver um dia raro, com Ilhabela no roteiro e natureza fazendo parte da surpresa.",
    secretBullets: ["Mais tempo a bordo", "Mais impacto para datas especiais", "Mais chance de uma experiencia realmente incomum"],
    image: "/pexels/hero-sao-sebastiao.jpg",
  },
  {
    id: "personalizado",
    label: "Sob medida",
    title: "Passeio personalizado",
    price: "Sob consulta",
    originalPrice: null,
    duration: "Personalizado",
    capacity: "Até 6 passageiros",
    embark: "Saida de Boicucanga",
    tagline: "Quer conhecer outras praias e ilhas? A equipe monta o roteiro com voce.",
    idealFor: "Perfeito para quem tem uma praia em mente, quer ajustar tempo de navegacao ou precisa de uma experiencia sob medida.",
    summary:
      "Converse com nossa equipe para criar um roteiro personalizado por praias, ilhas e paradas que facam sentido para o seu grupo.",
    benefits: ["Roteiro criado com a equipe", "Praias e ilhas sob consulta", "Duracao combinada antes da reserva", "Endereco do pier enviado apos a reserva"],
    secretTitle: "A rota que nasce da conversa",
    secretCopy:
      "Esse plano e para transformar uma ideia em passeio. Em vez de encaixar o cliente em uma rota pronta, a Marley desenha a experiencia com ele.",
    secretBullets: ["Mais flexibilidade", "Mais aderencia ao perfil do grupo", "Boa opcao para pedidos especiais"],
    image: "/pexels/turquoise-boats.jpg",
  },
];

const highlights = [
  "Roteiros privativos com saida de Boicucanga.",
  "O endereco do pier e enviado apos a confirmacao da reserva.",
  "Experiencia pensada para casais, familias e grupos pequenos.",
];

const primaryInteractiveClassName =
  "outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--color-aqua)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent";

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

function buildWhatsappHref(people: string, date: string, itinerary: string) {
  void people;
  void date;
  void itinerary;

  return `https://wa.me/${whatsappNumber}`;
}

const clientFacts = ["São Sebastião", "Saida de Boicucanga", "Até 6 passageiros"];

export default function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [activeItinerary, setActiveItinerary] = useState(plans[0].id);
  const [revealedPlan, setRevealedPlan] = useState<string | null>(null);
  const [people, setPeople] = useState("4");
  const [date, setDate] = useState("");
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -140]);

  const activePlanIndex = plans.findIndex((plan) => plan.id === activeItinerary);
  const selectedPlan = plans[activePlanIndex] ?? plans[0];
  const isPlanRevealed = revealedPlan === selectedPlan.id;
  const whatsappHref = buildWhatsappHref(people, date, activeItinerary);

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
      <section className="relative min-h-[100svh] overflow-hidden bg-[var(--color-navy)] text-white">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/pexels/hero-sao-sebastiao.jpg"
            alt="Vista do mar em São Sebastião a bordo da Marley"
            fill
            priority
            sizes="100vw"
            className="scale-[1.06] object-cover object-[center_48%]"
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
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/92 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-white/30">
                  <Image
                    src="/images/logo-marley.png"
                    alt="Logo Marley Experiências no Mar"
                    width={56}
                    height={56}
                    className="h-full w-full rounded-full object-contain"
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
                href={whatsappHref}
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
                  className="max-w-[12ch] text-balance font-display text-[2.72rem] leading-[0.88] tracking-[-0.035em] text-white sm:text-[3.84rem] lg:text-[4.64rem]"
                >
                  A liberdade de navegar pelo lado exclusivo de São Sebastião.
                </motion.h1>
                <motion.p
                  {...fadeUp(0.16)}
                  className="mt-7 max-w-xl pl-1 text-base leading-8 text-white/78 sm:text-[1.08rem]"
                >
                  Passeios privativos de lancha com conforto e segurança, com saida de Boicucanga e
                  endereco do pier enviado apos a confirmacao da reserva.
                </motion.p>

                <motion.div
                  {...fadeUp(0.22)}
                  className="mt-9 flex flex-col gap-3 pl-1 sm:flex-row"
                >
                  <a
                    href={whatsappHref}
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
                {...fadeUp(0.3)}
                className="min-w-0 rounded-[2rem] border border-white/12 bg-[rgba(8,19,37,0.78)] p-5 shadow-[0_28px_100px_rgba(3,8,18,0.4)] backdrop-blur-xl lg:justify-self-end lg:translate-y-8"
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
                      <option value="2" className="text-[var(--color-navy)]">
                        2 pessoas
                      </option>
                      <option value="4" className="text-[var(--color-navy)]">
                        4 pessoas
                      </option>
                      <option value="6" className="text-[var(--color-navy)]">
                        6 pessoas
                      </option>
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
                    href={whatsappHref}
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

      <section className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
        <motion.div {...fadeUp()} className="max-w-2xl">
          <p className="font-sans text-[0.72rem] uppercase tracking-[0.4em] text-[var(--color-sand)]">
            Experiência no mar
          </p>
          <h2 className="mt-4 text-balance font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
            Cada parada transforma o passeio de lancha em uma memória marcante.
          </h2>
        </motion.div>

        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 pr-5 sm:pr-8 lg:pr-12">
          {experienceCards.map((card, index) => (
            <motion.article
              key={card.title}
              {...fadeUp(index * 0.08)}
              className="group relative min-h-[28rem] min-w-[18.5rem] snap-start overflow-hidden rounded-[2rem] bg-[var(--color-navy)] sm:min-w-[24rem] lg:min-w-[26rem]"
            >
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 640px) 74vw, (max-width: 1024px) 50vw, 26rem"
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,47,0.02)_20%,rgba(10,25,47,0.88)_100%)]" />
              <div className="relative flex h-full flex-col justify-end p-6">
                <p className="font-sans text-[0.68rem] uppercase tracking-[0.35em] text-[var(--color-sand)]">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-balance font-display text-3xl text-white">{card.title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/74">{card.copy}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section
        id="roteiros"
        className="relative overflow-hidden bg-[var(--color-navy)] py-18 text-white lg:py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(114,213,242,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(197,160,89,0.16),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <motion.div {...fadeUp()} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="max-w-lg">
              <p className="font-sans text-[0.72rem] uppercase tracking-[0.4em] text-[var(--color-sand)]">
                Planos de passeio
              </p>
              <h2 className="mt-4 text-balance font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
                Escolha entre roteiros prontos ou crie um passeio personalizado com a equipe Marley.
              </h2>
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

          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_21rem] lg:items-stretch">
            <motion.div
              key={selectedPlan.id}
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative overflow-hidden rounded-[2.2rem] bg-[var(--color-navy)] text-[var(--color-navy)] shadow-[0_34px_110px_rgba(0,0,0,0.28)]"
            >
              <motion.div
                animate={{ rotateY: isPlanRevealed ? 180 : 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative min-h-[50rem] [transform-style:preserve-3d] lg:min-h-[44rem]"
              >
                <div className="absolute inset-0 overflow-hidden bg-[var(--color-navy)] [backface-visibility:hidden]">
                  <Image
                    src={selectedPlan.image}
                    alt={selectedPlan.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 64vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,25,47,0.94)_0%,rgba(10,25,47,0.78)_44%,rgba(10,25,47,0.24)_100%)]" />
                  <div className="relative flex min-h-[50rem] flex-col justify-between p-6 text-white sm:p-8 lg:min-h-[44rem] lg:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-[0.7rem] uppercase tracking-[0.36em] text-[var(--color-sand)]">
                          {selectedPlan.label}
                        </p>
                        <h3 className="mt-4 max-w-[12ch] font-display text-5xl leading-none sm:text-6xl">
                          {selectedPlan.title}
                        </h3>
                      </div>
                      <div className="rounded-full border border-white/18 bg-white/12 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/86 backdrop-blur-md">
                        {activePlanIndex + 1}/{plans.length}
                      </div>
                    </div>

                    <div className="max-w-3xl">
                      <p className="max-w-md text-lg leading-8 text-white/78">{selectedPlan.tagline}</p>
                      <div className="mt-8 grid gap-4 md:grid-cols-[0.86fr_1fr] md:items-end">
                        <div className="rounded-[1.6rem] border border-white/16 bg-white/12 p-5 backdrop-blur-md">
                          <p className="text-sm uppercase tracking-[0.22em] text-white/62">Investimento</p>
                          <p className="mt-2 font-display text-6xl leading-none text-[var(--color-sand)]">
                            {selectedPlan.price}
                          </p>
                          <p className="mt-3 text-sm text-white/64">Passeio privativo para ate 6 passageiros.</p>
                          {selectedPlan.originalPrice ? (
                            <p className="mt-2 text-sm text-white/58 line-through">Valor real {selectedPlan.originalPrice}</p>
                          ) : null}
                        </div>

                        <div className="grid gap-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-[1.2rem] border border-white/12 bg-white/10 p-4">
                              <Clock3 aria-hidden="true" className="h-4 w-4 text-[var(--color-sand)]" />
                              <p className="mt-3 text-sm text-white/64">Duracao</p>
                              <p className="mt-1 font-semibold">{selectedPlan.duration}</p>
                            </div>
                            <div className="rounded-[1.2rem] border border-white/12 bg-white/10 p-4">
                              <Users aria-hidden="true" className="h-4 w-4 text-[var(--color-sand)]" />
                              <p className="mt-3 text-sm text-white/64">Grupo</p>
                              <p className="mt-1 font-semibold">{selectedPlan.capacity}</p>
                            </div>
                          </div>
                          <div className="rounded-[1.2rem] border border-white/12 bg-white/10 p-4">
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
                          href={buildWhatsappHref(people, date, selectedPlan.id)}
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
                          Reservar este plano
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

                <div className="absolute inset-0 overflow-hidden bg-[var(--color-sand)] text-[var(--color-navy)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <div className="absolute inset-0 opacity-[0.18]">
                    <Image
                      src={selectedPlan.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 64vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative flex min-h-[50rem] flex-col justify-between p-6 sm:p-8 lg:min-h-[44rem] lg:p-10">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-[0.7rem] uppercase tracking-[0.34em] text-[var(--color-navy)]/60">
                          Carta virada
                        </p>
                        <h3 className="mt-4 max-w-[12ch] font-display text-5xl leading-none sm:text-6xl">
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
                          href={buildWhatsappHref(people, date, selectedPlan.id)}
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
                          Quero esse plano
                          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.aside {...fadeUp(0.08)} className="flex flex-col justify-between gap-4">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-3">
                {plans.map((plan) => {
                  const active = plan.id === selectedPlan.id;

                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => selectPlan(plan.id)}
                      className={`block w-full rounded-[1.2rem] p-4 text-left transition ${
                        active ? "bg-white text-[var(--color-navy)]" : "text-white/72 hover:bg-white/8 hover:text-white"
                      } ${primaryInteractiveClassName}`}
                    >
                      <span className="block text-xs uppercase tracking-[0.24em] text-[var(--color-sand)]">
                        {plan.label}
                      </span>
                      <span className="mt-2 block font-display text-3xl leading-none">{plan.price}</span>
                      <span className={`mt-2 block text-sm ${active ? "text-[var(--color-navy)]/68" : "text-white/56"}`}>
                        {plan.duration} · {plan.capacity}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5 text-white">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--color-sand)]">Comparativo rapido</p>
                <div className="mt-5 space-y-4 text-sm text-white/72">
                  <p>Tres ilhas: promocional de entrada para vender uma experiencia privativa e objetiva.</p>
                  <p>Montao do Trigo: roteiro menos comum para quem quer sensacao de descoberta.</p>
                  <p>Ilhabela: melhor escolha para quem busca um passeio com mais impacto.</p>
                  <p>Personalizado: conversa direta para montar outras praias e ilhas.</p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    type="button"
                    onClick={() => movePlan(-1)}
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/16 text-white hover:bg-white/10 ${primaryInteractiveClassName}`}
                    aria-label="Plano anterior"
                  >
                    <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => movePlan(1)}
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/16 text-white hover:bg-white/10 ${primaryInteractiveClassName}`}
                    aria-label="Proximo plano"
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
        <div className="grid gap-6 overflow-hidden rounded-[2.2rem] border border-[rgba(10,25,47,0.08)] bg-white p-6 shadow-[0_30px_80px_rgba(10,25,47,0.08)] lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
          <motion.div {...fadeUp()} className="relative min-h-[22rem] overflow-hidden rounded-[1.8rem]">
            <motion.div
              whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src="/pexels/turquoise-boats.jpg"
                alt="Ventura 23 pés da Marley no mar"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,25,47,0.1)_5%,rgba(10,25,47,0.72)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <p className="font-sans text-[0.68rem] uppercase tracking-[0.35em] text-[var(--color-sand)]">
                Modelo da lancha
              </p>
              <h3 className="mt-3 font-display text-4xl leading-none">Ventura 23 pés</h3>
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.08)} className="flex flex-col justify-center">
            <p className="font-sans text-[0.72rem] uppercase tracking-[0.4em] text-[var(--color-sand)]">
              Embarcação
            </p>
            <h2 className="mt-4 text-balance font-display text-4xl leading-none tracking-[-0.03em] sm:text-5xl">
              Uma Ventura 23 pés para passeios elegantes e confortáveis no litoral.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[color:rgba(10,25,47,0.72)]">
              A lancha une porte ideal para grupos pequenos, navegacao agradavel e saida de Boicucanga.
              O endereco do pier de embarque e enviado apos a confirmacao do passeio.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.4rem] bg-[var(--color-seafoam)] px-4 py-4">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-sand)]">Capacidade</p>
                <p className="mt-2 text-lg text-[var(--color-navy)]">Até 6 passageiros</p>
              </div>
              <div className="rounded-[1.4rem] bg-[var(--color-seafoam)] px-4 py-4">
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--color-sand)]">Embarque</p>
                <p className="mt-2 text-lg text-[var(--color-navy)]">Saida de Boicucanga</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-18 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <motion.div {...fadeUp()} className="max-w-2xl">
            <p className="font-sans text-[0.72rem] uppercase tracking-[0.4em] text-[var(--color-sand)]">
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
            className="relative overflow-hidden rounded-[2.2rem] border border-[rgba(10,25,47,0.08)] bg-white p-8 shadow-[0_30px_80px_rgba(10,25,47,0.08)]"
          >
            <div className="absolute inset-x-12 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-sand),transparent)]" />
            <div className="absolute -top-12 right-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(197,160,89,0.34),transparent_68%)] blur-2xl" />

            <div className="mx-auto flex max-w-sm flex-col items-center text-center">
              <div className="relative">
                <div className="absolute inset-0 scale-125 rounded-full bg-[radial-gradient(circle,rgba(114,213,242,0.26),transparent_60%)] blur-xl" />
                <Image
                  src="/images/logo-marley.png"
                  alt="Logo Marley"
                  width={220}
                  height={164}
                  className="relative h-auto w-full max-w-[13.5rem] object-contain"
                />
              </div>
              <p className="mt-6 font-display text-4xl">Marley</p>
              <p className="mt-3 text-sm uppercase tracking-[0.32em] text-[var(--color-sand)]">
                Experiências no mar
              </p>
              <div className="mt-8 grid w-full gap-3 text-left">
                <div className="flex items-center gap-3 rounded-2xl bg-[var(--color-seafoam)] px-4 py-3">
                  <MapPinned aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--color-sand)]" />
                  <span>Saida de Boicucanga</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl bg-[var(--color-seafoam)] px-4 py-3">
                  <ShipWheel aria-hidden="true" className="h-4 w-4 shrink-0 text-[var(--color-sand)]" />
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
              href={whatsappHref}
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
        href={whatsappHref}
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
        className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-50 flex items-center gap-3 rounded-[1.75rem] bg-[var(--color-sand)] px-4 py-3 text-sm font-semibold text-[var(--color-navy)] shadow-[0_24px_60px_rgba(10,25,47,0.24)] hover:bg-[var(--color-aqua)] lg:bottom-8 lg:left-8 lg:right-auto lg:w-auto lg:min-w-[18rem] lg:justify-between lg:rounded-full lg:px-5 lg:py-4 ${primaryInteractiveClassName}`}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[var(--color-navy)]">
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-navy)] px-1 text-[10px] text-white">
              1
            </span>
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-navy)]/72 lg:text-xs lg:tracking-[0.22em]">
              Reserva via WhatsApp
            </span>
            <span className="block text-pretty leading-5">Reservar passeio de lancha em São Sebastião</span>
          </span>
        </span>
        <ArrowUpRight aria-hidden="true" className="hidden h-4 w-4 shrink-0 lg:block" />
      </a>
    </main>
  );
}
