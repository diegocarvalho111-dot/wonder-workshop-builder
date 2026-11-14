import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, BellOff, BadgePercent, ArrowRight, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oferta Brasil VIP — Promoções do seu nicho no WhatsApp" },
      { name: "description", content: "Escolha sua categoria e receba grátis bugs de preço e cupons da Amazon, Shopee e Mercado Livre no WhatsApp." },
      { property: "og:title", content: "Oferta Brasil VIP — Promoções do seu nicho no WhatsApp" },
      { property: "og:description", content: "Economize até 80%: escolha sua categoria e entre grátis no grupo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const groups = [
  { emoji: "🏠", name: "Casa & Cozinha", desc: "Panelas, air fryer, organização", url: "https://chat.whatsapp.com/KHLP72TzqHZKMiXd2PwBQo" },
  { emoji: "👶", name: "Bebê & Infantil", desc: "Fraldas, brinquedos, roupinhas", url: "https://chat.whatsapp.com/D5tyJR5GIUt0BOqpOHQjLY" },
  { emoji: "🛒", name: "Mercado & Limpeza", desc: "Compras do mês mais baratas", url: "https://chat.whatsapp.com/KOV0QAcad0i7J1hSPXztlK" },
  { emoji: "💄", name: "Beleza & Cuidado", desc: "Perfumes, skincare, maquiagem", url: "https://chat.whatsapp.com/HtGxtnYtpqTDo4joZdV1pu" },
  { emoji: "🔧", name: "Ferramentas & Auto", desc: "Furadeiras, kits, acessórios", url: "https://chat.whatsapp.com/DH72eR0PUIB7AejC1u6OKK" },
  { emoji: "🏋️", name: "Fitness & Esporte", desc: "Suplementos, tênis, equipamentos", url: "https://chat.whatsapp.com/Dte5SpuwyZBCyFEzR0fUyZ" },
];

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

function track(group: string) {
  window.fbq?.("track", "Lead", { content_name: group });
}

function Index() {
  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <div className="mx-auto max-w-xl px-5 pb-16 pt-8">
        <p className="mx-auto w-fit rounded-full border border-gold/40 px-3 py-1 text-xs font-semibold text-gold">
          🔥 Grupos 100% gratuitos
        </p>
        <h1 className="mt-5 text-center font-display text-4xl font-extrabold leading-tight">
          Economize até <span className="text-gold">80%</span> com ofertas do seu nicho
        </h1>
        <p className="mt-4 text-center text-muted-foreground">
          Bugs de preço e cupons da Amazon, Shopee e Mercado Livre direto no seu WhatsApp. Escolha sua categoria:
        </p>

        <section aria-label="Categorias" className="mt-8 grid gap-3">
          {groups.map((g) => (
            <a
              key={g.name}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(g.name)}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition active:scale-[0.98] hover:border-primary"
            >
              <span className="text-3xl" aria-hidden>{g.emoji}</span>
              <span className="flex-1">
                <span className="block font-display text-lg font-bold">{g.name}</span>
                <span className="block text-sm text-muted-foreground">{g.desc}</span>
              </span>
              <span className="flex items-center gap-1 rounded-xl bg-primary px-3 py-2 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
                Entrar <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}
        </section>

        <section className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { icon: BellOff, t: "Sem spam", d: "Só admins enviam ofertas" },
            { icon: ShieldCheck, t: "Lojas oficiais", d: "Links verificados" },
            { icon: BadgePercent, t: "Cupons secretos", d: "Antes de esgotar" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl bg-muted p-4 text-center">
              <Icon className="mx-auto h-6 w-6 text-gold" />
              <p className="mt-2 font-bold">{t}</p>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-center font-display text-2xl font-bold">Quem entrou, aprovou</h2>
          {[
            { n: "Juliana, SP", q: "Comprei fraldas pela metade do preço no primeiro dia." },
            { n: "Marcos, MG", q: "Peguei uma parafusadeira com 60% de desconto. Grupo top!" },
          ].map((r) => (
            <figure key={r.n} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex gap-0.5 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-2">"{r.q}"</blockquote>
              <figcaption className="mt-1 text-sm text-muted-foreground">— {r.n}</figcaption>
            </figure>
          ))}
        </section>

        <footer className="mt-12 text-center text-xs text-muted-foreground">
          © Oferta Brasil VIP · Você pode sair do grupo quando quiser.
        </footer>
      </div>
    </main>
  );
}
