/*
  ================================================================
  POSTS ENGINE
  ================================================================
  This file does the actual work of reading the posts/ directory
  and making the data available to newspage.html, all-posts.html,
  and post.html.

  You should NOT need to edit this file to add/edit/remove a post —
  see js/posts-manifest.js and posts/README.md for that.

  How it works, in plain terms:
    1. js/posts-manifest.js lists the post filenames to load.
    2. This file loads each one (as a <script> tag, so it works
       whether the site is opened directly from a folder or hosted
       on a real server — no "fetch" / server required).
    3. Each post file calls addPost({...}) with its own info. This
       engine tags it with a "slug" (its filename, used to build the
       post's URL) and stores it.
    4. Once every post file has loaded, posts are sorted newest-first
       and everyone listening via KHKPosts.onReady(...) is notified.
  ================================================================
*/
(function () {
    "use strict";

    const POSTS = [];
    let currentSlug = null;
    let ready = false;
    const readyCallbacks = [];

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    // Turns "2026-08-10" into "August 10, 2026"
    function formatDate(dateStr) {
        const parts = String(dateStr).split("-").map(Number);
        if (parts.length !== 3 || parts.some(isNaN)) return String(dateStr);
        const d = new Date(parts[0], parts[1] - 1, parts[2]);
        return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }

    // Splits a post body into paragraphs on blank lines
    function paragraphs(body) {
        return String(body || "")
            .trim()
            .split(/\n\s*\n/)
            .map(function (p) { return p.trim(); })
            .filter(Boolean);
    }

    // Renders a post body (plain text, blank line = new paragraph) as safe HTML.
    // Line breaks *within* a paragraph are just how the post file happened to be
    // wrapped in the editor, not intentional breaks — collapse them to single
    // spaces so the browser reflows each paragraph to fill the available width.
    function bodyHtml(body) {
        return paragraphs(body)
            .map(function (p) {
                const flat = p.replace(/\s+/g, " ").trim();
                return "<p>" + escapeHtml(flat) + "</p>";
            })
            .join("\n");
    }

    // Short preview of the first paragraph, used on cards/rows
    function excerpt(body, maxLen) {
        maxLen = maxLen || 160;
        const text = paragraphs(body)[0] || "";
        const flat = text.replace(/\s+/g, " ").trim();
        if (flat.length <= maxLen) return flat;
        const cut = flat.slice(0, maxLen);
        const lastSpace = cut.lastIndexOf(" ");
        return cut.slice(0, lastSpace > 0 ? lastSpace : maxLen).trim() + "…";
    }

    function postUrl(slug) {
        return "post.html?post=" + encodeURIComponent(slug);
    }

    // Called by each posts/*.js file — this is the only function post
    // authors need to know about.
    window.addPost = function (data) {
        if (!currentSlug) {
            console.error(
                "[posts] addPost() was called outside of the post loader. " +
                "Post files are loaded automatically by js/posts-engine.js — " +
                "make sure your file is listed in js/posts-manifest.js instead of " +
                "adding your own <script> tag for it."
            );
            return;
        }
        if (!data || !data.title || !data.date || !data.image) {
            console.error("[posts] The post in posts/" + currentSlug + ".js is missing a required field (title, date, or image).");
        }
        POSTS.push(Object.assign({ slug: currentSlug }, data));
    };

    function loadPostFile(filename) {
        return new Promise(function (resolve) {
            currentSlug = filename.replace(/\.js$/i, "");
            const script = document.createElement("script");
            script.src = "posts/" + filename;
            script.onload = function () {
                currentSlug = null;
                resolve();
            };
            script.onerror = function () {
                console.error("[posts] Could not load posts/" + filename + " — check that this filename in js/posts-manifest.js matches a real file in the posts/ folder.");
                currentSlug = null;
                resolve();
            };
            document.head.appendChild(script);
        });
    }

    async function loadAllPosts() {
        const files = window.POST_FILES || [];
        for (const filename of files) {
            await loadPostFile(filename);
        }
        POSTS.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });
        ready = true;
        readyCallbacks.forEach(function (cb) { cb(POSTS); });
        document.dispatchEvent(new CustomEvent("posts:ready", { detail: POSTS }));
    }

    // Public API used by newspage.html, all-posts.html, and post.html
    window.KHKPosts = {
        // cb(posts) runs once all posts are loaded & sorted newest-first
        // (runs immediately if loading already finished)
        onReady: function (cb) {
            if (ready) cb(POSTS.slice());
            else readyCallbacks.push(cb);
        },
        findBySlug: function (slug) {
            return POSTS.filter(function (p) { return p.slug === slug; })[0] || null;
        },
        formatDate: formatDate,
        excerpt: excerpt,
        bodyHtml: bodyHtml,
        escapeHtml: escapeHtml,
        postUrl: postUrl
    };

    loadAllPosts();
})();
