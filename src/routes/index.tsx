import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { landingBody, landingCss } from "@/lib/landing-html";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oferta Brasil VIP — Promoções direto no seu WhatsApp" },
      { name: "description", content: "Entre grátis no Oferta Brasil VIP e receba promoções de casa, beleza, mercado, infantil, ferramentas e fitness direto no seu WhatsApp." },
      { property: "og:title", content: "Oferta Brasil VIP — Promoções direto no seu WhatsApp" },
      { property: "og:description", content: "Escolha sua categoria favorita e entre grátis no grupo. As ofertas chegam até você." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#ffe600" },
    ],
  }),
  component: Index,
});

declare global {
  interface Window { fbq?: (...args: unknown[]) => void }
}

function Index() {
  useEffect(() => {
    const items = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    items.forEach((el) => io.observe(el));

    const onClick = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest("a.group") as HTMLAnchorElement | null;
      if (!a) return;
      const name = a.querySelector("h3")?.textContent?.trim() ?? a.href;
      window.fbq?.("track", "Lead", { content_name: name });
    };
    document.addEventListener("click", onClick);

    const sticky = document.getElementById("sticky-cta");
    const hero = document.querySelector(".hero");
    const groups = document.getElementById("grupos");
    const onScroll = () => {
      if (!sticky || !hero || !groups) return;
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const r = groups.getBoundingClientRect();
      sticky.classList.toggle("show", pastHero && !(r.top < window.innerHeight && r.bottom > 0));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: landingCss }} />
      <div dangerouslySetInnerHTML={{ __html: landingBody }} />
    </>
  );
}
