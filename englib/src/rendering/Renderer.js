export default class Renderer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            throw new Error(`Canvas with id '${canvasId}' not found`);
        }
        this.ctx = this.canvas.getContext("2d");
        this.styles = this.getDefaultStyles();
    }

    getDefaultStyles() {
        return {
            wall: {
                primary: "#34495e",
                secondary: "#2c3e50",
                detail: "#1a252f"
            },
            ground: {
                primary: "#ecf0f1",
                border: "#bdc3c7"
            },
            platform: {
                primary: "#27ae60",
                secondary: "#2ecc71",
                detail: "#229954"
            },
            spike: {
                primary: "#e74c3c",
                secondary: "#c0392b"
            },
            coin: {
                primary: "#FFD700",
                secondary: "#FFA500"
            },
            checkpoint: {
                primary: "#9B59B6",
                secondary: "#8E44AD"
            },
            player: {
                body: "#e74c3c",
                border: "#c0392b",
                eye: "#ffffff"
            },
            mapBorder: "#e74c3c",
            background: "#87CEEB"
        };
    }

    setStyles(newStyles) {
        this.styles = { ...this.styles, ...newStyles };
    }

    resizeCanvas(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMap(tileMap) {
        // Фон
        this.ctx.fillStyle = this.styles.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (let row = 0; row < tileMap.height; row++) {
            for (let col = 0; col < tileMap.width; col++) {
                this.drawTile(tileMap, row, col);
            }
        }

        // Границы карты
        this.ctx.strokeStyle = this.styles.mapBorder;
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(0, 0, tileMap.getPixelWidth(), tileMap.getPixelHeight());
    }

    drawTile(tileMap, row, col) {
        const tile = tileMap.map[row][col];
        const x = col * tileMap.tileSize;
        const y = row * tileMap.tileSize;

        if (x + tileMap.tileSize < 0 || x > this.canvas.width || 
            y + tileMap.tileSize < 0 || y > this.canvas.height) {
            return;
        }

        switch(tile) {
            case tileMap.patterns.WALL:
                this.drawWall(x, y, tileMap.tileSize);
                break;
            case tileMap.patterns.PLATFORM:
                this.drawPlatform(x, y, tileMap.tileSize);
                break;
            case tileMap.patterns.SPIKE:
                this.drawSpike(x, y, tileMap.tileSize);
                break;
            case tileMap.patterns.COIN:
                this.drawCoin(x, y, tileMap.tileSize);
                break;
            case tileMap.patterns.CHECKPOINT:
                this.drawCheckpoint(x, y, tileMap.tileSize);
                break;
            default:
                this.drawGround(x, y, tileMap.tileSize);
        }
    }

    drawWall(x, y, size) {
        const style = this.styles.wall;
        
        this.ctx.fillStyle = style.primary;
        this.ctx.fillRect(x, y, size, size);
        
        this.ctx.fillStyle = style.secondary;
        const padding = size * 0.02;
        this.ctx.fillRect(x + padding, y + padding, size - padding * 2, size - padding * 2);
        
        this.ctx.strokeStyle = style.detail;
        this.ctx.lineWidth = Math.max(1, size * 0.01);
        const patternSize = size / 4;
        
        for (let i = 0; i < 4; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + i * patternSize);
            this.ctx.lineTo(x + size, y + i * patternSize);
            this.ctx.stroke();
            
            this.ctx.beginPath();
            this.ctx.moveTo(x + i * patternSize, y);
            this.ctx.lineTo(x + i * patternSize, y + size);
            this.ctx.stroke();
        }
    }

    drawPlatform(x, y, size) {
        const style = this.styles.platform;
        
        this.ctx.fillStyle = style.primary;
        this.ctx.fillRect(x, y, size, size);
        
        this.ctx.fillStyle = style.secondary;
        this.ctx.fillRect(x, y + size * 0.7, size, size * 0.3);
        
        // Трава на платформе
        this.ctx.fillStyle = style.detail;
        for (let i = 0; i < 5; i++) {
            const grassX = x + i * (size / 5) + size / 10;
            this.ctx.fillRect(grassX, y, size * 0.02, size * 0.3);
        }
    }

    drawSpike(x, y, size) {
        const style = this.styles.spike;
        
        this.ctx.fillStyle = style.primary;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size);
        this.ctx.lineTo(x + size / 2, y);
        this.ctx.lineTo(x + size, y + size);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.fillStyle = style.secondary;
        for (let i = 1; i < 4; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x + i * size / 4, y + size);
            this.ctx.lineTo(x + size / 2, y + size * 0.3);
            this.ctx.lineTo(x + (i + 1) * size / 4, y + size);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }

    drawCoin(x, y, size) {
        const style = this.styles.coin;
        
        this.ctx.fillStyle = style.primary;
        this.ctx.beginPath();
        this.ctx.arc(x + size/2, y + size/2, size/3, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.fillStyle = style.secondary;
        this.ctx.beginPath();
        this.ctx.arc(x + size/2, y + size/2, size/4, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawCheckpoint(x, y, size) {
        const style = this.styles.checkpoint;
        
        this.ctx.fillStyle = style.primary;
        this.ctx.fillRect(x, y, size, size);
        
        this.ctx.fillStyle = style.secondary;
        this.ctx.fillRect(x + size * 0.2, y + size * 0.1, size * 0.6, size * 0.8);
    }

    drawGround(x, y, size) {
        const style = this.styles.ground;
        
        this.ctx.fillStyle = style.primary;
        this.ctx.fillRect(x, y, size, size);
        
        this.ctx.strokeStyle = style.border;
        this.ctx.lineWidth = Math.max(0.5, size * 0.005);
        this.ctx.strokeRect(x, y, size, size);
    }

    drawPlayer(player, tileSize) {
        const size = player.getSize(tileSize);
        const style = this.styles.player;

        // Анимация прыжка/падения
        const scaleY = player.isGrounded ? 1 : 0.9;
        const scaleX = player.isGrounded ? 1 : 1.1;

        this.ctx.save();
        this.ctx.translate(player.x + size / 2, player.y + size / 2);
        
        // Отражаем если смотрит влево
        if (!player.facingRight) {
            this.ctx.scale(-1, 1);
        }
        
        this.ctx.scale(scaleX, scaleY);

        // Тело игрока
        this.ctx.fillStyle = style.body;
        this.ctx.fillRect(-size / 2, -size / 2, size, size);

        // Глаза
        const eyeSize = size * 0.2;
        const eyeOffsetX = size * 0.25;
        const eyeOffsetY = size * 0.25;
        
        this.ctx.fillStyle = style.eye;
        this.ctx.fillRect(-size / 2 + eyeOffsetX, -size / 2 + eyeOffsetY, eyeSize, eyeSize);
        this.ctx.fillRect(-size / 2 + eyeOffsetX * 2, -size / 2 + eyeOffsetY, eyeSize, eyeSize);

        // Обводка
        this.ctx.strokeStyle = style.border;
        this.ctx.lineWidth = Math.max(2, size * 0.05);
        this.ctx.strokeRect(-size / 2, -size / 2, size, size);

        this.ctx.restore();
    }

    drawDebugInfo(tileMap, player, fps) {
        this.ctx.fillStyle = "#2c3e50";
        this.ctx.font = "14px Arial";
        
        const info = [
            `Карта: ${tileMap.width}×${tileMap.height} тайлов`,
            `Размер тайла: ${tileMap.tileSize}px`,
            `Позиция: ${Math.floor(player.x)}, ${Math.floor(player.y)}`,
            `Скорость: X:${player.velocityX.toFixed(1)}, Y:${player.velocityY.toFixed(1)}`,
            `Состояние: ${player.isGrounded ? 'На земле' : 'В воздухе'}`,
            `FPS: ${fps}`
        ];

        info.forEach((text, index) => {
            this.ctx.fillText(text, 10, 20 + index * 20);
        });
    }

    // Дополнительные методы рендеринга
    drawText(text, x, y, style = {}) {
        const { color = "#000", font = "14px Arial", align = "left" } = style;
        
        this.ctx.fillStyle = color;
        this.ctx.font = font;
        this.ctx.textAlign = align;
        this.ctx.fillText(text, x, y);
    }

    drawRect(x, y, width, height, style = {}) {
        const { fill, stroke, lineWidth = 1 } = style;
        
        if (fill) {
            this.ctx.fillStyle = fill;
            this.ctx.fillRect(x, y, width, height);
        }
        
        if (stroke) {
            this.ctx.strokeStyle = stroke;
            this.ctx.lineWidth = lineWidth;
            this.ctx.strokeRect(x, y, width, height);
        }
    }
}