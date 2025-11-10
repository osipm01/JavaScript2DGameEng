import { Particles } from './Particles.js';

class ParticleSystem {
    constructor(ctx) {
        this.ctx = ctx;
        this.particles = [];
        this.isRunning = false;
    }

    // Создание взрыва частиц
    createExplosion(x, y, count = 20, options = {}) {
        const explosionOptions = {
            size: options.size || Math.random() * 8 + 3,
            type: options.type || "circle",
            color: options.color || `hsl(${Math.random() * 360}, 100%, 50%)`,
            tics: options.tics || 60,
            gravity: options.gravity || 0.1,
            spread: options.spread || 5
        };

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3 + 1;
            
            const particle = new Particles(
                explosionOptions.size * (0.5 + Math.random() * 0.5),
                explosionOptions.type,
                explosionOptions.color,
                {
                    x: x + (Math.random() - 0.5) * explosionOptions.spread,
                    y: y + (Math.random() - 0.5) * explosionOptions.spread,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    gravity: explosionOptions.gravity
                },
                explosionOptions.tics * (0.7 + Math.random() * 0.6),
                this.ctx
            );
            
            this.particles.push(particle);
        }
    }

    // Создание дождя частиц
    createRain(count = 10, width, options = {}) {
        const rainOptions = {
            size: options.size || Math.random() * 4 + 2,
            type: options.type || "circle",
            color: options.color || "rgba(100, 100, 255, 0.7)",
            tics: options.tics || 200,
            gravity: options.gravity || 0.2,
            speed: options.speed || 3
        };

        for (let i = 0; i < count; i++) {
            const particle = new Particles(
                rainOptions.size,
                rainOptions.type,
                rainOptions.color,
                {
                    x: Math.random() * width,
                    y: -10,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: rainOptions.speed,
                    gravity: rainOptions.gravity
                },
                rainOptions.tics,
                this.ctx
            );
            
            this.particles.push(particle);
        }
    }

    // Создание огня/дыма
    createFire(x, y, count = 5, options = {}) {
        const fireOptions = {
            size: options.size || Math.random() * 6 + 2,
            type: options.type || "circle",
            color: options.color || `hsl(${20 + Math.random() * 20}, 100%, 50%)`,
            tics: options.tics || 40,
            turbulence: options.turbulence || 0.5
        };

        for (let i = 0; i < count; i++) {
            const particle = new Particles(
                fireOptions.size * (0.8 + Math.random() * 0.4),
                fireOptions.type,
                fireOptions.color,
                {
                    x: x + (Math.random() - 0.5) * 10,
                    y: y,
                    vx: (Math.random() - 0.5) * fireOptions.turbulence,
                    vy: -Math.random() * 2 - 1,
                    gravity: -0.05 // Отрицательная гравитация для подъема
                },
                fireOptions.tics * (0.5 + Math.random()),
                this.ctx
            );
            
            this.particles.push(particle);
        }
    }

    // Создание отдельной частицы
    addParticle(particle) {
        this.particles.push(particle);
    }

    // Создание случайной частицы
    addRandomParticle(x, y) {
        const types = ["circle", "rect"];
        const colors = [
            "red", "blue", "green", "yellow", "orange", "purple", 
            "cyan", "magenta", "white"
        ];

        const particle = new Particles(
            Math.random() * 10 + 2,
            types[Math.floor(Math.random() * types.length)],
            colors[Math.floor(Math.random() * colors.length)],
            {
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                gravity: 0.1
            },
            Math.random() * 100 + 50,
            this.ctx
        );

        this.particles.push(particle);
    }

    // Обновление всех частиц
    update() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const isAlive = this.particles[i].update();
            
            if (!isAlive) {
                this.particles.splice(i, 1);
            }
        }
    }

    // Отрисовка всех частиц
    draw() {
        this.particles.forEach(particle => {
            particle.draw();
        });
    }

    // Обновление и отрисовка (удобно для игрового цикла)
    render() {
        this.update();
        this.draw();
    }

    // Очистка всех частиц
    clear() {
        this.particles = [];
    }

    // Получение количества активных частиц
    getParticleCount() {
        return this.particles.length;
    }

    // Запуск непрерывной эмиссии частиц
    startEmission(x, y, interval = 100, options = {}) {
        this.isRunning = true;
        this.emissionInterval = setInterval(() => {
            this.addRandomParticle(x, y);
        }, interval);
        
        this.emissionOptions = { x, y, interval, options };
    }

    // Остановка эмиссии
    stopEmission() {
        this.isRunning = false;
        if (this.emissionInterval) {
            clearInterval(this.emissionInterval);
        }
    }
}


export { ParticleSystem };