document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    if (navItems.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offset = 70; // Change this value if your nav height changes
                window.scrollTo({
                    top: targetElement.offsetTop - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;

    if (testimonials.length > 0 && prevBtn && nextBtn) {
        function showTestimonial(index) {
            testimonials.forEach(testimonial => {
                testimonial.classList.remove('active');
            });
            testimonials[index].classList.add('active');
        }

        prevBtn.addEventListener('click', () => {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonials.length - 1;
            }
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener('click', () => {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        });

        // Initialize first testimonial
        showTestimonial(currentTestimonial);
    }

    // Animated Counter for Statistics
    const statItems = document.querySelectorAll('.stat-item h3');
    const speed = 200; // Lower is faster

    function animateCounters() {
        statItems.forEach(item => {
            const target = +item.getAttribute('data-count');
            let count = +item.innerText;

            if (!isNaN(target) && target > 0) {  // Check if target is a valid number
                const increment = target / speed;
                count = Math.ceil(count + increment);
                item.innerText = count;

                if (count < target) {
                    setTimeout(animateCounters, 10);  // Recurse only if target is not reached
                } else {
                    item.innerText = target; // Ensure it reaches the target number
                }
            }
        });
    }

    // Initialize counter animation if any stat items exist
    if (statItems.length > 0) {
        animateCounters();
    }
});