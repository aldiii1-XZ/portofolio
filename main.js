/**
 * Interactive Logic for Aldi Yonatan Rusnawan Portfolio 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const sidebar = document.getElementById('sidebar');

    if (navToggle && sidebar) {
        navToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });
    }

    // Close sidebar when clicking a link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024 && sidebar) {
                sidebar.classList.remove('open');
            }
        });
    });

    // --- Dynamic Social Cards ---
    const socials = [
        {
            name: "Instagram",
            handle: "@aldiyonatan._",
            img: "https://unavatar.io/instagram/aldiyonatan._",
            url: "https://instagram.com/aldiyonatan._"
        },
        {
            name: "WhatsApp",
            handle: "+62 895 3864 56868",
            img: "assets/profile.png",
            url: "https://wa.me/62895386456868"
        },
        {
            name: "Facebook",
            handle: "Aldi Yonatan Rusnawan",
            img: "https://unavatar.io/facebook/aldi.yonatan.10",
            url: "https://www.facebook.com/aldi.yonatan.10"
        },
        {
            name: "TikTok",
            handle: "@aldii1_0",
            img: "https://unavatar.io/tiktok/aldii1_0",
            url: "https://www.tiktok.com/@aldii1_0"
        }
    ];

    const socialGrid = document.getElementById('social-grid');

    if (socialGrid) {
        socials.forEach(social => {
            const card = document.createElement('a');
            card.href = social.url;
            card.target = "_blank";
            card.rel = "noopener noreferrer";
            card.className = 'social-card-2026';
            card.innerHTML = `
                <div class="social-card-blur" style="background-image: url('${social.img}'), url('assets/profile.png')"></div>
                <div class="social-card-content">
                    <div class="social-info">
                        <div class="social-img-wrap">
                            <img src="${social.img}" alt="${social.name}" onerror="this.onerror=null;this.src='assets/profile.png';">
                        </div>
                        <div>
                            <h4 class="social-name">${social.name}</h4>
                            <p class="social-handle">${social.handle}</p>
                        </div>
                    </div>
                    <div class="social-arrow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </div>
                </div>
            `;
            socialGrid.appendChild(card);
        });
    }

    // --- Scroll Animations & Active State ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update Nav Active State
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
                });

                // Reveal Animation
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Initial state for animation
        section.style.opacity = "0";
        section.style.transform = "translateY(40px)";
        section.style.transition = "all 1s cubic-bezier(0.22, 1, 0.36, 1)";
        observer.observe(section);
    });

    // --- Smooth Scroll (Extra check) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Fix: Only handle valid anchor selectors, ignore single '#'
            if (href !== "#" && href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // --- Cursor Glow Effect (Optional 2026 Polish) ---
    const createCursorGlow = () => {
        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        // Add CSS for glow dynamically if not in style.css
        const style = document.createElement('style');
        style.textContent = `
            .cursor-glow {
                position: fixed;
                width: 400px;
                height: 400px;
                background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                transform: translate(-50%, -50%);
                transition: opacity 0.3s ease;
                opacity: 0;
            }
            body:hover .cursor-glow { opacity: 1; }
        `;
        document.head.appendChild(style);

        window.addEventListener('mousemove', (e) => {
            glow.style.left = e.clientX + 'px';
            glow.style.top = e.clientY + 'px';
        });
    };

    createCursorGlow();
});
