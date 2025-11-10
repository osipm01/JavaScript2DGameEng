class Particles {
    constructor(size, type, color, positions, tics, ctx) {
        this.size = size,
        this.type = type,
        this.color = color,
        this.positions = positions
        this.tics = tics
        this.ctx = ctx
        this.lifetime = tics
        this.age = 0 
    }

    parseType() {
        if (this.type === "circle") {
            return "this part = circle"
        }
        if (this.type === "rect") {
            return "this part = rect"
        }
    }

    draw() {
        const alpha = 1 - (this.age / this.lifetime);
        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = this.color;
        
        if (this.type === "circle") {
            this.ctx.beginPath();
            this.ctx.arc(
                this.positions.x, 
                this.positions.y, 
                this.size, 
                0, 
                Math.PI * 2
            );
            this.ctx.fill();
        }
        
        if (this.type === "rect") {
            this.ctx.fillRect(
                this.positions.x - this.size / 2, 
                this.positions.y - this.size / 2, 
                this.size, 
                this.size
            );
        }
        
        this.ctx.restore();
    }

    update() {
        this.age++;
        
        if (this.positions.vx && this.positions.vy) {
            this.positions.x += this.positions.vx;
            this.positions.y += this.positions.vy;
        }
        
        if (this.positions.gravity) {
            this.positions.vy += this.positions.gravity;
        }
        
        return this.age < this.lifetime;
    }

    static createParticle(x, y, options = {}) {
        const defaults = {
            size: Math.random() * 5 + 2,
            type: "circle",
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tics: 100,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            gravity: 0.05
        };
        
        const settings = { ...defaults, ...options };
        
        return new Particles(
            settings.size,
            settings.type,
            settings.color,
            {
                x: x,
                y: y,
                vx: settings.vx,
                vy: settings.vy,
                gravity: settings.gravity
            },
            settings.tics,
            settings.ctx
        );
    }
}

export { Particles };