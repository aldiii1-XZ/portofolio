/**
 * Interactive Logic for Aldi Yonatan Rusnawan Portfolio 2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Prestasi Explorer (Filter + Modal) ---
    const prestasiModal = document.getElementById('prestasi-modal');
    const prestasiModalTitle = document.getElementById('prestasi-modal-title');
    const prestasiModalSubtitle = document.getElementById('prestasi-modal-subtitle');
    const prestasiModalBody = document.getElementById('prestasi-modal-body');

    const openPrestasiModal = (cardEl) => {
        if (!prestasiModal || !prestasiModalTitle || !prestasiModalSubtitle || !prestasiModalBody) return;

        const title = cardEl.getAttribute('data-modal-title') || '';
        const subtitle = cardEl.getAttribute('data-modal-subtitle') || '';
        const bodyHtml = cardEl.getAttribute('data-modal-body') || '';

        prestasiModalTitle.textContent = title;
        prestasiModalSubtitle.textContent = subtitle;
        prestasiModalBody.innerHTML = bodyHtml;

        prestasiModal.classList.add('open');
        prestasiModal.setAttribute('aria-hidden', 'false');

        const closeBtn = prestasiModal.querySelector('.prestasi-modal-close');
        if (closeBtn) closeBtn.focus();

        document.body.style.overflow = 'hidden';
    };

    const closePrestasiModal = () => {
        if (!prestasiModal) return;
        prestasiModal.classList.remove('open');
        prestasiModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    // Filter bar + Cards click
    const prestasiChips = Array.from(document.querySelectorAll('.prestasi-chip'));
    const prestasiCards = Array.from(document.querySelectorAll('.prestasi-card'));

    const applyPrestasiFilter = (filterValue) => {
        prestasiCards.forEach(card => {
            const cardFilter = card.getAttribute('data-filter') || 'all';
            const shouldShow = filterValue === 'all' ? true : cardFilter === filterValue;

            card.style.display = shouldShow ? '' : 'none';
        });

        prestasiChips.forEach(chip => {
            const active = chip.getAttribute('data-filter') === filterValue;
            chip.classList.toggle('active', active);
            chip.setAttribute('aria-selected', active ? 'true' : 'false');
        });
    };

    // Chip click
    prestasiChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const filterValue = chip.getAttribute('data-filter') || 'all';
            applyPrestasiFilter(filterValue);
        });
    });

    // Card click/open
    prestasiCards.forEach(card => {
        const handler = () => openPrestasiModal(card);
        card.addEventListener('click', handler);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPrestasiModal(card);
            }
        });
    });

    // Close modal handlers
    if (prestasiModal) {
        prestasiModal.addEventListener('click', (e) => {
            const closeTarget = e.target;
            if (closeTarget?.getAttribute && closeTarget.getAttribute('data-close') === 'overlay') {
                closePrestasiModal();
            }
        });

        const closeBtn = prestasiModal.querySelector('.prestasi-modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closePrestasiModal);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && prestasiModal.classList.contains('open')) {
                closePrestasiModal();
            }
        });
    }

    // Initialize default state
    applyPrestasiFilter('all');

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
