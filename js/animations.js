/* =====================================================================
   ANIMATIONS  —  every scroll / load effect on the site.
   Uses GSAP + ScrollTrigger + ScrollSmoother (loaded in each page <head>).
   Timings match the original site. Tweak the numbers in CONFIG below.
   ===================================================================== */

(function () {
  var CONFIG = {
    smoothScroll: 1,          // ScrollSmoother "smooth" amount on home/landing pages (0 = off)
    headerSlideDistance: 50,  // px the logo/menu slide in from on page load
    headerLoadDelay: 1,       // seconds before the header slides in
    stickyHeaderAfter: 200,   // px scrolled before the header turns white
    counterDuration: 4,       // seconds for the stats to count up
    staggerDelay: 0.33        // seconds between each Explore card appearing
  };

  var html = document.documentElement;
  var body = document.body;
  var desktop = function () { return window.innerWidth > 1024; };
  var hasGsap = typeof window.gsap !== "undefined";
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);
  if (hasGsap && window.ScrollSmoother) gsap.registerPlugin(ScrollSmoother);

  function scrollTop() { return window.pageYOffset || html.scrollTop; }
  function offsetTop(el) { return el.getBoundingClientRect().top + scrollTop(); }

  /* ---------- 1. Smooth scrolling (home + landing pages, desktop only) ---------- */
  var smoother = null;
  if (hasGsap && window.ScrollSmoother && body.hasAttribute("data-smooth") && window.innerWidth > 1023 && CONFIG.smoothScroll) {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: CONFIG.smoothScroll,
      effects: true,               // enables data-speed parallax on elements
      normalizeScroll: false,
      ignoreMobileResize: true
    });
  }
  window.siteSmoother = smoother;

  /* ---------- 2. Header slides in on page load ---------- */
  // The logo is not part of this: its emblem shows immediately and its wordmark types in (js/layout.js)
  var topLinks = document.querySelector(".burger_nav");
  var burger = document.querySelector(".burger");
  var headerBtns = document.querySelector(".header-buttons");
  var slideIn = [topLinks, headerBtns, burger].filter(Boolean);
  if (hasGsap && slideIn.length) {
    if (scrollTop() < window.innerHeight) {
      gsap.set(slideIn, { x: CONFIG.headerSlideDistance });
      var tl = gsap.timeline({ defaults: { duration: 1, ease: "none" } });
      tl.to(slideIn, { opacity: 1, x: 0, delay: CONFIG.headerLoadDelay });
      var welcome = document.querySelector(".welcome-container");
      if (welcome && desktop()) { gsap.set(welcome, { opacity: 0 }); tl.to(welcome, { opacity: 1 }, "-=0.1"); }
    } else {
      gsap.set(slideIn, { x: 0, opacity: 1 });
    }
  } else {
    slideIn.forEach(function (el) { el.style.opacity = 1; });
  }

  /* ---------- 3. Sticky header after 200px ---------- */
  var header = document.querySelector(".site-header-wrap");
  function stickyHeader() { if (header) header.classList.toggle("sticky", scrollTop() > CONFIG.stickyHeaderAfter); }

  /* ---------- 4. Text fades up as it scrolls into view (desktop) ---------- */
  var revealItems = [];
  if (desktop()) {
    var sel = "main h1, main h2, main h3, main h4, main p, .blockquote, .quote-text, .download-item";
    var skip = ".image-blocks, .post-item, .news_item, .popup-source, .popupContent, .h-slide, .no-reveal, .video-card, .circle-signpost, .signposting, .welcome-container, .lightbox, .testimonial-sixth, .signposts-support .s, .video-text, .team-card, .people, .ticker-banner, .support-hero, .welcome-band .video-card, .background-title, .h-intro, .cta-banner, .follow-band, .testimonial-cards";
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.closest(skip)) return;
      el.classList.add("animate_it", "deactive");
      revealItems.push(el);
    });
  }
  function activate(el) { el.classList.remove("deactive"); el.classList.add("active"); }
  // Reveal when the element's top passes 1/6 of the screen above the bottom (same as the original)
  if (hasGsap) {
    revealItems.forEach(function (el) {
      ScrollTrigger.create({ trigger: el, start: function () { return "top bottom-=" + window.innerHeight / 6; }, once: true, onEnter: function () { activate(el); } });
    });
    revealItems = [];
  }
  function animateOnView() {
    var bottom = scrollTop() + window.innerHeight - window.innerHeight / 6;
    revealItems = revealItems.filter(function (el) {
      if (offsetTop(el) < bottom) { activate(el); return false; }
      return true;
    });
  }

  /* ---------- 5. Explore cards appear one after another ---------- */
  var staggerGroups = [];
  if (desktop()) {
    document.querySelectorAll(".image-block-items-container").forEach(function (group) {
      group.classList.add("staggered", "deactive");
      var d = 0;
      Array.prototype.forEach.call(group.children, function (child) {
        child.style.transition = "all 0.75s ease " + d + "s";
        d += CONFIG.staggerDelay;
      });
      staggerGroups.push(group);
    });
  }
  if (hasGsap) {
    staggerGroups.forEach(function (g) {
      ScrollTrigger.create({ trigger: g, start: "top bottom-=30", once: true, onEnter: function () { activate(g); } });
    });
    staggerGroups = [];
  }
  function staggerBoxes() {
    staggerGroups = staggerGroups.filter(function (g) {
      if (scrollTop() > offsetTop(g) - (window.innerHeight - 30)) { g.classList.remove("deactive"); g.classList.add("active"); return false; }
      return true;
    });
  }

  /* ---------- 6. Sticky circle button (e.g. Open Days) ---------- */
  var stickyBtn = document.querySelector(".sticky-button");
  function stickyButton() {
    if (!stickyBtn) return;
    stickyBtn.classList.toggle("move", scrollTop() > 100);
    var r = stickyBtn.getBoundingClientRect(), over = false;
    document.querySelectorAll(".welcome-and-stats, .blue-section, .footer-row, .standard_page").forEach(function (s) {
      var b = s.getBoundingClientRect();
      if (r.bottom > b.top && r.top < b.bottom) over = true;
    });
    stickyBtn.classList.toggle("darken", over);
  }

  /* ---------- 7. Stats count up from 0 ---------- */
  if (hasGsap && window.innerWidth > 768) {
    document.querySelectorAll(".count").forEach(function (el) {
      var raw = el.textContent.replace(/,/g, "");
      var target = parseFloat(raw);
      if (isNaN(target)) return;
      var decimals = (raw.split(".")[1] || "").length;
      var obj = { v: 0 };
      el.textContent = (0).toFixed(decimals);
      gsap.to(obj, {
        v: target,
        duration: CONFIG.counterDuration,
        ease: "power3.in",
        scrollTrigger: { trigger: el, start: "top bottom", toggleActions: "play none none none" },
        onUpdate: function () { el.textContent = decimals ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString(); }
      });
    });
  }

  /* ---------- 8. Home: horizontal card slider pinned while scrolling ---------- */
  if (hasGsap && window.innerWidth > 1023) {
    var wrapper = document.querySelector(".sticky-content .slide-wrapper");
    if (wrapper && window.innerWidth > 1024) {
      // Cards drift up/left into place as the section arrives
      gsap.set(wrapper, { y: window.innerHeight / 10, x: window.innerWidth / 10 });
      gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-content", start: "top center",
          end: function () { return window.innerHeight / 10 + " top"; },
          scrub: 1, invalidateOnRefresh: true
        }
      }).to(wrapper, { x: 0, y: 0, ease: "none" });
    }

    gsap.utils.toArray(".horizontal").forEach(function (section) {
      var pin = section.querySelector(".pin-wrap");
      var track = section.querySelector(".animation-wrap");
      var dist = function () { return -(track.scrollWidth - window.innerWidth); };
      var toRight = track.classList.contains("to-right");
      // data-length="1.5" makes the pinned scroll last 1.5x longer (used by the team cards)
      var length = parseFloat(section.getAttribute("data-length")) || 1;
      gsap.fromTo(track, { x: function () { return toRight ? 0 : dist(); } }, {
        x: function () { return toRight ? dist() : 0; },
        ease: "none",
        scrollTrigger: {
          trigger: section, start: "top top",
          end: function () { return "+=" + (track.scrollWidth - window.innerWidth) * length; },
          pin: pin, invalidateOnRefresh: true, anticipatePin: 1, scrub: true
        }
      });
    });
  }

  // Background colour follows the card in the middle of the screen
  function slideColours() {
    document.querySelectorAll(".horizontal").forEach(function (section) {
      var colour = "";
      var slides = section.querySelectorAll(".h-slide");
      slides.forEach(function (s) {
        var r = s.getBoundingClientRect(), mid = r.left + r.width / 2;
        if (mid > window.innerWidth / 2.5 && mid < window.innerWidth / 1.5) colour = s.getAttribute("data-colour");
      });
      if (!colour) return;
      slides.forEach(function (s) { s.classList.toggle("active", s.getAttribute("data-colour") === colour); });
      section.style.backgroundColor = colour;
    });
  }

  // Card text slides open on hover
  document.querySelectorAll(".h-slide").forEach(function (slide) {
    var reveal = slide.querySelector(".reveal");
    if (!reveal) return;
    slide.addEventListener("mouseenter", function () { slideToggle(reveal, true, 600); });
    slide.addEventListener("mouseleave", function () { slideToggle(reveal, false, 600); });
  });

  /* ---------- 9. Home: "Learn more" title rises as you scroll ---------- */
  if (hasGsap) {
    document.querySelectorAll(".circle-signpost").forEach(function (section) {
      var title = section.querySelector(".title");
      gsap.set(title, { y: 200 });
      gsap.to(title, {
        y: 0, ease: "none",
        scrollTrigger: {
          trigger: section, start: "top bottom-=100",
          end: function () { return "+=" + section.offsetHeight * 0.5; },
          scrub: true
        }
      });
    });
  }

  /* ---------- 10. Home: main video caption slides down on hover ---------- */
  document.querySelectorAll(".video-card.main").forEach(function (card) {
    var copy = card.querySelector(".copy");
    if (!copy) return;
    card.addEventListener("mouseenter", function () { slideToggle(copy, true, 400); });
    card.addEventListener("mouseleave", function () { slideToggle(copy, false, 400); });
  });

  /* ---------- 11. Landing pages ---------- */
  if (hasGsap) {
    // Sixth Form testimonial rises in
    document.querySelectorAll(".testimonial-sixth").forEach(function (s) {
      gsap.fromTo(s.querySelector(".copy"), { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1,
        scrollTrigger: { trigger: s, start: "top 75%", end: "bottom 50%" }
      });
    });
    // Support Us "ways to give" cards rise in one after another
    document.querySelectorAll(".signposts-support .signposts").forEach(function (g) {
      gsap.from(g.querySelectorAll(".s"), {
        opacity: 0, y: 50, duration: 1, ease: "power2.out", stagger: 0.3,
        scrollTrigger: { trigger: g, start: "top 75%", end: "top 50%", toggleActions: "play none none reverse" }
      });
    });
  }
  // Card text slides open on hover
  document.querySelectorAll(".signposts-support .s").forEach(function (card) {
    var reveal = card.querySelector(".reveal");
    if (!reveal) return;
    card.addEventListener("mouseenter", function () { slideToggle(reveal, true, 600); });
    card.addEventListener("mouseleave", function () { slideToggle(reveal, false, 600); });
  });

  // "Life in..." video list: hovering a title highlights it, clicking moves the video slider
  document.querySelectorAll(".life-in").forEach(function (section) {
    var links = section.querySelectorAll(".video-text .video-link");
    var slider = null;
    if (window.Swiper) {
      slider = new Swiper(section.querySelector(".video-images"), { slidesPerView: "auto", spaceBetween: 40 });
    }
    if (links[0]) links[0].classList.add("active");
    links.forEach(function (l, i) {
      l.addEventListener("mouseover", function () {
        links.forEach(function (x) { x.classList.remove("active"); });
        l.classList.add("active");
      });
      l.addEventListener("click", function () { if (slider) slider.slideTo(i); });
    });
  });

  /* ---------- 12. Parallax fallback (pages without smooth scroll) ---------- */
  if (hasGsap && !smoother) {
    document.querySelectorAll("[data-speed]").forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-speed")) || 1;
      if (speed === 1) return;
      gsap.to(el, {
        y: function () { return (1 - speed) * window.innerHeight * 0.5; }, ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true }
      });
    });
  }

  /* ---------- helpers ---------- */
  function slideToggle(el, open, ms) {
    if (open) {
      el.style.display = "block";
      var h = el.scrollHeight;
      el.style.overflow = "hidden";
      el.style.height = "0px";
      requestAnimationFrame(function () { el.style.transition = "height " + ms + "ms ease"; el.style.height = h + "px"; });
      setTimeout(function () { el.style.height = ""; el.style.overflow = ""; }, ms);
    } else {
      el.style.overflow = "hidden";
      el.style.height = el.scrollHeight + "px";
      requestAnimationFrame(function () { el.style.transition = "height " + ms + "ms ease"; el.style.height = "0px"; });
      setTimeout(function () { el.style.display = "none"; el.style.height = ""; el.style.overflow = ""; }, ms);
    }
  }
  window.siteSlideToggle = slideToggle;

  function onScroll() { stickyHeader(); animateOnView(); staggerBoxes(); stickyButton(); slideColours(); }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  window.addEventListener("load", function () { onScroll(); if (hasGsap) ScrollTrigger.refresh(); });
  onScroll();
})();
