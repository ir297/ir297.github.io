// ================= MATRIX BACKGROUND =================

const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
let columns, drops;

function initDrops() {
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
}
initDrops();

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 8, 20, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff88";
    ctx.font = fontSize + "px monospace";
    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    });
}
setInterval(drawMatrix, 40);


// ================= IMAGE SHRINK ON SCROLL =================

const heroImage = document.querySelector(".hero-image");
window.addEventListener("scroll", () => {
    heroImage.classList.toggle("shrink", window.scrollY > 200);
});


// ================= TERMINAL EXPERIENCE =================

const lines = [
    "$ cat career_history.log",
    "",
    "[2026 - Present] >> HCL Technologies — Specialist",
    "  Location     : Noida, India",
    "  Client       : Ahold Delhaize (Fortune 500 Retail)",
    "  Role         : Control-M Admin & Scheduling",
    "  Tools        : Control-M | OMEGAMON | SDSF | ServiceNow",
    "  Focus        : Workflow Orchestration | HA | SLA Management",
    "",
    "[2023 - 2025]   >> Ensono — Associate DC Operations Analyst",
    "  Location     : Pune, India",
    "  Clients      : Dun & Bradstreet | Ameriprise | West Bend",
    "               : SSAB | First Bank | BMC | ADM",
    "  Role         : 24x7 Mainframe & Distributed Systems Ops",
    "  Achievement  : 2,700+ incidents resolved in 6 months",
    "  Achievement  : ~15% MTTR improvement via RCA",
    "",
    ">> Status      : ACCESS GRANTED ✓",
    ">> Next Mission: Generative AI Platform Engineering"
];

const terminalContent = document.getElementById("terminal-content");
const loader = document.getElementById("loader");
let hasAnimated = false;

function typeLine(text, index, callback) {
    if (index < text.length) {
        terminalContent.innerHTML += text.charAt(index);
        setTimeout(() => typeLine(text, index + 1, callback), 18);
    } else {
        terminalContent.innerHTML += "<br>";
        setTimeout(callback, 300);
    }
}

function startTyping() {
    let i = 0;
    function nextLine() {
        if (i < lines.length) {
            typeLine(lines[i], 0, () => { i++; nextLine(); });
        } else {
            terminalContent.innerHTML += '<span class="cursor"></span>';
        }
    }
    nextLine();
}


// ================= SCROLL REVEAL ANIMATIONS =================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");

            // Trigger terminal only once when experience section is visible
            if (entry.target.classList.contains("experience") && !hasAnimated) {
                hasAnimated = true;
                loader.style.display = "block";
                setTimeout(() => {
                    loader.style.display = "none";
                    terminalContent.style.display = "block";
                    startTyping();
                }, 1200);
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".about, .experience, .skills, .why, .projects, .contact")
    .forEach(el => observer.observe(el));
