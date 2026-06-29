(function () {
  const projectOrder = [
    "office-sukhumvit31",
    "one-bangkok-popup",
    "ramen-sukhumvit33",
    "chikura-hanoi",
    "tong-lor-bar",
    "condo-sukhumvit33",
    "condo-sukhumvit24",
    "resort",
    "hotel",
    "zen-japanese-restaurant",
    "pool-villa",
    "office-khan",
    "samsung-shop",
    "rental-house",
    "gallery-art",
    "learning-center",
    "office-rmutt",
    "presidents-office",
    "VIP RESIDENT ROOM",
    "landscape-rmutt",
    "aluminium-profile",
    "ai-render",
    "little-garden",
    "logo-design"
  ];
  const projects = (window.portfolioProjects || []).slice().sort((a, b) => {
    const aIndex = projectOrder.indexOf(a.id);
    const bIndex = projectOrder.indexOf(b.id);
    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });
  const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  function projectUrl(id) {
    return `project.html?id=${encodeURIComponent(id)}`;
  }

  function setupHeader() {
    const header = document.querySelector("[data-header]");
    const toggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-nav]");

    if (header && !header.classList.contains("solid")) {
      const updateHeader = () => {
        header.classList.toggle("solid", window.scrollY > 24);
      };
      updateHeader();
      window.addEventListener("scroll", updateHeader, { passive: true });
    }

    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        toggle.classList.toggle("open", isOpen);
        toggle.setAttribute("aria-expanded", String(isOpen));
      });

      nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          nav.classList.remove("open");
          toggle.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function renderCardThumb(project) {
    const images = project.cardImages?.length ? project.cardImages : [project.cover];
    if (images.length === 1) {
      return `
        <div class="thumb single">
          <img src="${images[0]}" alt="${project.title}" loading="lazy">
        </div>
      `;
    }

    return `
      <div class="thumb collage collage-${Math.min(images.length, 3)}">
        ${images.slice(0, 3).map((image, index) => `
          <img src="${image}" alt="${project.title} preview ${index + 1}" loading="lazy">
        `).join("")}
      </div>
    `;
  }

  function renderPortfolioGrid() {
    const grid = document.getElementById("portfolioGrid");
    if (!grid) return;

    grid.innerHTML = projects.map((project) => `
      <a class="portfolio-card ${project.cardSize ? `card-${project.cardSize}` : ""}" href="${projectUrl(project.id)}" data-category="${project.category}">
        ${renderCardThumb(project)}
        <div class="card-body">
          <div class="card-meta">
            <span>${project.category}</span>
            <small>${project.year || ""}</small>
          </div>
          <h3>${project.title}</h3>
          <p>${project.location} · ${project.role}</p>
          <ul class="tag-list">
            ${(project.tags || []).slice(0, 3).map((tag) => `<li>${tag}</li>`).join("")}
          </ul>
        </div>
      </a>
    `).join("");

    const resultCount = document.getElementById("resultCount");
    const cards = Array.from(document.querySelectorAll(".portfolio-card"));

    function setCount(visibleCards, label) {
      if (!resultCount) return;
      resultCount.textContent = `${visibleCards} project${visibleCards === 1 ? "" : "s"}${label === "all" ? "" : ` in ${label}`}`;
    }

    setCount(cards.length, "all");

    document.querySelectorAll(".filter-chip").forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;
        document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.remove("active"));
        button.classList.add("active");

        let visibleCards = 0;
        cards.forEach((card) => {
          const isVisible = filter === "all" || card.dataset.category === filter;
          card.hidden = !isVisible;
          if (isVisible) visibleCards += 1;
        });
        setCount(visibleCards, filter);
      });
    });
  }

  function renderProjectDetail() {
    const root = document.getElementById("projectRoot");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || projects[0]?.id;
    const index = Math.max(0, projects.findIndex((item) => item.id === id));
    const project = projects[index] || projects[0];

    if (!project) {
      root.innerHTML = `
        <section class="page-hero compact">
          <p class="eyebrow">Project</p>
          <h1>Project not found</h1>
          <p>กลับไปที่หน้ารวมผลงานเพื่อเลือกโปรเจกต์ใหม่</p>
          <a class="button primary dark-button" href="projects.html">Back to Portfolio</a>
        </section>
      `;
      return;
    }

    const nextProject = projects[(index + 1) % projects.length];
    document.title = `${project.title} | Ratipong Kaewjaijong`;

    const galleryGroups = project.galleryGroups?.length
      ? project.galleryGroups
      : [{ title: "", images: project.images || [] }];
    const gallery = galleryGroups.flatMap((group, groupIndex) => [
      group.title ? `<div class="gallery-group-title">${group.title}</div>` : "",
      ...(group.images || []).map((image, imageIndex) => `
        <button class="gallery-tile" type="button" data-image="${image}">
          <img src="${image}" alt="${project.title} image ${groupIndex + 1}-${imageIndex + 1}" loading="lazy">
        </button>
      `)
    ]).filter(Boolean);
    const pdfGroups = project.pdfGroups || [];
    const pdfDocuments = pdfGroups.flatMap((group) => [
      group.title ? `<div class="pdf-group-title">${group.title}</div>` : "",
      ...(group.files || []).map((file) => `
        <a class="pdf-card" href="${file.url}" target="_blank" rel="noopener">
          <span>PDF</span>
          <strong>${file.title}</strong>
          ${file.note ? `<small>${file.note}</small>` : ""}
        </a>
      `)
    ]).filter(Boolean);
    const pdfButtonUrl = project.pdfPageUrl || (pdfDocuments.length ? "#documents" : project.planUrl || "");
    const pdfButtonTarget = project.pdfPageUrl || pdfDocuments.length ? "" : ` target="_blank" rel="noopener"`;

    root.innerHTML = `
      <section class="detail-hero">
        <div class="detail-hero-copy">
          <p class="eyebrow">${project.category}</p>
          <h1>${project.title}</h1>
          <p>${project.summary}</p>
          <ul class="tag-list large">
            ${(project.tags || []).map((tag) => `<li>${tag}</li>`).join("")}
          </ul>
          <div class="hero-actions">
            <a class="button primary dark-button" href="projects.html">All Projects</a>
            ${pdfButtonUrl ? `<a class="button quiet dark" href="${pdfButtonUrl}"${pdfButtonTarget}>View PDF</a>` : ""}
            <a class="button quiet dark" href="#gallery">View Gallery</a>
          </div>
        </div>
        <div class="detail-hero-media">
          <img src="${project.cover}" alt="${project.title}">
        </div>
      </section>

      <section class="project-meta" aria-label="Project information">
        <div>
          <small>Location</small>
          <strong>${project.location}</strong>
        </div>
        <div>
          <small>Role</small>
          <strong>${project.role}</strong>
        </div>
        <div>
          <small>Status</small>
          <strong>${project.status}</strong>
        </div>
        <div>
          <small>Year</small>
          <strong>${project.year || "-"}</strong>
        </div>
      </section>

      <section class="project-overview">
        <div>
          <p class="eyebrow">Overview</p>
          <h2>Design focus</h2>
        </div>
        <div>
          <p>${project.highlight || project.summary}</p>
          <dl class="scope-list">
            <div>
              <dt>Scope</dt>
              <dd>${project.scope || project.role}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>${project.category}</dd>
            </div>
          </dl>
        </div>
      </section>

      ${pdfDocuments.length ? `
        <section class="document-section" id="documents">
          <div class="section-heading">
            <div>
              <p class="eyebrow">PDF Documents</p>
              <h2>Open project files</h2>
            </div>
          </div>
          <div class="pdf-grid">
            ${pdfDocuments.join("")}
          </div>
        </section>
      ` : ""}

      <section class="gallery-section" id="gallery">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Gallery</p>
            <h2>Project images</h2>
          </div>
        </div>
        <div class="gallery-grid ${project.galleryFit ? "fit-gallery" : ""}">
          ${gallery.join("")}
        </div>
      </section>

      <section class="project-next">
        <div>
          <p>Next project</p>
          <a href="${projectUrl(nextProject.id)}">${nextProject.title}</a>
        </div>
        <a class="button primary" href="${projectUrl(nextProject.id)}">Next</a>
      </section>
    `;

    setupLightbox();
  }

  function setupLightbox() {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const close = document.querySelector(".lightbox-close");
    if (!lightbox || !lightboxImage || !close) return;

    document.querySelectorAll(".gallery-tile").forEach((button) => {
      button.addEventListener("click", () => {
        lightboxImage.src = button.dataset.image;
        lightboxImage.alt = button.querySelector("img")?.alt || "Project image";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = transparentPixel;
    }

    close.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeLightbox();
    });
  }

  setupHeader();
  renderPortfolioGrid();
  renderProjectDetail();
})();
