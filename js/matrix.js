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
let matrixTimer;
function startMatrix() {
    if (!matrixTimer) matrixTimer = setInterval(drawMatrix, 40);
}
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) startMatrix();
else drawMatrix();


// ================= IMAGE SHRINK ON SCROLL =================

const heroImage = document.querySelector(".hero-image");
window.addEventListener("scroll", () => {
    heroImage.classList.toggle("shrink", window.scrollY > 200);
});


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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        terminalContent.textContent = lines.join("\n");
        return;
    }
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

document.querySelectorAll(".about, .experience, .skills, .credentials, .projects, .contact")
    .forEach(el => observer.observe(el));

