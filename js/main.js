document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navContentWrapper = document.querySelector('.nav-content-wrapper');
    const navLinks = document.querySelectorAll('.nav-link');
    // UPDATED: Target the dark mode toggle specifically within the footer
    const darkModeToggle = document.querySelector('footer .dark-mode-toggle');

    // --- Mobile Navigation Toggle ---
    navToggle.addEventListener('click', () => {
        navContentWrapper.classList.toggle('active');
        navToggle.classList.toggle('active'); // For hamburger animation
    });

    // Close mobile nav when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navContentWrapper.classList.contains('active')) {
                navContentWrapper.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- Dark Mode Toggle ---
    // Ensure darkModeToggle exists before adding event listener
    if (darkModeToggle) {
        // Check for user preference or saved setting
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark' || (storedTheme === null && prefersDarkMode)) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Show sun icon in dark mode
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Show moon icon in light mode
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }


    // --- Scroll-Triggered Animations (Intersection Observer) ---
    const animatedElements = document.querySelectorAll('[data-animation]');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay) || 0;
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Active Nav Link based on URL ---
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkFilename = linkHref.split('/').pop();

        if (linkFilename === currentPath || (currentPath === '' && linkFilename === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // --- Optional: Smooth Scroll for Anchor Links (if you add them) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});