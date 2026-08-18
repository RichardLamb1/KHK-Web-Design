/*
  ================================================================
  SHARED FOOTER
  ================================================================
  This is the ONLY file to edit to change the footer (contact
  info, social links, quick links, copyright) across the whole
  site — every page pulls its footer from here instead of
  hand-coding its own copy.

  HOW A PAGE USES THIS FILE
    Put a placeholder exactly where the footer should appear,
    immediately followed by this script (no "defer" — it needs to
    run right away, in place, while the page is still parsing):

        <div id="site-footer"></div>
        <script src="js/footer.js"></script>

    That's it. No other per-page setup. The copyright year is
    computed automatically so it never goes stale.
  ================================================================
*/
(function () {
    "use strict";

    function footerHtml() {
        const year = new Date().getFullYear();
        return (
            '<footer class="footer bg-dark text-white py-5">' +
                '<div class="container-fluid">' +
                    '<div class="row mb-5">' +
                        '<div class="col-lg-4 col-md-6 mb-4 mb-lg-0">' +
                            '<h5 class="fw-bold mb-4"><i class="fas fa-map-marker-alt me-2"></i>Contact Information</h5>' +
                            '<p class="mb-3">' +
                                '<i class="fas fa-building me-2"></i>' +
                                '114 N Orchard St<br>' +
                                '<span class="ms-4">Madison, WI 53715</span>' +
                            '</p>' +
                            '<p class="mb-3">' +
                                '<i class="fas fa-envelope me-2"></i>' +
                                '<a href="mailto:contact@delta.khk.org" class="text-white-50">contact@delta.khk.org</a>' +
                            '</p>' +
                            '<p>' +
                                '<i class="fas fa-phone me-2"></i>' +
                                '<a href="tel:+16082517545" class="text-white-50">+1 (608) 251-7545</a>' +
                            '</p>' +
                        '</div>' +

                        '<div class="col-lg-4 col-md-6 mb-4 mb-lg-0">' +
                            '<h5 class="fw-bold mb-4">Follow Us</h5>' +
                            '<div class="social-links mb-4">' +
                                '<a href="https://www.instagram.com/khkdelta/" class="social-icon" title="Instagram"><i class="fab fa-instagram"></i></a>' +
                                '<a href="https://www.linkedin.com/company/kappa-eta-kappa-delta-chapter/" class="social-icon" title="LinkedIn"><i class="fab fa-linkedin"></i></a>' +
                                '<a href="https://github.com/Kappa-Eta-Kappa-Delta" class="social-icon" title="GitHub"><i class="fab fa-github"></i></a>' +
                            '</div>' +
                            '<p class="small text-white-50">Connect with us on social media for updates and photos from our events.</p>' +
                        '</div>' +

                        '<div class="col-lg-4 col-md-6">' +
                            '<h5 class="fw-bold mb-4">Quick Links</h5>' +
                            '<ul class="list-unstyled">' +
                                '<li class="mb-2"><a href="https://daa.khk.org/" class="text-white-50 text-decoration-none"><i class="fas fa-external-link-alt me-2"></i>Delta Alumni Association</a></li>' +
                                '<li class="mb-2"><a href="https://khk.org/" class="text-white-50 text-decoration-none"><i class="fas fa-external-link-alt me-2"></i>National Organization</a></li>' +
                                '<li><a href="https://www.wisc.edu/" class="text-white-50 text-decoration-none"><i class="fas fa-external-link-alt me-2"></i>University of Wisconsin-Madison</a></li>' +
                            '</ul>' +
                        '</div>' +
                    '</div>' +

                    '<hr class="bg-white-50">' +

                    '<div class="row align-items-center">' +
                        '<div class="col-md-6 text-center text-md-start mb-3 mb-md-0">' +
                            '<p class="mb-0 text-white-50 small">' +
                                '&copy; ' + year + ' Kappa Eta Kappa - Delta Chapter. All rights reserved.' +
                            '</p>' +
                        '</div>' +
                        '<div class="col-md-6 text-center text-md-end">' +
                            '<img src="assets/svg/logo.svg" alt="KHK Logo" class="footer-logo">' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</footer>'
        );
    }

    const placeholder = document.getElementById("site-footer");
    if (!placeholder) {
        console.error("[footer] No #site-footer placeholder found on this page — add <div id=\"site-footer\"></div> right before <script src=\"js/footer.js\"></script>.");
        return;
    }
    placeholder.outerHTML = footerHtml();
})();
