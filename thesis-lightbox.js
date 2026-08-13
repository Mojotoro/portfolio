(() => {
  const selectors = ".iso-track img:not([aria-hidden='true']), .zone-gallery img, .plan-editorial img";
  const images = () => Array.from(document.querySelectorAll(selectors));
  const dialog = document.createElement("dialog");
  dialog.className = "image-lightbox";
  dialog.setAttribute("aria-label", "Full image viewer");
  dialog.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close image">×</button><button class="lightbox-nav prev" type="button" aria-label="Previous image">‹</button><img alt=""><button class="lightbox-nav next" type="button" aria-label="Next image">›</button><span class="lightbox-count"></span>';
  document.body.appendChild(dialog);

  const fullImage = dialog.querySelector("img");
  const count = dialog.querySelector(".lightbox-count");
  let current = 0;

  function show(index) {
    const list = images();
    if (!list.length) return;
    current = (index + list.length) % list.length;
    fullImage.src = list[current].currentSrc || list[current].src;
    fullImage.alt = list[current].alt || "Full size project image";
    count.textContent = (current + 1) + " / " + list.length;
    if (!dialog.open) dialog.showModal();
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest(selectors);
    if (!target) return;
    show(images().indexOf(target));
  });
  dialog.querySelector(".lightbox-close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".prev").addEventListener("click", () => show(current - 1));
  dialog.querySelector(".next").addEventListener("click", () => show(current + 1));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  document.addEventListener("keydown", (event) => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
})();

