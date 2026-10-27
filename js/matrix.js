// ================= MATRIX BACKGROUND =================

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
let columns = 0;
let drops = [];

function initDrops() {
    if (!canvas) return;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDrops();
}

if (canvas && ctx) {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 8, 20, 0.1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff88";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    let lastFrameTime = 0;
    const targetFpsInterval = 1000 / 30; // 30 FPS for smooth, efficient rendering
    let animationFrameId = null;

    function renderMatrixLoop(currentTime) {
        if (!document.hidden) {
            const elapsed = currentTime - lastFrameTime;
            if (elapsed > targetFpsInterval) {
                lastFrameTime = currentTime - (elapsed % targetFpsInterval);
                drawMatrix();
            }
        }
        animationFrameId = requestAnimationFrame(renderMatrixLoop);
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        animationFrameId = requestAnimationFrame(renderMatrixLoop);

        // Pause animation when tab is in background to preserve system resources
        document.addEventListener("visibilitychange", () => {
            if (document.hidden && animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            } else if (!document.hidden && !animationFrameId) {
                animationFrameId = requestAnimationFrame(renderMatrixLoop);
            }
        });
    } else {
        drawMatrix();
    }
}


// ================= HERO IMAGE SHRINK & NAV AVATAR =================

const heroImage = document.getElementById("heroImage");
const navAvatar = document.getElementById("navAvatar");

function updateScrollAvatar() {
    const isScrolled = window.scrollY > 150;
    if (heroImage) {
        heroImage.classList.toggle("shrink", isScrolled);
    }
    if (navAvatar) {
        navAvatar.classList.toggle("visible", isScrolled);
    }
}

window.addEventListener("scroll", updateScrollAvatar, { passive: true });
updateScrollAvatar();


// ================= MOBILE NAVIGATION =================

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
        const isExpanded = navLinks.classList.toggle("active");
        navToggle.setAttribute("aria-expanded", String(isExpanded));
    });

    // Close mobile nav when clicking any nav link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });

    // Close when clicking outside of nav
    document.addEventListener("click", (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
        }
    });
}


// ================= TERMINAL EXPERIENCE =================

const lines = [
    "$ cat career_history.log",
    "",
    "[Jan 2026 - Present] >> HCLTech — Specialist",
    "  Location     : Noida, India",
    "  Client       : Fortune 500 retail organization",
    "  Role         : Control-M Administration | Output Management | IBM z/OS Production Support",
    "  Tools        : Control-M | Control-M Agents | BMC Control-D (Output) | SDSF | ServiceNow",
    "  Upgrade      : Testing Control-M 9.0.20.200 → 9.0.22 with senior admin and BMC Support",
    "  AJF          : Preventing hundreds of obsolete test jobs from loading into the AJF",
    "  Output tools : CA DocView | CA Output Management | Broadcom OM WebViewer",
    "",
    "[2023 - 2025]   >> Ensono — Associate DC Operations Analyst",
    "  Location     : Pune, India",
    "  Scope        : 24x7 Mainframe & Distributed Systems Operations",
    "  Clients      : 7 Fortune 500 clients plus 2 other client environments",
    "  Achievement  : 2,700+ production incidents handled in 6 months",
    "  Focus        : Batch recovery | Mainframe operations | Production support",
    "",
    "[In Progress]   >> MBA — Manipal University Jaipur",
    "  Focus        : Business Strategy | Operations | Leadership",
    "  Target       : Enterprise Technology & Operations Management",
    "",
    ">> Status      : ACCESS GRANTED ✓",
    ">> Next Mission: Workload Automation & Production Support"
];

const terminalContent = document.getElementById("terminal-content");
const loader = document.getElementById("loader");
const skipBtn = document.getElementById("skipTerminalBtn");
let hasAnimated = false;
let isTypingFinished = false;
let typingTimeout = null;

function displayAllLines() {
    if (typingTimeout) clearTimeout(typingTimeout);
    isTypingFinished = true;
    if (loader) loader.style.display = "none";
    if (terminalContent) {
        terminalContent.style.display = "block";
        terminalContent.textContent = lines.join("\n") + "\n";
        const cursor = document.createElement("span");
        cursor.className = "cursor";
        terminalContent.appendChild(cursor);
    }
    if (skipBtn) skipBtn.style.display = "none";
}

if (skipBtn) {
    skipBtn.addEventListener("click", displayAllLines);
}

function typeLine(text, charIndex, callback) {
    if (isTypingFinished) return;

    if (charIndex < text.length) {
        terminalContent.textContent += text.charAt(charIndex);
        typingTimeout = setTimeout(() => typeLine(text, charIndex + 1, callback), 8);
    } else {
        terminalContent.textContent += "\n";
        typingTimeout = setTimeout(callback, 50);
    }
}

function startTyping() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        displayAllLines();
        return;
    }

    let lineIndex = 0;
    function nextLine() {
        if (isTypingFinished) return;

        if (lineIndex < lines.length) {
            typeLine(lines[lineIndex], 0, () => {
                lineIndex++;
                nextLine();
            });
        } else {
            isTypingFinished = true;
            const cursor = document.createElement("span");
            cursor.className = "cursor";
            terminalContent.appendChild(cursor);
            if (skipBtn) skipBtn.style.display = "none";
        }
    }
    nextLine();
}


// ================= SCROLL REVEAL ANIMATIONS =================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            // Trigger terminal experience once section comes into view
            if (entry.target.classList.contains("experience") && !hasAnimated) {
                hasAnimated = true;
                if (loader) loader.style.display = "block";
                setTimeout(() => {
                    if (loader) loader.style.display = "none";
                    if (terminalContent) terminalContent.style.display = "block";
                    startTyping();
                }, 800);
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".about, .experience, .skills, .credentials, .projects, .contact")
    .forEach(el => observer.observe(el));
