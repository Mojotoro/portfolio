(function () {
  var ownerEmail = "ratipong.2556@gmail.com";
  var passwordHash = "31b67c9a93edc927f908174795707bef8eaaad0b942a363fc5440d86fefed862";
  var pendingUrl = "";
  var pendingLabel = "";
  var lastFocused = null;

  var css = [
    ".download-lock-overlay{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(14,19,23,.42);backdrop-filter:blur(24px) saturate(1.35)}",
    ".download-lock-overlay.is-open{display:flex}",
    ".download-lock-dialog{width:min(440px,100%);border:1px solid rgba(255,255,255,.58);border-radius:28px;padding:26px;color:#101418;background:linear-gradient(145deg,rgba(255,255,255,.84),rgba(230,236,240,.62));box-shadow:0 30px 90px rgba(13,25,35,.28),inset 0 1px 0 rgba(255,255,255,.92);font-family:inherit}",
    ".download-lock-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px;margin-bottom:14px}",
    ".download-lock-title{margin:0;font-size:clamp(26px,4vw,34px);line-height:1;letter-spacing:0}",
    ".download-lock-close{width:38px;height:38px;border:1px solid rgba(255,255,255,.7);border-radius:999px;color:#111820;background:rgba(255,255,255,.45);box-shadow:0 10px 26px rgba(24,35,44,.12);cursor:pointer;font-size:22px;line-height:1}",
    ".download-lock-copy{margin:0 0 20px;color:#5d6873;font-size:15px;line-height:1.7}",
    ".download-lock-label{display:block;margin-bottom:8px;color:#27313a;font-size:13px;font-weight:800}",
    ".download-lock-input{width:100%;min-height:48px;box-sizing:border-box;border:1px solid rgba(92,105,116,.22);border-radius:16px;padding:0 14px;color:#101418;background:rgba(255,255,255,.72);font:inherit;outline:none}",
    ".download-lock-input:focus{border-color:rgba(32,92,122,.62);box-shadow:0 0 0 4px rgba(32,92,122,.12)}",
    ".download-lock-error{min-height:22px;margin:8px 0 14px;color:#a53333;font-size:13px;font-weight:700}",
    ".download-lock-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center}",
    ".download-lock-submit,.download-lock-request{min-height:44px;border-radius:999px;padding:0 18px;font-weight:900;text-decoration:none}",
    ".download-lock-submit{border:0;color:#fff;background:#12394d;cursor:pointer;box-shadow:0 14px 34px rgba(18,57,77,.24)}",
    ".download-lock-request{display:inline-flex;align-items:center;color:#12394d;background:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.72)}"
  ].join("");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var overlay = document.createElement("div");
  overlay.className = "download-lock-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = '<div class="download-lock-dialog"><div class="download-lock-head"><h2 class="download-lock-title">กรอกรหัสดาวน์โหลด</h2><button class="download-lock-close" type="button" aria-label="ปิด">x</button></div><p class="download-lock-copy">ไฟล์นี้ต้องใช้รหัสก่อนดาวน์โหลด ถ้ายังไม่มีรหัสให้ส่งคำขอไปที่อีเมลเจ้าของผลงาน</p><form class="download-lock-form"><label class="download-lock-label" for="download-lock-password">รหัสผ่าน</label><input class="download-lock-input" id="download-lock-password" type="password" autocomplete="one-time-code"><p class="download-lock-error" aria-live="polite"></p><div class="download-lock-actions"><button class="download-lock-submit" type="submit">ดาวน์โหลด</button><a class="download-lock-request" href="#">ขอรหัส</a></div></form></div>';
  document.body.appendChild(overlay);

  var form = overlay.querySelector(".download-lock-form");
  var input = overlay.querySelector(".download-lock-input");
  var error = overlay.querySelector(".download-lock-error");
  var requestLink = overlay.querySelector(".download-lock-request");

  function isProtectedDownload(link) {
    var href = link.getAttribute("href") || "";
    return link.hasAttribute("download") || href.indexOf("/releases/download/") !== -1 || /\.zip(\?|#|$)/i.test(href);
  }

  function buildMailto() {
    var subject = "Download code request";
    var body = ["ขอรหัสดาวน์โหลดไฟล์จากเว็บไซต์ portfolio", "", "ไฟล์: " + (pendingLabel || "Download file"), "ลิงก์: " + pendingUrl, "หน้าเว็บ: " + window.location.href].join("\n");
    return "mailto:" + ownerEmail + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
      return byte.toString(16).padStart(2, "0");
    }).join("");
  }

  async function sha256(value) {
    var data = new TextEncoder().encode(value);
    return hex(await crypto.subtle.digest("SHA-256", data));
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
    window.setTimeout(function () { input.focus(); }, 0);
  }

  function closeModal() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    error.textContent = "";
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function downloadPendingFile() {
    window.location.href = pendingUrl;
    closeModal();
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a[href]");
    if (!link || !isProtectedDownload(link)) return;
    event.preventDefault();
    openModal(link);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    var password = input.value.trim();
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
  overlay.addEventListener("click", function (event) { if (event.target === overlay) closeModal(); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape" && overlay.classList.contains("is-open")) closeModal(); });
})();
