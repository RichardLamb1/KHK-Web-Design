/*
  Renders a single post page (post.html?post=some-filename), and
  wires up the back button.
*/
(function () {
    "use strict";

    function getSlugFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get("post");
    }

    document.addEventListener("DOMContentLoaded", function () {
        const backButton = document.getElementById("backButton");
        if (!backButton) return;
        backButton.addEventListener("click", function (e) {
            // If there's somewhere to go back to (i.e. they came from
            // the news page), use normal browser back so scroll
            // position etc. is preserved. Otherwise fall back to the
            // link's own href (newspage.html) — e.g. if this post was
            // opened directly from a shared link.
            if (window.history.length > 1) {
                e.preventDefault();
                window.history.back();
            }
        });
    });

    KHKPosts.onReady(function () {
        document.getElementById("newsLoading").classList.add("d-none");

        const slug = getSlugFromUrl();
        const post = slug ? KHKPosts.findBySlug(slug) : null;

        if (!post) {
            document.getElementById("postNotFound").classList.remove("d-none");
            return;
        }

        document.title = post.title + " - KHK News | Kappa Eta Kappa | Delta Chapter";

        document.getElementById("postContent").classList.remove("d-none");
        document.getElementById("postImage").src = post.image;
        document.getElementById("postImage").alt = post.title;
        document.getElementById("postTitle").textContent = post.title;
        document.getElementById("postDate").textContent = KHKPosts.formatDate(post.date);
        document.getElementById("postBody").innerHTML = KHKPosts.bodyHtml(post.body);
        document.getElementById("postAuthor").textContent = "Written by " + post.author;
    });
})();
