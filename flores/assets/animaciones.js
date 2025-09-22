// Estrellas de fondo
const starBg = document.getElementById('star-bg');
const starCanvas = document.createElement('canvas');
starCanvas.width = window.innerWidth;
starCanvas.height = window.innerHeight;
starCanvas.style.position = 'absolute';
starCanvas.style.top = 0;
starCanvas.style.left = 0;
starCanvas.style.width = '100vw';
starCanvas.style.height = '100vh';
starBg.appendChild(starCanvas);
const ctxStar = starCanvas.getContext('2d');
function drawStars() {
    ctxStar.clearRect(0, 0, starCanvas.width, starCanvas.height);
    for (let i = 0; i < 120; i++) {
        const x = Math.random() * starCanvas.width;
        const y = Math.random() * starCanvas.height;
        const r = Math.random() * 0.8 + 0.2;
        ctxStar.beginPath();
        ctxStar.arc(x, y, r, 0, 2 * Math.PI);
        ctxStar.fillStyle = 'rgba(255,255,200,' + (Math.random() * 0.7 + 0.3) + ')';
        ctxStar.fill();
    }
}
setInterval(drawStars, 1800);
drawStars();
window.addEventListener('resize', () => {
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;
    drawStars();
});

// Animación de flores
const flowerCanvas = document.getElementById('flowers-canvas');
const ctx = flowerCanvas.getContext('2d');
function drawFlower(x, y, scale, sway) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(sway);
    ctx.scale(scale, scale);
    // Tallo
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, 40, -10, 90, 0, 120);
    ctx.lineWidth = 7;
    ctx.strokeStyle = '#3fa34d';
    ctx.stroke();
    // Hoja izquierda
    ctx.save();
    ctx.rotate(-0.5);
    ctx.beginPath();
    ctx.moveTo(0, 60);
    ctx.bezierCurveTo(-20, 70, -30, 90, 0, 100);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#3fa34d';
    ctx.stroke();
    ctx.restore();
    // Hoja derecha
    ctx.save();
    ctx.rotate(0.5);
    ctx.beginPath();
    ctx.moveTo(0, 70);
    ctx.bezierCurveTo(20, 80, 30, 100, 0, 110);
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#3fa34d';
    ctx.stroke();
    ctx.restore();
    // Pétalos
    for (let i = 0; i < 7; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 7);
        ctx.beginPath();
        ctx.ellipse(0, -18, 13, 28, 0, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 221, 51, 0.93)';
        ctx.shadowColor = '#fffbe6';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }
    // Centro
    ctx.beginPath();
    ctx.arc(0, 0, 13, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffe066';
    ctx.shadowColor = '#fffbe6';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
}
let t = 0;
function animateFlowers() {
    ctx.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);
    // Tres flores
    drawFlower(90, 200, 1, Math.sin(t) * 0.08);
    drawFlower(200, 210, 1.18, Math.sin(t + 1.2) * 0.11);
    drawFlower(310, 200, 1, Math.sin(t + 2.1) * 0.09);
    t += 0.018;
    requestAnimationFrame(animateFlowers);
}
animateFlowers();

// Luciérnagas
const firefliesDiv = document.querySelector('.fireflies');
const fireflyCount = 18;
let fireflies = [];
for (let i = 0; i < fireflyCount; i++) {
    const el = document.createElement('div');
    el.className = 'firefly';
    firefliesDiv.appendChild(el);
    fireflies.push({
        el,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.7 + 30,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.5,
        s: Math.random() * 0.7 + 0.7
    });
}
function animateFireflies() {
    fireflies.forEach(f => {
        f.x += f.dx;
        f.y += f.dy;
        if (f.x < 0 || f.x > window.innerWidth) f.dx *= -1;
        if (f.y < 0 || f.y > window.innerHeight * 0.8) f.dy *= -1;
        f.el.style.transform = `translate(${f.x}px,${f.y}px) scale(${f.s})`;
    });
    requestAnimationFrame(animateFireflies);
}
animateFireflies();
// Estilo de luciérnagas
const style = document.createElement('style');
style.innerHTML = `.firefly {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: radial-gradient(circle, #fffbe6 0%, #ffe066 60%, transparent 100%);
    box-shadow: 0 0 12px 4px #ffe06699, 0 0 30px 10px #fffbe6cc;
    opacity: 0.7;
    pointer-events: none;
    animation: blink 2.5s infinite alternate ease-in-out;
}
@keyframes blink {
    0% { opacity: 0.7; }
    60% { opacity: 1; }
    100% { opacity: 0.3; }
}`;
document.head.appendChild(style);
// Música: controles ocultos
const audio = document.getElementById('bg-music');
audio.controls = false;
audio.volume = 0.7;
// Para autoplay en móviles, requiere interacción del usuario
window.addEventListener('touchstart', () => { audio.play(); }, { once: true });
