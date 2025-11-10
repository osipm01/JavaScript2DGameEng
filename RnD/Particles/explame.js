// Создание системы частиц
const particleSystem = new ParticleSystem(ctx);

// Создание взрыва
particleSystem.createExplosion(400, 300, 50, {
    color: "orange",
    size: 6,
    tics: 90
});

// Создание огня
particleSystem.createFire(200, 400, 8, {
    color: "red",
    size: 4
});

// Запуск непрерывной эмиссии
particleSystem.startEmission(100, 100, 200);

// В игровом цикле
function gameLoop() {
    // Очистка canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Обновление и отрисовка всех частиц
    particleSystem.render();
    
    // Показ количества частиц (для отладки)
    ctx.fillStyle = "white";
    ctx.fillText(`Particles: ${particleSystem.getParticleCount()}`, 10, 20);
    
    requestAnimationFrame(gameLoop);
}

// Остановка системы
// particleSystem.stopEmission();
// particleSystem.clear();