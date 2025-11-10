class Particles {
    constructor(size, type, color, positions, tics, ctx) {
        this.size = size;
        this.type = type;
        this.color = color;
        this.positions = positions;
        this.tics = tics;
        this.ctx = ctx;
        this.lifetime = tics;
        this.age = 0;
        this.initialSize = size;
    }

    draw() {
        const progress = this.age / this.lifetime;
        const alpha = 1 - progress;
        const currentSize = this.initialSize * (1 - progress * 0.5);

        this.ctx.save();
        this.ctx.globalAlpha = alpha;
        this.ctx.fillStyle = this.color;
        
        if (this.type === "circle") {
            this.ctx.beginPath();
            this.ctx.arc(
                this.positions.x, 
                this.positions.y, 
                currentSize, 
                0, 
                Math.PI * 2
            );
            this.ctx.fill();
        }
        
        if (this.type === "rect") {
            this.ctx.fillRect(
                this.positions.x - currentSize / 2, 
                this.positions.y - currentSize / 2, 
                currentSize, 
                currentSize
            );
        }
        
        this.ctx.restore();
    }

    update() {
        this.age++;
        
        // Обновляем позицию
        if (this.positions.vx && this.positions.vy) {
            this.positions.x += this.positions.vx;
            this.positions.y += this.positions.vy;
        }
        
        // Добавляем гравитацию
        if (this.positions.gravity) {
            this.positions.vy += this.positions.gravity;
        }
        
        // Добавляем сопротивление
        if (this.positions.vx) {
            this.positions.vx *= 0.98;
        }
        if (this.positions.vy) {
            this.positions.vy *= 0.98;
        }
        
        return this.age < this.lifetime;
    }
}

export { Particles }