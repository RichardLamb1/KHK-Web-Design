/*
  Renders the "View All" news page (all-posts.html): every post,
  each as its own full-width row, newest at the top.
*/
(function () {
    "use strict";

    function renderAll(posts) {
        const container = document.getElementById("allPostsList");
        container.innerHTML = posts.map(function (post) {
            return (
                '<div class="all-posts-row">' +
                    '<img class="all-posts-row-image" src="' + KHKPosts.escapeHtml(post.image) + '" alt="' + KHKPosts.escapeHtml(post.title) + '">' +
                    '<div class="all-posts-row-content">' +
                        '<span class="post-date">' + KHKPosts.formatDate(post.date) + '</span>' +
                        '<h3 class="all-posts-row-title">' + KHKPosts.escapeHtml(post.title) + '</h3>' +
                    '</div>' +
                    '<a class="btn btn-primary catch-up-btn" href="' + KHKPosts.postUrl(post.slug) + '">Catch Up <i class="fas fa-arrow-right ms-1"></i></a>' +
                '</div>'
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
        renderAll(posts);
    });
})();
