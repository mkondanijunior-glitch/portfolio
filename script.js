/* =========================================================
   MOSES MKONDANI PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   WAIT UNTIL THE PAGE IS READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            const isOpen = navMenu.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );

        });


        /* ---------------------------------------------
           CLOSE MENU AFTER CLICKING A NAVIGATION LINK
           --------------------------------------------- */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            });

        });


        /* ---------------------------------------------
           CLOSE MENU WHEN CLICKING OUTSIDE IT
           --------------------------------------------- */

        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);


            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        });


        /* ---------------------------------------------
           CLOSE MENU WITH ESCAPE KEY
           --------------------------------------------- */

        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                navMenu.classList.contains("active")
            ) {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.focus();

            }

        });

    }


    /* =====================================================
       AUTOMATIC FOOTER YEAR
       ===================================================== */

    const yearElement = document.getElementById("year");

    if (yearElement) {

        yearElement.textContent = new Date().getFullYear();

    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section, .featured-project, .dark-section, .webgis-section, .cv-section"
    );


    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.10,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        /* ---------------------------------------------
           FALLBACK FOR OLDER BROWSERS
           --------------------------------------------- */

        revealElements.forEach(function (element) {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       LEAFLET MAP
       =====================================================

       The current homepage does not contain an element
       with id="map".

       This code therefore checks for the map before
       attempting to initialise Leaflet.

       If you later add:

           <div id="map"></div>

       the code below can initialise it automatically.
       ===================================================== */

    const mapElement = document.getElementById("map");


    if (
        mapElement &&
        typeof L !== "undefined"
    ) {

        try {

            const map = L.map("map").setView(
                [-17.8252, 31.0335],
                6
            );


            /* ---------------------------------------------
               OPENSTREETMAP BASEMAP
               --------------------------------------------- */

            L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {
                    attribution:
                        '&copy; OpenStreetMap contributors',
                    maxZoom: 19
                }
            ).addTo(map);


            /* ---------------------------------------------
               OPTIONAL MAP MARKER
               --------------------------------------------- */

            L.marker([-17.8252, 31.0335])
                .addTo(map)
                .bindPopup(
                    "<strong>Zimbabwe</strong><br>Geospatial Portfolio"
                );


            /* ---------------------------------------------
               FIX MAP SIZE AFTER PAGE LOAD
               --------------------------------------------- */

            setTimeout(function () {

                map.invalidateSize();

            }, 300);


        } catch (error) {

            console.error(
                "Leaflet map could not be initialised:",
                error
            );

        }

    }


    /* =====================================================
       SMOOTH SCROLLING
       ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");


            /* Ignore empty "#" links */

            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /* Update browser URL */

                history.pushState(
                    null,
                    "",
                    targetId
                );

            }

        });

    });


    /* =====================================================
       PREVENT DEAD LINK BEHAVIOUR FOR PLACEHOLDER LINKS
       ===================================================== */

    const placeholderLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    placeholderLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

        });

    });


});
