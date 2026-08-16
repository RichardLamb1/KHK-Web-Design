/*
  ================================================================
  SHARED NAVBAR
  ================================================================
  This is the ONLY file to edit to change a nav link (add/remove/
  rename/reorder) across the whole site — every page pulls its
  navbar from here instead of hand-coding its own copy.

  HOW A PAGE USES THIS FILE
    Put a placeholder exactly where the navbar should appear,
    immediately followed by this script (no "defer" — it needs to
    run right away, in place, while the page is still parsing):

        <div id="site-navbar"></div>
        <script src="js/navbar.js"></script>

    That's it. No other per-page setup — this script figures out
    which page it's on by itself (see below) and builds the right
    navbar automatically: which link is "active", and whether the
    Home link/logo should use a same-page "#home" jump (only on
    index.html — see note below) or a real "index.html" link.

  HOW TO ADD/REMOVE/RENAME A LINK
    Edit the NAV_LINKS list below. Each entry is:
      label   - the text shown
      file    - the page it links to
      anchor  - (optional) an in-page section id on index.html this
                link should jump to. Only "Home" uses this today.
      aliases - (optional) other filenames that should also count
                as this link's page for highlighting "active" (e.g.
                News stays highlighted on the individual post page).

  WHY THE HOME LINK IS SPECIAL
    js/main.js has smooth-scroll + scroll-highlight behavior, but it
    only works on index.html (that's the only page with matching
    section ids like #home/#alumni), and it only looks at links
    whose href literally starts with "#". So the Home link (and the
    logo) uses a bare "#home" href ONLY when already on index.html,
    and a real "index.html" / "index.html#home" href everywhere
    else. Every other link is always just a plain filename.
  ================================================================
*/
(function () {
    "use strict";

    const NAV_LINKS = [
        { label: "Home", file: "index.html", anchor: "home" },
        { label: "About Us", file: "about.html" },
        { label: "Rush Information", file: "rush.html" },
        { label: "Members", file: "members.html" },
        { label: "Members (Preview)", file: "members-templated.html" },
        { label: "News", file: "newspage.html", aliases: ["all-posts.html", "post.html"] }
    ];

    // The current page's filename, e.g. "about.html". An empty path
    // (site root, or opened as a bare folder) counts as index.html.
    const currentFile = (function () {
        const segments = window.location.pathname.split("/");
        const last = segments[segments.length - 1];
        return last && last.length ? last : "index.html";
    })();
    const isHome = currentFile === "index.html";

    function linkHref(link) {
        if (link.anchor) {
            return isHome ? "#" + link.anchor : link.file + "#" + link.anchor;
        }
        return link.file;
    }

    function isActive(link) {
        if (link.file === currentFile) return true;
        return Array.isArray(link.aliases) && link.aliases.includes(currentFile);
    }

    function navItemHtml(link) {
        const activeClass = isActive(link) ? " active" : "";
        return (
            '<li class="nav-item">' +
                '<a class="nav-link' + activeClass + '" href="' + linkHref(link) + '">' + link.label + "</a>" +
            "</li>"
        );
    }

    function navbarHtml() {
        const brandHref = isHome ? "#home" : "index.html";
        return (
            '<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">' +
                '<div class="container-fluid">' +
                    '<a class="navbar-brand" href="' + brandHref + '">' +
                        '<img src="assets/svg/logo.svg" alt="KHK Logo" class="navbar-logo">' +
                        '<span class="ms-2">KHK Delta Chapter</span>' +
                    "</a>" +
                    '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">' +
                        '<span class="navbar-toggler-icon"></span>' +
                    "</button>" +
                    '<div class="collapse navbar-collapse" id="navbarNav">' +
                        '<ul class="navbar-nav ms-auto">' +
                            NAV_LINKS.map(navItemHtml).join("") +
                        "</ul>" +
                    "</div>" +
                "</div>" +
            "</nav>"
        );
    }

    const placeholder = document.getElementById("site-navbar");
    if (!placeholder) {
        console.error("[navbar] No #site-navbar placeholder found on this page — add <div id=\"site-navbar\"></div> right before <script src=\"js/navbar.js\"></script>.");
        return;
    }
    placeholder.outerHTML = navbarHtml();
})();
