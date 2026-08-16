/*
  ================================================================
  MEMBERS ENGINE
  ================================================================
  Reads window.KHK_MEMBERS_DATA (js/members-data.js) and builds the
  Executive Board section + regular member grid on
  members-templated.html — every member card comes from this one
  template, instead of being hand-written HTML per person.

  You should NOT need to edit this file to add/edit/remove a member
  — see js/members-data.js for that.

  This does not depend on js/flipcards.js — that file exists to
  synthesize a generic back face for the hand-written cards on
  members.html; this page renders real two-sided cards directly
  from data, so it wires up its own (smaller) flip/hover logic.
  ================================================================
*/
(function () {
    "use strict";

    // Order here is also the left-to-right display order of the
    // Executive Board section, not just an allow-list.
    const EXEC_POSITIONS = [
        "President", "Vice President", "Treasurer", "Secretary",
        "Pledge Trainer", "Social Chair", "Publicity Chair", "Academic Chair"
    ];

    // Used whenever a member doesn't have a casual photo yet.
    const CASUAL_PHOTO_FALLBACK = "assets/img/sillydog.jpg";

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    // Builds one <a class="social-btn"> icon, or "" if the link is missing.
    function iconLink(url, faClass, title) {
        if (!url) return "";
        return (
            '<a href="' + escapeHtml(url) + '" class="social-btn" title="' + escapeHtml(title) + '" target="_blank" rel="noopener">' +
                '<i class="' + faClass + '"></i>' +
            "</a>"
        );
    }

    function frontFaceHtml(member) {
        const links = iconLink(member.linkedin, "fab fa-linkedin", "LinkedIn") +
                      iconLink(member.resume, "fas fa-file-lines", "Resume");

        const positionLine = member.positionHeld
            ? '<p class="member-position">' + escapeHtml(member.positionHeld) + "</p>"
            : "";

        return (
            '<div class="member-image-wrapper">' +
                '<img src="' + escapeHtml(member.photo) + '" alt="' + escapeHtml(member.name) + '" class="member-image">' +
                (links ? '<div class="member-overlay"><div class="member-social">' + links + "</div></div>" : "") +
            "</div>" +
            '<div class="member-info' + (member.positionHeld ? " text-center" : "") + '">' +
                '<h3 class="member-name">' + escapeHtml(member.name) + "</h3>" +
                positionLine +
                '<p class="member-year-major">' + escapeHtml(member.year) + " &middot; " + escapeHtml(member.major) + "</p>" +
                '<p class="member-internship">' + escapeHtml(member.internship) + "</p>" +
            "</div>"
        );
    }

    function backFaceHtml(member) {
        const links = iconLink(member.instagram, "fab fa-instagram", "Instagram") +
                      iconLink(member.snapchat, "fab fa-snapchat", "Snapchat");
        const casualPhoto = member.casualPhoto || CASUAL_PHOTO_FALLBACK;

        return (
            '<div class="member-back-image-wrapper">' +
                '<img src="' + escapeHtml(casualPhoto) + '" alt="' + escapeHtml(member.name) + ' (casual photo)" class="member-back-image">' +
                (links ? '<div class="member-back-overlay"><div class="member-social">' + links + "</div></div>" : "") +
            "</div>" +
            '<h3 class="member-back-title">' + escapeHtml(member.name) + "</h3>" +
            '<p class="member-back-org">' + escapeHtml(member.studentOrg) + "</p>" +
            '<p class="member-back-blurb">' + escapeHtml(member.blurb) + "</p>" +
            '<p class="member-back-meta">Pledged ' + escapeHtml(member.pledgeSemester) + "</p>"
        );
    }

    function cardHtml(member, isExec) {
        return (
            '<div class="member-card' + (isExec ? " executive-board-card h-100" : "") + '" data-member-id="' + escapeHtml(member.id) + '">' +
                '<div class="member-card-inner">' +
                    '<div class="member-card-face member-card-front">' + frontFaceHtml(member) + "</div>" +
                    '<div class="member-card-face member-card-back" aria-hidden="true">' + backFaceHtml(member) + "</div>" +
                "</div>" +
            "</div>"
        );
    }

    // The only statuses that actually mean something to the engine — anything
    // else (including a missing status) is treated as active, see below.
    const KNOWN_STATUSES = ["active", "alumni", "inactive"];

    function render() {
        const data = Array.isArray(window.KHK_MEMBERS_DATA) ? window.KHK_MEMBERS_DATA : [];

        data.forEach(function (m) {
            if (!m.name || !m.photo || !m.pledgeSemester) {
                console.error("[members] An entry in js/members-data.js is missing a required field (name/photo/pledgeSemester):", m);
            }
            if (m.status && !KNOWN_STATUSES.includes(m.status)) {
                console.error('[members] "' + m.name + '" in js/members-data.js has an unrecognized status ("' + m.status + '") — expected "active", "alumni", or "inactive". Treating them as active for now.');
            }
        });

        // Only currently-active members are shown anywhere on the page. A
        // missing status fails open (treated as active) so forgetting to set
        // it on a new entry doesn't silently make that person invisible —
        // the console.error above still flags it so it gets noticed.
        const visibleMembers = data.filter(function (m) { return !m.status || m.status === "active"; });

        const execMembers = visibleMembers
            .filter(function (m) { return EXEC_POSITIONS.includes(m.positionHeld); })
            .sort(function (a, b) { return EXEC_POSITIONS.indexOf(a.positionHeld) - EXEC_POSITIONS.indexOf(b.positionHeld); });

        // Sorted by id (which is always a "last-first" slug, see
        // js/members-data.js) rather than relying on file order — so a new
        // entry can be pasted anywhere in that file (even always at the very
        // bottom) and still show up in the right alphabetical spot here.
        const regularMembers = visibleMembers
            .filter(function (m) { return !EXEC_POSITIONS.includes(m.positionHeld); })
            .sort(function (a, b) { return a.id.localeCompare(b.id); });

        const execContainer = document.getElementById("executiveBoardGrid");
        const gridContainer = document.getElementById("membersGrid");

        if (execContainer) {
            execContainer.innerHTML = execMembers.map(function (m) {
                return '<div class="col-sm-6 col-lg-3">' + cardHtml(m, true) + "</div>";
            }).join("");
        }

        if (gridContainer) {
            gridContainer.innerHTML = regularMembers.map(function (m) {
                return cardHtml(m, false);
            }).join("");
        }

        initFlipInteractions();
    }

    // ---- Flip interaction (click/keyboard), same UX as js/flipcards.js ----

    function toggleFlip(card) {
        const flipped = card.classList.toggle("is-flipped");
        card.setAttribute("aria-pressed", flipped ? "true" : "false");
    }

    function initFlipInteractions() {
        const cards = document.querySelectorAll(".member-card");

        cards.forEach(function (card) {
            card.classList.add("flip-enabled");
            card.setAttribute("tabindex", "0");
            card.setAttribute("role", "button");
            card.setAttribute("aria-pressed", "false");

            card.addEventListener("click", function (event) {
                if (event.target.closest("a, button")) return; // let links/buttons work normally
                toggleFlip(card);
            });

            card.addEventListener("keydown", function (event) {
                if (event.key !== "Enter" && event.key !== " ") return;
                if (event.target.closest("a, button")) return;
                event.preventDefault();
                toggleFlip(card);
            });
        });

        const flipAllBtn = document.getElementById("flipAllMembersBtn");
        if (flipAllBtn && !flipAllBtn.dataset.wired) {
            flipAllBtn.dataset.wired = "true";
            flipAllBtn.addEventListener("click", function () {
                const shouldFlip = !document.querySelector(".member-card.is-flipped");
                document.querySelectorAll(".member-card").forEach(function (card) {
                    card.classList.toggle("is-flipped", shouldFlip);
                    card.setAttribute("aria-pressed", shouldFlip ? "true" : "false");
                });
                flipAllBtn.innerHTML = shouldFlip
                    ? '<i class="fas fa-clone me-2"></i><span>Reset</span>'
                    : '<i class="fas fa-clone me-2"></i><span>Flip All</span>';
                flipAllBtn.setAttribute("aria-pressed", shouldFlip ? "true" : "false");
            });
        }
    }

    // ---- Floating "Flip All" button: only shown once the Executive
    // Board section (and beyond) is reached, hidden while still up in
    // the header/hero area. ----

    function initFlipAllVisibility() {
        const btn = document.getElementById("flipAllMembersBtn");
        const header = document.querySelector(".members-header");
        if (!btn || !header) return;

        if (!("IntersectionObserver" in window)) {
            // No IntersectionObserver support — fail open, keep it visible.
            btn.classList.add("is-visible");
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            const headerVisible = entries[0].isIntersecting;
            btn.classList.toggle("is-visible", !headerVisible);
        });
        observer.observe(header);
    }

    document.addEventListener("DOMContentLoaded", function () {
        render();
        initFlipAllVisibility();
    });
})();
