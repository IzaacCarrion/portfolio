// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.project-showcase, .project-item, .about-content, .skill-group, .contact-card, .contact-section');
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(section);
    });
    
    /* Typing animation for .hero-role */
    const roles = ["programmer", "student", "human"];
    const typedEl = document.querySelector('.hero-role .typed');
    const cursorEl = document.querySelector('.hero-role .cursor');

    if (typedEl && cursorEl) {
        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;
        const TYPING_SPEED = 90;    // ms per char
        const DELETING_SPEED = 50;  // ms per char when deleting
        const PAUSE_AFTER = 900;    // pause after typing a word (ms)
        const PAUSE_BEFORE = 300;   // pause before typing next word (ms)

        function tick() {
            const current = roles[roleIndex];

            if (!deleting) {
                // typing
                charIndex++;
                typedEl.textContent = current.slice(0, charIndex);

                if (charIndex === current.length) {
                    // finished typing — pause, then start deleting (no pulse)
                    setTimeout(() => {
                        deleting = true;
                        setTimeout(tick, DELETING_SPEED);
                    }, PAUSE_AFTER);
                    return;
                }
                setTimeout(tick, TYPING_SPEED);
            } else {
                // deleting
                charIndex--;
                typedEl.textContent = current.slice(0, charIndex);

                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(tick, PAUSE_BEFORE);
                    return;
                }
                setTimeout(tick, DELETING_SPEED);
            }
        }

        // Kickoff after small delay so page load feels natural
        setTimeout(tick, 500);
    }
});

/* Contact form handling: validate and open mailto with form contents */
/* Contact form removed — contact methods now use direct links. */

