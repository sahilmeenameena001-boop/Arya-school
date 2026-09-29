/* =====================================================================
   LAYOUT  —  builds the top bar, header, full-screen menu, sticky
   button, phone bottom bar, side menu, trust strip and footer on every
   page from js/site-config.js. You normally don't need to edit this.
   ===================================================================== */

(function () {
  var S = window.SITE;
  var C = S.contact;
  document.documentElement.classList.add("js");
  var current = location.pathname.split("/").pop() || "index.html";

  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 100 12.4 6.2 6.2 0 000-12.4zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.8a1.4 1.4 0 100 2.9 1.4 1.4 0 000-2.9z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.6l.4-4h-4V6.3c0-1 .2-1.3 1.1-1.3H18V0h-3.8C10.6 0 9 1.6 9 4.6V8z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24"><path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM.4 8.2h4.9V24H.4V8.2zm7.9 0H13v2.2h.1c.7-1.2 2.3-2.5 4.7-2.5 5 0 5.9 3.3 5.9 7.6V24h-4.9v-7.5c0-1.8 0-4.1-2.5-4.1s-2.9 1.9-2.9 4V24H8.3V8.2z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M18.9 1.2h3.7l-8 9.2 9.4 12.4h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.3H4.3l13.3 17.3z"/></svg>',
    email: '<svg viewBox="0 0 24 24"><path d="M0 4h24v16H0V4zm2 2v.5l10 6.5 10-6.5V6H2zm0 2.9V18h20V8.9l-10 6.5L2 8.9z"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 013 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24"><path d="M12 0a12 12 0 00-10.4 18L0 24l6.2-1.6A12 12 0 1012 0zm0 21.8a9.8 9.8 0 01-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1112 21.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 01-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6a1.1 1.1 0 00-.8.4 3.4 3.4 0 00-1 2.5 5.9 5.9 0 001.2 3.1 13.5 13.5 0 005.2 4.6c1.9.8 2.7.9 3.6.7.6-.1 1.8-.7 2-1.5.3-.7.3-1.3.2-1.5l-.7-.2z"/></svg>'
  };
  window.SITE_ICONS = ICONS;

  var tel = function (n) { return "tel:+91" + n.replace(/[^0-9]/g, "").replace(/^0/, ""); };
  var wa = "https://wa.me/" + C.whatsapp;
  window.SITE_LINKS = { tel: tel, whatsapp: wa };

  function isCurrent(href) { return href.split("#")[0] === current; }
  function link(l, cls) {
    return '<a href="' + l.href + '"' + (cls ? ' class="' + cls + '"' : "") + (l.href === current ? ' aria-current="page"' : "") + ">" + l.label + "</a>";
  }
  function list(items) { return items.map(function (l) { return "<li>" + link(l) + "</li>"; }).join(""); }
  var L = S.logo;
  var homeLabel = S.name.replace("Sr.", "Senior") + " — home";
  // Header / menu logo: emblem + live-text wordmark (typed letter by letter on first open)
  function brand(variant) {
    var word = L.lines.map(function (line) {
      return '<span class="brand-line">' + line.split("").map(function (ch) {
        return '<span class="ch">' + (ch === " " ? "&nbsp;" : ch) + "</span>";
      }).join("") + "</span>";
    }).join("");
    return '<img class="brand-emblem" src="' + L.emblem + '" alt="" width="220" height="209" decoding="async">' +
      '<span class="brand-word ' + (variant || "") + '" aria-hidden="true"><span class="brand-word-inner">' + word + "</span></span>";
  }
  // Footer logo: emblem + the supplied wordmark image
  function footerLogo() {
    return '<img class="brand-emblem" src="' + L.emblem + '" alt="" width="220" height="209">' +
      '<img class="footer-wordmark" src="' + L.wordmark + '" alt="" width="1419" height="210">';
  }
  function socials() {
    return Object.keys(S.social).filter(function (k) { return S.social[k]; }).map(function (k) {
      return '<a href="' + S.social[k] + '" target="_blank" rel="noopener" aria-label="' + k + '">' + ICONS[k] + "</a>";
    }).join("");
  }
  function sectionFor(href) {
    return S.mainNav.concat(S.extraSections || []).filter(function (s) {
      return isCurrent(s.href) || (s.children || []).some(function (c) { return isCurrent(c.href); });
    })[0];
  }

  /* ---------- Top bar + header + full-screen menu + sticky button + phone bar ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var activeSection = sectionFor(current);
    header.innerHTML =
      '<div class="site-header-wrap">' +
      '<div class="top-bar"><span>' + S.topBar + '</span><span class="sep">|</span><a href="' + tel(C.phone) + '">Call ' + C.phone + "</a></div>" +
      '<header class="site-header">' +
        '<a class="header__logo brand" href="index.html" aria-label="' + homeLabel + '">' + brand() + "</a>" +
        '<nav class="burger_nav" aria-label="Main sections"><ul>' + S.mainNav.map(function (item) {
          var on = activeSection && activeSection.href === item.href;
          return "<li" + (on ? ' class="current"' : "") + ">" + link(item) + "</li>";
        }).join("") + "</ul></nav>" +
        '<div class="header-buttons">' +
          '<a class="button apply" href="' + S.applyLink + '">Apply Now</a>' +
          '<a class="button call" href="' + tel(C.phone) + '">' + ICONS.phone + "<span>Call Us</span></a>" +
        "</div>" +
        '<button class="burger" aria-label="Open menu" aria-expanded="false"><span></span></button>' +
      "</header>" +
      "</div>" +
      '<nav class="header__nav" aria-label="Main menu">' +
        '<div class="decor"></div>' +
        '<a class="header__nav__logo brand" href="index.html" aria-label="' + homeLabel + '">' + brand("on-dark") + "</a>" +
        '<button class="close"><span>Close</span></button>' +
        '<div class="nav-container">' +
          '<ul class="main-menu">' + S.mainNav.map(function (item) {
            var sub = item.children ? '<ul class="sub-menu">' + list(item.children) + "</ul>" : "";
            var active = item.children && item.children.some(function (c) { return isCurrent(c.href); });
            return '<li class="' + (item.children ? "has-children" : "") + (active ? " active" : "") + '">' + link(item) + sub + "</li>";
          }).join("") + "</ul>" +
          '<ul class="secondary-nav">' + list(S.secondaryNav) + "</ul>" +
          '<div class="social">' + socials() + "</div>" +
        "</div>" +
      "</nav>" +
      (S.stickyButton && S.stickyButton.label && !document.body.hasAttribute("data-no-sticky-button")
        ? '<a class="sticky-button" href="' + S.stickyButton.href + '">' + S.stickyButton.label + "</a>" : "") +
      '<div class="mobile-bar">' +
        '<a href="' + tel(C.phone) + '">' + ICONS.phone + "<span>Call</span></a>" +
        '<a href="' + wa + '" target="_blank" rel="noopener">' + ICONS.whatsapp + "<span>WhatsApp</span></a>" +
        '<a class="apply" href="' + S.applyLink + '"><span>Apply Now</span></a>' +
      "</div>";
  }

  /* ---------- Side menu on inner pages ---------- */
  var side = document.querySelector(".side-nav[data-auto]");
  if (side) {
    var section = sectionFor(current);
    if (section && section.children) {
      side.innerHTML = '<a class="side-nav-title" href="' + section.href + '">' + section.label + "</a><ul>" +
        section.children.filter(function (c) { return c.label !== "Overview"; }).map(function (c) { return "<li>" + link(c) + "</li>"; }).join("") + "</ul>";
    } else {
      side.parentElement.style.visibility = "hidden";
    }
  }

  /* ---------- Trust strip:  <div data-trust-strip></div>  ---------- */
  document.querySelectorAll("[data-trust-strip]").forEach(function (el) {
    var items = el.getAttribute("data-trust-strip") === "short"
      ? ["CBSE Affiliated", "Since 2001", "Science · Commerce · Arts", "1,000+ Students"]
      : ["CBSE Affiliated (No. 530656)", "Established 2001", 'Classes <span class="tbc">[1–12 / Nursery–12, CONFIRM]</span>', "Science, Commerce and Arts streams", "1,000+ students"];
    el.className = "trust-strip";
    el.innerHTML = "<ul>" + items.map(function (i) { return "<li>" + i + "</li>"; }).join("") + "</ul>";
  });

  /* ---------- Footer ---------- */
  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<footer class="site-footer">' +
        '<div class="footer-row">' +
          '<a class="footer_logo brand" href="index.html" aria-label="' + homeLabel + '">' + footerLogo() + "</a>" +
          '<div class="footer-inner">' +
            '<div class="footer-column"><h2 class="footer-title">Contact Us</h2>' +
              '<div class="school-info">' + S.name + "<br>" + C.addressLines.join("<br>") + "</div>" +
              '<div class="school-info">Admissions: ' + C.phones.map(function (p) { return '<a href="' + tel(p) + '">' + p + "</a>"; }).join(" · ") + "</div>" +
              '<div class="school-info">School Office: <a href="' + tel(C.office) + '">' + C.office + "</a></div>" +
              '<div class="school-info">Email: ' + (C.email.charAt(0) === "[" ? '<span class="tbc">' + C.email + "</span>" : '<a href="mailto:' + C.email + '">' + C.email + "</a>") + "</div>" +
              '<div class="school-info">Office hours: <span class="tbc">' + C.hours + "</span></div></div>" +
            '<div class="footer-column"><h2 class="footer-title">Quick Links</h2><ul class="footer-links">' + list(S.footerLinks) + "</ul></div>" +
            '<div class="footer-column copyright"><p>' + S.tagline + "</p>" +
              '<h2 class="footer-title">Follow Us</h2><div class="footer-social">' + socials() + '</div><p class="hashtag">' + S.hashtag + "</p></div>" +
          "</div>" +
        "</div>" +
        (S.footerLogos.length ? '<div class="footer_logos">' + S.footerLogos.map(function (l) {
          return '<a href="' + (l.href || "#") + '" target="_blank" rel="noopener"><img src="' + l.image + '" alt="' + (l.alt || "") + '"></a>';
        }).join("") + "</div>" : "") +
        '<div class="footer_bar"><div class="legal">' + S.legalLine + '</div><div class="social">' + socials() + "</div></div>" +
      "</footer>";
  }

  /* ---------- Fill [data-site="..."] placeholders ---------- */
  var values = {
    name: S.name,
    phone: '<a href="' + tel(C.phone) + '">' + C.phone + "</a>",
    phones: C.phones.map(function (p) { return '<a href="' + tel(p) + '">' + p + "</a>"; }).join(" · "),
    office: '<a href="' + tel(C.office) + '">' + C.office + "</a>",
    whatsapp: '<a href="' + wa + '" target="_blank" rel="noopener">' + C.phone + '</a> <span class="tbc">[CONFIRM the number to use]</span>',
    email: C.email.charAt(0) === "[" ? '<span class="tbc">' + C.email + "</span>" : '<a href="mailto:' + C.email + '">' + C.email + "</a>",
    hours: '<span class="tbc">' + C.hours + "</span>",
    address: S.name + ", " + C.addressLines.join(", ")
  };
  document.querySelectorAll("[data-site]").forEach(function (el) {
    var v = values[el.getAttribute("data-site")];
    if (v) el.innerHTML = v;
  });
  // Buttons that call / WhatsApp: <a data-link="call"> / <a data-link="whatsapp">
  document.querySelectorAll('[data-link="call"]').forEach(function (a) { a.href = tel(C.phone); });
  document.querySelectorAll('[data-link="whatsapp"]').forEach(function (a) { a.href = wa; a.target = "_blank"; a.rel = "noopener"; });
  document.querySelectorAll("[data-social]").forEach(function (a) { a.href = S.social[a.getAttribute("data-social")]; a.target = "_blank"; a.rel = "noopener"; });

  /* ---------- Share links on news articles ---------- */
  document.querySelectorAll(".share[data-auto]").forEach(function (el) {
    var u = encodeURIComponent(location.href), t = encodeURIComponent(document.title);
    el.innerHTML = '<span class="share-title">Share</span>' +
      '<a target="_blank" rel="noopener" aria-label="Share on WhatsApp" href="https://wa.me/?text=' + t + "%20" + u + '">' + ICONS.whatsapp + "</a>" +
      '<a target="_blank" rel="noopener" aria-label="Share on Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + u + '">' + ICONS.facebook + "</a>" +
      '<a target="_blank" rel="noopener" aria-label="Share on X" href="https://twitter.com/intent/tweet?url=' + u + '">' + ICONS.x + "</a>" +
      '<a aria-label="Share by email" href="mailto:?subject=' + t + "&body=" + u + '">' + ICONS.email + "</a>";
  });

  /* ---------- Map (contact page) ---------- */
  var map = document.getElementById("map");
  if (map) {
    var q = encodeURIComponent(S.mapQuery);
    map.innerHTML = '<iframe title="Map to ' + S.name + '" loading="lazy" src="https://www.google.com/maps?q=' + q + '&output=embed"></iframe>';
    document.querySelectorAll("[data-directions]").forEach(function (a) { a.href = "https://www.google.com/maps/dir/?api=1&destination=" + q; a.target = "_blank"; a.rel = "noopener"; });
  }

  /* ---------- Animated header logo ----------
     1. The emblem shows straight away; the wordmark types itself in once per visit
        (again on a hard refresh, not when moving between pages).
     2. After scrolling past S.logo.collapseAfter px the wordmark folds away (emblem only).
     3. Hover / keyboard focus / first tap on the emblem shows the full wordmark instantly. */
  var brandEl = document.querySelector(".site-header .brand");
  var wrap = document.querySelector(".site-header-wrap");
  if (brandEl && wrap) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var chars = brandEl.querySelectorAll(".brand-word .ch");
    var wordEl = brandEl.querySelector(".brand-word");

    // Remember the wordmark's natural width so it can fold to 0 and back smoothly
    var innerEl = brandEl.querySelector(".brand-word-inner");
    function measure() { wordEl.style.setProperty("--word-w", Math.ceil(innerEl.scrollWidth) + 1 + "px"); }
    measure();
    // Re-measure when the web font arrives or the screen size changes the text size
    if ("ResizeObserver" in window) new ResizeObserver(measure).observe(innerEl);
    else window.addEventListener("resize", measure, { passive: true });
    if (document.fonts && document.fonts.load) document.fonts.load('500 19px "Montserrat"').then(measure, function () {});

    // Collapse when a 1px marker at the threshold leaves the viewport (no scroll listener needed)
    var marker = document.createElement("div");
    marker.setAttribute("aria-hidden", "true");
    marker.style.cssText = "position:absolute;left:0;width:1px;height:1px;pointer-events:none;top:" + (L.collapseAfter || 80) + "px";
    document.body.appendChild(marker);
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        var collapsed = !entries[0].isIntersecting && entries[0].boundingClientRect.top < 0;
        wrap.classList.toggle("logo-collapsed", collapsed);
        if (!collapsed) brandEl.classList.remove("revealed");
      }).observe(marker);
    }

    // Typing: first open of the site in this tab, or a hard refresh
    var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
    var isReload = nav ? nav.type === "reload" : false;
    var seen = false;
    try { seen = sessionStorage.getItem("aryaLogoTyped") === "1"; sessionStorage.setItem("aryaLogoTyped", "1"); } catch (e) {}
    var shouldType = !reduce && (isReload || !seen) && window.scrollY < (L.collapseAfter || 80);
    if (shouldType) {
      brandEl.classList.add("is-typing");
      setTimeout(function () {
        var i = 0;
        (function next() {
          if (i >= chars.length) { brandEl.classList.remove("is-typing"); return; }
          chars[i++].classList.add("on");
          setTimeout(next, L.typingSpeed || 55);
        })();
      }, L.typingDelay || 500);
    }
    // Coming back via the browser's back button: never leave letters hidden
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) { brandEl.classList.remove("is-typing"); }
    });

    // Touch: first tap on the emblem (while folded) shows the wordmark, second tap follows the link
    var lastPointer = "mouse";
    brandEl.addEventListener("pointerdown", function (e) { lastPointer = e.pointerType; });
    brandEl.addEventListener("click", function (e) {
      if (lastPointer === "touch" && wrap.classList.contains("logo-collapsed") && !brandEl.classList.contains("revealed")) {
        e.preventDefault();
        brandEl.classList.add("revealed");
      }
    });
    document.addEventListener("pointerdown", function (e) {
      if (!brandEl.contains(e.target)) brandEl.classList.remove("revealed");
    });
  }
})();
