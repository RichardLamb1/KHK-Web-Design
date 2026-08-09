/*
  Renders the main news landing page (newspage.html):
  the single latest post as a big featured card on the left, and
  the next few posts as a compact list on the right.

  This reads from js/posts-engine.js — it does not know anything
  about individual post files itself.
*/
(function () {
    "use strict";

    const LIST_COUNT = 4;

    function renderFeatured(post) {
        const container = document.getElementById("featuredPost");
        const excerpt = KHKPosts.excerpt(post.body, 220);
        container.innerHTML =
            '<a class="featured-post" href="' + KHKPosts.postUrl(post.slug) + '">' +
                '<img class="featured-post-image" src="' + KHKPosts.escapeHtml(post.image) + '" alt="' + KHKPosts.escapeHtml(post.title) + '">' +
                '<div class="featured-post-body">' +
                    '<span class="post-date">' + KHKPosts.formatDate(post.date) + '</span>' +
                    '<h2 class="featured-post-title">' + KHKPosts.escapeHtml(post.title) + '</h2>' +
                    '<p class="featured-post-excerpt">' + KHKPosts.escapeHtml(excerpt) + '</p>' +
                '</div>' +
            '</a>';
    }

    function renderList(posts) {
        const container = document.getElementById("postRowList");
        container.innerHTML = posts.map(function (post) {
            return (
                '<a class="post-row" href="' + KHKPosts.postUrl(post.slug) + '">' +
                    '<img class="post-row-image" src="' + KHKPosts.escapeHtml(post.image) + '" alt="' + KHKPosts.escapeHtml(post.title) + '">' +
                    '<div class="post-row-content">' +
                        '<span class="post-date">' + KHKPosts.formatDate(post.date) + '</span>' +
                        '<h3 class="post-row-title">' + KHKPosts.escapeHtml(post.title) + '</h3>' +
                    '</div>' +
                '</a>'
            );
        }).join("");
    }

    KHKPosts.onReady(function (posts) {
        document.getElementById("newsLoading").classList.add("d-none");

        if (!posts.length) {
            document.getElementById("newsEmpty").classList.remove("d-none");
            return;
        }

        document.getElementById("newsContent").classList.remove("d-none");
        renderFeatured(posts[0]);
        renderList(posts.slice(1, 1 + LIST_COUNT));
    });
})();
