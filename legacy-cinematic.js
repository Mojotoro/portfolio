import { gsap } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/index.js";
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger.js";

gsap.registerPlugin(ScrollTrigger);

const body = document.body;
const main = document.querySelector("main") || body;
const nav = document.createElement("header");
nav.className = "museum-nav";
nav.innerHTML = '<a class="museum-brand" href="index.html"><b>R</b><span>RATIPONG KAEWJAIJONG</span></a><nav class="museum-links"><a href="projects.html?category=Hospitality">Hospitality</a><a href="projects.html?category=Workplace">Workplace</a><a href="projects.html?category=Retail">Retail</a></nav><a class="museum-index" href="projects.html">Index &#8599;</a>';
body.prepend(nav);

const first = main.querySelector("section,header,.hero");
if (first) first.classList.add("museum-hero");

const categories = document.createElement("section");
categories.className = "museum-collections";
categories.innerHTML = '<p>EXPLORE THE ARCHIVE</p><h2>More <em>Collections</em></h2><div>' + ["Hospitality", "Workplace", "Education", "Retail", "Residential", "Visualization", "Digital"].map((name, index) => `<a href="projects.html?category=${name}"><small>0${index + 1}</small>${name}</a>`).join("") + "</div>";
main.append(categories);

const footer = document.createElement("footer");
footer.className = "museum-footer";
footer.innerHTML = "<span>© 2026 RATIPONG KAEWJAIJONG</span><a href='projects.html'>PORTFOLIO INDEX &#8599;</a>";
body.append(footer);

if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", () => ScrollTrigger.update(), { passive: true });
  gsap.from(".museum-hero>*", { y: 54, opacity: 0, duration: 0.95, stagger: 0.07, ease: "expo.out" });
  requestAnimationFrame(() => {
    gsap.utils.toArray("main img,.museum-collections a").forEach((element) => {
      gsap.from(element, {
        y: 34,
        opacity: 0,
        duration: 0.55,
        scrollTrigger: { trigger: element, start: "top 94%" },
      });
    });
  });
}
