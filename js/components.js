/* =====================================================================
   COMPONENTS  —  clickable behaviour: menu, accordion, pop-ups,
   galleries, timeline slider, video lightbox, mute button.
   ===================================================================== */

(function () {
  var html = document.documentElement;

  /* ---------- Full-screen menu ---------- */
  var nav = document.querySelector(".header__nav");
  function openMenu(open) {
    if (!nav) return;
    nav.classList.toggle("active", open);
    html.style.overflow = open ? "hidden" : "";
    var b = document.querySelector(".burger");
    if (b) b.setAttribute("aria-expanded", String(open));
  }
  document.addEventListener("click", function (e) {
    if (e.target.closest(".burger")) { openMenu(true); return; }
    if (e.target.closest(".header__nav .close")) { openMenu(false); return; }
    // First click on a menu item with sub-pages opens its sub-menu; second click follows the link
    var item = e.target.closest(".main-menu > li.has-children > a");
    if (item) {
      var li = item.parentElement;
      if (!li.classList.contains("active")) {
        e.preventDefault();
        Array.prototype.forEach.call(li.parentElement.children, function (s) { s.classList.remove("active"); });
        li.classList.add("active");
      }
    }
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { openMenu(false); closePopup(); closeLightbox(); } });

  /* ---------- Accordion ---------- */
  document.querySelectorAll(".accordion-title").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".accordion-item");
      var content = item.querySelector(".accordion-content");
      var open = !item.classList.contains("open");
      item.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      window.siteSlideToggle ? window.siteSlideToggle(content, open, 400) : (content.style.display = open ? "block" : "none");
      setTimeout(function () { if (window.ScrollTrigger) ScrollTrigger.refresh(); }, 450);
    });
  });

  /* ---------- Pop-up tiles (subjects, sports, ...) ---------- */
  var overlay = null, currentTiles = [], currentIndex = 0;
  function buildOverlay() {
    overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    overlay.innerHTML = '<div class="popup" role="dialog" aria-modal="true"><button class="close-btn" aria-label="Close"></button>' +
      '<div class="content"></div><button class="prev" aria-label="Previous">&#8249;</button><button class="next" aria-label="Next">&#8250;</button></div>';
    document.body.appendChild(overlay);
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay || e.target.closest(".close-btn")) closePopup();
      if (e.target.closest(".prev")) showPopup(currentIndex - 1);
      if (e.target.closest(".next")) showPopup(currentIndex + 1);
    });
  }
  function showPopup(i) {
    if (!overlay) buildOverlay();
    currentIndex = (i + currentTiles.length) % currentTiles.length;
    var src = currentTiles[currentIndex].querySelector(".popup-source");
    overlay.querySelector(".content").innerHTML = src ? src.innerHTML : "";
    overlay.querySelector(".content").scrollTop = 0;
    overlay.classList.add("active");
    html.style.overflow = "hidden";
  }
  function closePopup() { if (overlay) { overlay.classList.remove("active"); html.style.overflow = ""; } }
  document.querySelectorAll(".popupContent-container").forEach(function (container) {
    var tiles = Array.prototype.slice.call(container.querySelectorAll(".popupContent-item"));
    tiles.forEach(function (tile, i) {
      tile.setAttribute("tabindex", "0");
      tile.addEventListener("click", function () { currentTiles = tiles; showPopup(i); });
      tile.addEventListener("keydown", function (e) { if (e.key === "Enter") { currentTiles = tiles; showPopup(i); } });
    });
  });

  /* ---------- Lightbox (gallery images + videos) ---------- */
  var lb = null, lbImages = [], lbIndex = 0;
  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML = '<button class="close-btn" aria-label="Close"></button><button class="lb-prev" aria-label="Previous">&#8249;</button>' +
      '<div class="lb-body"></div><button class="lb-next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(lb);
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.closest(".close-btn")) closeLightbox();
      if (e.target.closest(".lb-prev")) showImage(lbIndex - 1);
      if (e.target.closest(".lb-next")) showImage(lbIndex + 1);
    });
  }
  function openLightbox(content, isGallery) {
    if (!lb) buildLightbox();
    lb.querySelector(".lb-body").innerHTML = content;
    lb.querySelector(".lb-prev").style.display = lb.querySelector(".lb-next").style.display = isGallery ? "" : "none";
    lb.classList.add("active");
    html.style.overflow = "hidden";
  }
  function closeLightbox() { if (lb) { lb.classList.remove("active"); lb.querySelector(".lb-body").innerHTML = ""; html.style.overflow = ""; } }
  function showImage(i) {
    lbIndex = (i + lbImages.length) % lbImages.length;
    openLightbox('<img src="' + lbImages[lbIndex] + '" alt="">', true);
  }

  // Videos: any element with data-video="URL" (YouTube, Vimeo or .mp4)
  function videoEmbed(url) {
    if (!url) return '<p style="color:#fff">Add a video link in the data-video attribute.</p>';
    var yt = url.match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/);
    if (yt) return '<iframe src="https://www.youtube.com/embed/' + yt[1] + '?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    var vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return '<iframe src="https://player.vimeo.com/video/' + vm[1] + '?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>';
    return '<video src="' + url + '" controls autoplay playsinline></video>';
  }
  document.addEventListener("click", function (e) {
    var v = e.target.closest("[data-video]");
    if (v) { e.preventDefault(); openLightbox(videoEmbed(v.getAttribute("data-video")), false); }
  });

  /* ---------- Image gallery slider ---------- */
  if (window.Swiper) {
    document.querySelectorAll(".image-gallery").forEach(function (g) {
      var imgs = Array.prototype.map.call(g.querySelectorAll(".swiper-slide img"), function (im) { return im.getAttribute("data-full") || im.src; });
      new Swiper(g.querySelector(".swiper"), {
        slidesPerView: 1.2, spaceBetween: 16, loop: imgs.length > 4,
        navigation: { nextEl: g.querySelector(".swiper-button-next"), prevEl: g.querySelector(".swiper-button-prev") },
        breakpoints: { 600: { slidesPerView: 2 }, 1025: { slidesPerView: 3 }, 1400: { slidesPerView: 4 } }
      });
      g.querySelectorAll(".swiper-slide img").forEach(function (im) {
        im.addEventListener("click", function () {
          lbImages = imgs;
          showImage(imgs.indexOf(im.getAttribute("data-full") || im.src));
        });
      });
    });

    /* ---------- History timeline (years along the bottom) ---------- */
    document.querySelectorAll(".history-slider").forEach(function (h) {
      var thumbs = new Swiper(h.querySelector(".history-nav"), {
        slidesPerView: 3, spaceBetween: 10, watchSlidesProgress: true, slideToClickedSlide: true,
        breakpoints: { 768: { slidesPerView: 5 }, 1200: { slidesPerView: 7 } }
      });
      new Swiper(h.querySelector(".history-main"), {
        spaceBetween: 40, autoHeight: true,
        navigation: { nextEl: h.querySelector(".h-next"), prevEl: h.querySelector(".h-prev") },
        thumbs: { swiper: thumbs }
      });
    });

    /* ---------- News slider (Alumnae) ---------- */
    document.querySelectorAll(".news-swiper").forEach(function (s) {
      new Swiper(s, {
        slidesPerView: 1.1, spaceBetween: 0,
        navigation: { nextEl: s.querySelector(".swiper-button-next"), prevEl: s.querySelector(".swiper-button-prev") },
        breakpoints: { 600: { slidesPerView: 2 }, 1150: { slidesPerView: 3 }, 1500: { slidesPerView: 4 } }
      });
    });

    /* ---------- Landing page hero slider (Support Us) ---------- */
    document.querySelectorAll(".hero-slider").forEach(function (s) {
      new Swiper(s, { loop: true, effect: "fade", autoplay: { delay: 5000 }, speed: 1000 });
    });
  }

  /* ---------- Hero video mute / unmute ---------- */
  document.querySelectorAll(".mute-video").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var section = btn.closest("section");
      var videos = section.querySelectorAll("video");
      var unmute = !btn.classList.contains("unmuted");
      videos.forEach(function (v) { v.muted = !unmute; });
      btn.classList.toggle("unmuted", unmute);
      btn.setAttribute("aria-label", unmute ? "Mute video" : "Unmute video");
    });
  });

  /* ---------- Enquiry and contact forms ----------
     If SITE.formEndpoint is set (e.g. a Formspree / Web3Forms address) the form is sent there.
     Otherwise it opens WhatsApp with the details filled in, ready to send to the school. */
  var MSG_OK = "Thank you. Our admissions team will call you within one working day.";
  var MSG_ERR = "Something went wrong. Please try again or call us on " + (window.SITE ? SITE.contact.phone : "") + ".";
  document.querySelectorAll("form[data-enquiry-form]").forEach(function (form) {
    var msg = form.querySelector(".form-message");
    function show(ok, text) { msg.className = "form-message " + (ok ? "success" : "error"); msg.textContent = text; }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var endpoint = window.SITE && SITE.formEndpoint;
      if (endpoint) {
        fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) { if (!r.ok) throw new Error(); show(true, MSG_OK); form.reset(); })
          .catch(function () { show(false, MSG_ERR); });
      } else {
        var lines = [form.getAttribute("data-enquiry-form") || "Website enquiry"];
        data.forEach(function (v, k) { if (v) lines.push(k + ": " + v); });
        window.open("https://wa.me/" + SITE.contact.whatsapp + "?text=" + encodeURIComponent(lines.join("\n")), "_blank", "noopener");
        show(true, MSG_OK);
        form.reset();
      }
    });
  });

  /* ---------- Smooth scroll for #anchor links ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2) return;
    var target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    if (window.siteSmoother) window.siteSmoother.scrollTo(target, true, "top 100px");
    else window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - 100, behavior: "smooth" });
  });
})();
