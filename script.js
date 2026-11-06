document.addEventListener("DOMContentLoaded", () => {
    const revealItems = document.querySelectorAll(".fade-in");

    document.body.classList.add("js-ready");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("appear");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });

        revealItems.forEach((item) => revealObserver.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("appear"));
    }

    const menuToggle = document.getElementById("mobileMenuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        };

        menuToggle.addEventListener("click", () => {
            const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
            navLinks.classList.toggle("active", !isOpen);
            menuToggle.setAttribute("aria-expanded", String(!isOpen));
            menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 780) closeMenu();
        });
    }

    const bookingForm = document.getElementById("bookingForm");
    const successMessage = document.getElementById("formSuccess");
    const preferredDate = document.getElementById("prefDate");

    if (preferredDate) {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        preferredDate.min = now.toISOString().slice(0, 16);
    }

    if (bookingForm && successMessage) {
        bookingForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!bookingForm.reportValidity()) return;

            bookingForm.reset();
            successMessage.hidden = false;
        });

        bookingForm.addEventListener("input", () => {
            successMessage.hidden = true;
        });

        bookingForm.addEventListener("change", () => {
            successMessage.hidden = true;
        });
    }

    const header = document.getElementById("navbar");
    const updateHeaderShadow = () => {
        if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    updateHeaderShadow();
    window.addEventListener("scroll", updateHeaderShadow, { passive: true });
});
