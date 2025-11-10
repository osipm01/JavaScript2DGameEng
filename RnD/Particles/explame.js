// Создание системы частиц
const particles = [];

// Создание одиночной частицы
const particle = new Particles(
    10, // size
    "circle", // type
    "red", // color
    { x: 100, y: 100, vx: 1, vy: -2 }, // positions with velocity
    60, // tics (time to live)
    ctx // canvas context
);

// Или используя фабричный метод
const particle2 = Particles.createParticle(150, 150, {
    type: "rect",
    color: "blue",
    size: 8,
    tics: 120
});

// В игровом цикле
function animate() {
    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Обновление и отрисовка всех частиц
    for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        particle.update();
        particle.draw();
        
        // Удаляем мертвые частицы
        if (particle.age >= particle.lifetime) {
            particles.splice(i, 1);
        }
    }
    
    requestAnimationFrame(animate);
}