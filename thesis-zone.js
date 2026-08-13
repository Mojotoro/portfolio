(() => {
  const zones = {
    hall: { number: "01", title: "Main Hall", subtitle: "Arrival and gathering space", count: 6 },
    cafe: { number: "02", title: "Cafe", subtitle: "Social and refreshment space", count: 4 },
    meeting: { number: "03", title: "Meeting", subtitle: "Flexible collaboration area", count: 6 },
    restaurant: { number: "04", title: "Restaurant", subtitle: "Dining and shared experience", count: 4 },
    retail: { number: "05", title: "Retail", subtitle: "Open display and customer journey", count: 6 },
    shop: { number: "06", title: "Shop", subtitle: "Compact commercial experience", count: 5 },
    "wine-shop": { number: "07", title: "Wine Shop", subtitle: "Product display and tasting atmosphere", count: 6 },
    workshop: { number: "08", title: "Workshop", subtitle: "Making, learning and activity space", count: 2 }
  };

  const params = new URLSearchParams(window.location.search);
  const key = params.get("zone") || "hall";
  const zone = zones[key] || zones.hall;
  const root = document.getElementById("zoneRoot");
  const image = (index) => "images/thesis/gallery/" + key + "-" + String(index).padStart(2, "0") + ".webp";
  const images = Array.from({ length: zone.count }, (_, index) => image(index + 1));

  document.title = zone.title + " | THESIS | Ratipong Kaewjaijong";
  root.innerHTML =
    '<section class="zone-hero"><img src="' + images[0] + '" alt="' + zone.title + '">' +
    '<div class="shade"></div><div class="zone-hero-copy"><p>THESIS SPACE ' + zone.number + '</p>' +
    '<h1>' + zone.title + '</h1><span>' + zone.subtitle + '</span></div></section>' +
    '<section class="zone-intro"><p class="label">SPACE GALLERY · ' + String(zone.count).padStart(2, "0") + ' VIEWS</p>' +
    '<h2>Explore the space<br>from every angle.</h2></section>' +
    '<section class="zone-gallery">' + images.map((src, index) =>
      '<figure class="' + (index === 0 || index % 3 === 0 ? "wide" : "") + '">' +
      '<img src="' + src + '" alt="' + zone.title + ' view ' + (index + 1) + '" loading="' + (index < 2 ? "eager" : "lazy") + '">' +
      '<figcaption>' + zone.number + ' · VIEW ' + String(index + 1).padStart(2, "0") + '</figcaption></figure>'
    ).join("") + '</section>' +
    '<nav class="zone-switcher" aria-label="THESIS spaces">' + Object.entries(zones).map(([id, item]) =>
      '<a class="' + (id === key ? "active" : "") + '" href="thesis-zone.html?zone=' + id + '"><small>' + item.number + '</small>' + item.title + '</a>'
    ).join("") + '</nav>';
})();
