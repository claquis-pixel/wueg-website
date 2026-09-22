/* Wharton Undergraduate Energy Group — main.js
 *
 * Progressive enhancement only. Every page works with JavaScript disabled;
 * this file adds the mobile nav, marks the current nav item, highlights the
 * active constitution section, and fills in the footer year.
 */
(function () {
  "use strict";

  /* --- Mobile navigation ------------------------------------------------ */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("primary-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Close on Escape, and return focus to the toggle.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });

    // Close when a link inside the drawer is followed.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a") && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- Mark the current page in the nav --------------------------------- */

  // Pages also hard-code aria-current, but this keeps things right when the
  // site is served from a subpath (e.g. GitHub Pages project pages).
  var here = window.location.pathname.replace(/\/index\.html$/, "/");
  var links = document.querySelectorAll(".nav__link");

  Array.prototype.forEach.call(links, function (link) {
    var target = link.getAttribute("href");
    if (!target || target.charAt(0) === "#") return;

    var resolved = new URL(target, window.location.href).pathname.replace(
      /\/index\.html$/,
      "/"
    );

    if (resolved === here) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  /* --- Constitution table-of-contents scrollspy ------------------------- */

  var tocLinks = document.querySelectorAll(".toc a[href^='#']");

  if (tocLinks.length) {
    // The anchors are the <h2> headings themselves, not wrapper sections, so
    // an IntersectionObserver would only ever light up during the moment a
    // heading crosses the viewport. Instead, pick the last heading that has
    // scrolled past the top of the reading area — that is the section you are
    // actually in, and it stays correct while reading a long section.
    var entries = [];

    Array.prototype.forEach.call(tocLinks, function (link) {
      var heading = document.getElementById(
        decodeURIComponent(link.getAttribute("href").slice(1))
      );
      if (heading) entries.push({ link: link, heading: heading });
    });

    var current = null;

    function updateToc() {
      // Matches the sticky header height plus a little breathing room.
      var line = 120;
      var activeIndex = -1;

      for (var i = 0; i < entries.length; i++) {
        if (entries[i].heading.getBoundingClientRect().top <= line) {
          activeIndex = i;
        } else {
          break;
        }
      }

      // Once the page is scrolled to the very bottom, the last section wins
      // even if its heading sits below the line.
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2
      ) {
        activeIndex = entries.length - 1;
      }

      var next = activeIndex >= 0 ? entries[activeIndex].link : null;
      if (next === current) return;

      if (current) current.classList.remove("is-active");
      if (next) next.classList.add("is-active");
      current = next;
    }

    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () {
        queued = false;
        updateToc();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateToc();
  }

  /* --- Footer year ------------------------------------------------------ */

  var year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
