(function () {
  const ownerEmail = "ratipong.2556@gmail.com";
  const passwordHash = "31b67c9a93edc927f908174795707bef8eaaad0b942a363fc5440d86fefed862";
  let pendingUrl = "";
  let pendingLabel = "";
  let lastFocused = null;

  const style = document.createElement("style");
  style.textContent = `
    .download-lock-overlay{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(14,19,23,.42);backdrop-filter:blur(24px) saturate(1.35)}
    .download-lock-overlay.is-open{display:flex}
    .download-lock-dialog{width:min(440px,100%);border:1px solid rgba(255,255,255,.55);border-radius:28px;padding:26px;color:#101418;background:linear-gradient(145deg,rgba(255,255,255,.78),rgba(230,236,240,.58));box-shadow:0 30px 90px rgba(13,25,35,.28),inset 0 1px 0 rgba(255,255,255,.92);font-family:inherit}
    .download-lock-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:14px}
    .download-lock-title{margin:0;font-size:clamp(26px,4vw,34px);line-height:1;letter-spacing:0}
    .download-lock-close{width:38px;height:38px;border:1px solid rgba(255,255,255,.7);border-radius:999px;color:#111820;background:rgba(255,255,255,.45);box-shadow:0 10px 26px rgba(24,35,44,.12);cursor:pointer;font-size:22px;line-height:1}
    .download-lock-copy{margin:0 0 20px;color:#5d6873;font-size:15px;line-height:1.7}
    .download-lock-label{display:block;margin-bottom:8px;color:#27313a;font-size:13px;font-weight:800}
    .download-lock-input{width:100%;min-height:48px;box-sizing:border-box;border:1px solid rgba(92,105,116,.22);border-radius:16px;padding:0 14px;color:#101418;background:rgba(255,255,255,.72);box-shadow:inset 0 1px 0 rgba(255,255,255,.8);font:inherit;outline:none}
    .download-lock-input:focus{border-color:rgba(32,92,122,.62);box-shadow:0 0 0 4px rgba(32,92,122,.12),inset 0 1px 0 rgba(255,255,255,.8)}
    .download-lock-error{min-height:22px;margin:8px 0 14px;color:#a53333;font-size:13px;font-weight:700}
    .download-lock-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}
    .download-lock-submit,.download-lock-request{min-height:44px;border-radius:999px;padding:0 18px;font-weight:900;text-decoration:none}
    .download-lock-submit{border:0;color:#fff;background:#12394d;cursor:pointer;box-shadow:0 14px 34px rgba(18,57,77,.24)}
    .download-lock-request{display:inline-flex;align-items:center;color:#12394d;background:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.72)}
  `;
  document.head.append(style);

  const overlay = document.createElement("div");
  overlay.className = "download-lock-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `
    <div class="download-lock-dialog">
      <div class="download-lock-head">
        <h2 class="download-lock-title">กรอกรหัสดาวน์โหลด</h2>
        <button class="download-lock-close" type="button" aria-label="ปิด">x</button>
      </div>
      <p class="download-lock-copy">ไฟล์นี้ต้องใช้รหัสก่อนดาวน์โหลด ถ้ายังไม่มีรหัสให้ส่งคำขอไปที่อีเมลเจ้าของผลงาน</p>
      <form class="download-lock-form">
        <label class="download-lock-label" for="download-lock-password">รหัสผ่าน</label>
        <input class="download-lock-input" id="download-lock-password" type="password" autocomplete="one-time-code">
        <p class="download-lock-error" aria-live="polite"></p>
        <div class="download-lock-actions">
          <button class="download-lock-submit" type="submit">ดาวน์โหลด</button>
          <a class="download-lock-request" href="#">ขอรหัส</a>
        </div>
      </form>
    </div>
  `;
  document.body.append(overlay);

  const form = overlay.querySelector(".download-lock-form");
  const input = overlay.querySelector(".download-lock-input");
  const error = overlay.querySelector(".download-lock-error");
  const requestLink = overlay.querySelector(".download-lock-request");

  function isProtectedDownload(link) {
    const href = link.getAttribute("href") || "";
    return link.hasAttribute("download") || //releases/download//.test(href) || /.zip(?|#|$)/i.test(href);
  }

  function buildMailto() {
    const subject = "Download code request";
    const body = ["ขอรหัสดาวน์โหลดไฟล์จากเว็บไซต์ portfolio", "", "ไฟล์: " + (pendingLabel || "Download file"), "ลิงก์: " + pendingUrl, "หน้าเว็บ: " + window.location.href].join("
");
    return "mailto:" + ownerEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  async function sha256(value) {
    const data = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  function openModal(link) {
    lastFocused = document.activeElement;
    pendingUrl = link.href;
    pendingLabel = (link.textContent || link.getAttribute("aria-label") || "").trim();
    error.textContent = "";
    input.value = "";
    requestLink.href = buildMailto();
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    setTimeout(() => input.focus(), 0);
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    error.textContent = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function downloadPendingFile() {
    const link = document.createElement("a");
    link.href = pendingUrl;
    link.download = "";
    link.rel = "noopener";
    document.body.append(link);
    link.click();
    link.remove();
    closeModal();
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || !isProtectedDownload(link)) return;
    event.preventDefault();
    openModal(link);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const password = input.value.trim();
    if (!password) {
      error.textContent = "กรุณากรอกรหัสก่อนดาวน์โหลด";
      return;
    }
    if (await sha256(password) !== passwordHash) {
      error.textContent = "รหัสไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง";
      input.select();
      return;
    }
    downloadPendingFile();
  });

  overlay.querySelector(".download-lock-close").addEventListener("click", closeModal);
  overlay.addEventListener("click", (event) => { if (event.target === overlay) closeModal(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && overlay.classList.contains("is-open")) closeModal(); });
})();
