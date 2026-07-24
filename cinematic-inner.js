import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.ticker.lagSmoothing(0);
  window.addEventListener("scroll", () => ScrollTrigger.update(), { passive: true });
  gsap.from(".page-hero>*", { y: 70, opacity: 0, duration: 1.0, stagger: 0.08, ease: "expo.out" });
  gsap.from(".detail-hero-copy>*", { y: 55, opacity: 0, duration: 0.95, stagger: 0.06, ease: "expo.out" });
  gsap.from(".detail-hero-media", { scale: 1.03, opacity: 0, duration: 1.15, ease: "expo.out" });
  requestAnimationFrame(() => {
    gsap.utils.toArray(".portfolio-card,.gallery-tile,.pdf-card").forEach((element) => {
      gsap.from(element, {
        y: 46,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 92%" },
      });
    });
  });
}
