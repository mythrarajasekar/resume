// Reveal Animation on Scroll
const reveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    const windowHeight = window.innerHeight;
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
};

// Typing Effect
const typeEffect = () => {
    const typingText = document.getElementById('typing-text');
    if (!typingText) return;
    const phrases = ["Systems.", "Workflows.", "Solutions.", "Bots."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let speed = 150;

    const type = () => {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            speed = 80;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            speed = 150;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            speed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(type, speed);
    };
    
    type();
};

// Custom Cursor Logic
const initCursor = () => {
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    
    if (!dot || !outline) return;

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Smooth outline follow
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll('a, button, .view-casestudy, .skill-icon-tile');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.classList.add('cursor-hover');
            dot.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            outline.classList.remove('cursor-hover');
            dot.classList.remove('cursor-hover');
        });
    });
};

// Magnetic Interaction
const initMagnetic = () => {
    const magnets = document.querySelectorAll('.magnetic');
    
    magnets.forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            const rect = magnet.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        magnet.addEventListener('mouseleave', () => {
            magnet.style.transform = `translate(0, 0)`;
        });
    });
};

// Mouse move effect for cards (Glow)
const cardGlow = () => {
    document.querySelectorAll('.glass, .bento-card, .skill-icon-tile').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
};

// Horizontal Scroll on Vertical Scroll for Projects
const initProjectScroll = () => {
    const wrapper = document.querySelector('.project-scroll-wrapper');
    const track = document.getElementById('projectFlow');
    const prevBtn = document.getElementById('prevProject');
    const nextBtn = document.getElementById('nextProject');
    
    if (!wrapper || !track) return;

    const handleScroll = () => {
        const wrapperRect = wrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height;
        const windowHeight = window.innerHeight;

        if (wrapperTop <= 0 && -wrapperTop <= (wrapperHeight - windowHeight)) {
            let progress = -wrapperTop / (wrapperHeight - windowHeight);
            const maxTranslate = track.scrollWidth - window.innerWidth;
            track.style.transform = `translateX(${-progress * maxTranslate}px)`;
        } else if (-wrapperTop > (wrapperHeight - windowHeight)) {
            const maxTranslate = track.scrollWidth - window.innerWidth;
            track.style.transform = `translateX(${-maxTranslate}px)`;
        }
    };

    // Make buttons scroll the page vertically to reveal next card horizontally
    // Approximately 1/4 of total height per "click" for smooth transition
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            const scrollDistance = wrapper.offsetHeight / 6;
            window.scrollBy({ top: -scrollDistance, behavior: 'smooth' });
        });
        nextBtn.addEventListener('click', () => {
            const scrollDistance = wrapper.offsetHeight / 6;
            window.scrollBy({ top: scrollDistance, behavior: 'smooth' });
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
};

// Case Study Data Object
const projectDetails = {
    quiz: {
        title: "Quiz Application",
        category: "MERN Stack",
        overview: "Developed a full-stack quiz platform inspired by interactive learning systems where users can join quizzes, answer timed questions, and view scores dynamically.",
        challenge: "Managing real-time quiz flow, validating answers correctly, and maintaining smooth state handling between frontend and backend.",
        solution: "Built a MERN architecture with React for UI, Node/Express for APIs, and MongoDB for storing quiz data and scores. Implemented controlled state management and validation logic for accurate evaluation.",
        github: "https://github.com/mythrarajasekar/MY-QUIZ"
    },
    'id-gen': {
        title: "Employee ID Generation",
        category: "UiPath RPA",
        overview: "Automated employee ID creation by extracting user data and generating formatted ID cards without manual intervention.",
        challenge: "Manual ID creation was repetitive, error-prone, and time-consuming.",
        solution: "Designed a UiPath workflow using structured data input, image placement automation, and batch processing to generate IDs efficiently.",
        github: "https://github.com/mythrarajasekar/EMPLOYEE-ID-CARD-GENERATION"
    },
    'email-bot': {
        title: "Email Auto-Responder Bot",
        category: "UiPath",
        overview: "Built an RPA bot that reads incoming emails, extracts relevant information, and sends automated replies based on rules.",
        challenge: "Handling unstructured email content and ensuring correct response mapping.",
        solution: "Used UiPath activities with conditional workflows and templates to interpret messages and trigger appropriate responses.",
        github: "#"
    },
    investment: {
        title: "Investment Management",
        category: "Java + MySQL",
        overview: "Created a desktop-based system to simulate share trading, track investments, and manage transaction records.",
        challenge: "Designing relational database structures and ensuring accurate financial calculations.",
        solution: "Implemented Java OOP modules connected to MySQL for CRUD operations, portfolio tracking, and transaction handling.",
        github: "https://github.com/mythrarajasekar/investment_management_system"
    },
    airways: {
        title: "Airways Reservation",
        category: "Java",
        overview: "Developed an airline booking system supporting admin management and customer reservation features.",
        challenge: "Coordinating multiple user roles and ensuring data consistency during bookings.",
        solution: "Applied Object-Oriented Programming concepts to modularize booking, cancellation, and record management processes.",
        github: "https://github.com/mythrarajasekar/AIRWAYS-RESERVARION-SYSTEM"
    },
    certificate: {
        title: "Certificate Automation",
        category: "UiPath",
        overview: "Automated bulk certificate creation for events and training programs.",
        challenge: "Generating hundreds of certificates manually caused delays and formatting errors.",
        solution: "Built a UiPath automation pipeline that reads participant data and dynamically generates formatted certificates.",
        github: "#"
    },
    currency: {
        title: "Currency Converter Automation",
        category: "UiPath",
        overview: "Automated real-time currency conversion using external data sources.",
        challenge: "Fetching updated exchange values and integrating them into workflows reliably.",
        solution: "Used UiPath web automation and data extraction to calculate conversions dynamically.",
        github: "https://github.com/mythrarajasekar/CURRENCY-CONVERTOR-BOT"
    },
    password: {
        title: "Password Generator Bot",
        category: "UiPath",
        overview: "Created a bot that generates secure, randomized passwords for user accounts.",
        challenge: "Ensuring strong password generation while maintaining usability.",
        solution: "Implemented logic-based randomization and rule-based generation inside UiPath workflows.",
        github: "https://github.com/mythrarajasekar/PASSWORD-GENERATOR-BOT"
    },
    screenshot: {
        title: "Screenshot Automation Bot",
        category: "UiPath",
        overview: "Developed an automation bot to capture screenshots at scheduled intervals for monitoring and documentation.",
        challenge: "Ensuring timing accuracy and structured file storage.",
        solution: "Used UiPath scheduling and file-handling automation to capture and organize screenshots automatically.",
        github: "https://github.com/mythrarajasekar/SCREENSHOT-BOT"
    },
    tictactoe: {
        title: "Tic-Tac-Toe Game",
        category: "C",
        overview: "Console-based implementation of the classic Tic-Tac-Toe game using arrays and logical decision-making.",
        challenge: "Handling game state validation and win-condition logic.",
        solution: "Designed structured control flow with condition checks and array-based board management.",
        github: "https://github.com/mythrarajasekar/tic-tac-toe"
    },
    hangman: {
        title: "Hangman Game",
        category: "Java & C",
        overview: "Word guessing game demonstrating string handling and iterative logic.",
        challenge: "Managing user input, hidden word logic, and attempt tracking.",
        solution: "Implemented modular logic using loops, conditions, and string manipulation.",
        github: "https://github.com/mythrarajasekar/Hangman-Game"
    },
    bitcoin: {
        title: "Bitcoin Value Predictor",
        category: "PFS",
        overview: "Developed a predictive analytics system to forecast Bitcoin price trends using historical cryptocurrency data and machine learning concepts.",
        challenge: "Cryptocurrency prices are highly volatile and noisy, making it identify patterns.",
        solution: "Performed data preprocessing, feature extraction, and applied predictive modeling techniques to analyze trends.",
        github: "https://github.com/mythrarajasekar/BITCOIN-VALUE-PREDICTOR"
    },
    'test-portal': {
        title: "Online Test Portal",
        category: "PFS",
        overview: "Built a web-based online examination portal to conduct tests, manage questions, and evaluate student performance digitally.",
        challenge: "Ensuring smooth test flow, secure handling of question data, and accurate automated evaluation.",
        solution: "Designed structured portal with user access, dynamic question management, and automated result calculation.",
        github: "https://github.com/mythrarajasekar/ONLINE-TEST-PORTAL---PFS"
    }
};

// Modal Logic
const initCaseStudy = () => {
    const modal = document.getElementById('caseStudyModal');
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');
    const body = document.getElementById('modalBody');
    const closeBtn = document.getElementById('closeModal');
    const triggers = document.querySelectorAll('.view-casestudy');

    if (!modal || !body) return;

    const openModal = (projectId) => {
        const data = projectDetails[projectId];
        if (!data) return;

        body.innerHTML = `
            <div class="space-y-6">
                <div class="flex flex-wrap items-center justify-between gap-4">
                    <span class="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-bold uppercase tracking-wider">${data.category}</span>
                    ${data.github !== '#' ? `
                        <a href="${data.github}" target="_blank" class="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white font-bold hover:bg-white/10 hover:border-primary/40 transition-all group">
                            <i data-lucide="github" class="w-4 h-4"></i>
                            VIEW REPOSITORY
                            <i data-lucide="external-link" class="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </a>
                    ` : ''}
                </div>
                <h2 class="text-4xl md:text-5xl font-extrabold text-white">${data.title}</h2>
                <p class="text-xl text-slate-400 leading-relaxed max-w-2xl">${data.overview}</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                        <i data-lucide="alert-circle" class="text-primary"></i> The Challenge
                    </h3>
                    <p class="text-slate-400 leading-relaxed">${data.challenge}</p>
                </div>
                <div class="space-y-6">
                    <h3 class="text-2xl font-bold text-white flex items-center gap-3">
                        <i data-lucide="check-circle-2" class="text-emerald-500"></i> The Solution
                    </h3>
                    <p class="text-slate-400 leading-relaxed">${data.solution}</p>
                </div>
            </div>
        `;

        // Refresh icons
        lucide.createIcons();

        // Show modal
        modal.classList.remove('hidden');
        setTimeout(() => {
            overlay.classList.add('opacity-100');
            content.classList.remove('translate-y-20', 'opacity-0', 'scale-95');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        overlay.classList.remove('opacity-100');
        content.classList.add('translate-y-20', 'opacity-0', 'scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    };

    triggers.forEach(t => {
        t.addEventListener('click', (e) => {
            // Prevent opening modal if clicking a direct link or button inside the card
            if (e.target.closest('.stop-propagation')) return;
            
            e.stopPropagation();
            openModal(t.getAttribute('data-project'));
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
};

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    reveal();
    typeEffect();
    cardGlow();
    initProjectScroll();
    initCaseStudy();
    initCursor();
    initMagnetic();
    window.addEventListener("scroll", reveal);
});

/* === Core Performance Enhancements === */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Detect screen size and user motion preferences
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 2. Adjust or disable heavy AOS animations automatically
    if (typeof AOS !== 'undefined') {
        if (prefersReducedMotion || isMobile) {
            document.querySelectorAll('[data-aos]').forEach(el => {
                el.setAttribute('data-aos-duration', '400'); // speed up to reduce strain
                if (prefersReducedMotion) {
                    el.removeAttribute('data-aos'); // completely remove motion
                }
            });
        }
    }

    // 3. Disable custom cursor tracking on mobile layouts to save CPU
    const customCursor = document.querySelector('.cursor-dot');
    const outlineCursor = document.querySelector('.cursor-outline');
    if (customCursor && outlineCursor) {
        if (isMobile) {
            customCursor.style.display = 'none';
            outlineCursor.style.display = 'none';
        } 
    }

    // 4. Clean up heavy UI filters/blurs for strict mobile optimization
    if (isMobile) {
        document.querySelectorAll('.backdrop-blur-sm, .backdrop-blur-xl, .blur-3xl').forEach(el => {
            el.style.backdropFilter = 'none';
            if (el.classList.contains('blur-3xl')) {
                el.style.display = 'none'; // remove glowing background blobs on mobile
            }
        });
    }
});
