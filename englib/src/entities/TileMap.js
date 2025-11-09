export default class TileMap {
    constructor(width = 12, height = 6, tileSize = 100) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;
        this.map = this.createEmptyMap();
        this.patterns = {
            EMPTY: 0,
            WALL: 1,
            GROUND: 0,
            PLATFORM: 2,
            SPIKE: 3,
            COIN: 4,
            CHECKPOINT: 5
        };
    }

    createEmptyMap() {
        const map = [];
        for (let row = 0; row < this.height; row++) {
            map[row] = [];
            for (let col = 0; col < this.width; col++) {
                map[row][col] = this.patterns.EMPTY;
            }
        }
        return map;
    }

    generatePlatformerMap() {
        // Генерация типичной карты для платформера
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                // Пол внизу
                if (row === this.height - 1) {
                    this.map[row][col] = this.patterns.WALL;
                }
                // Случайные платформы
                else if (row > this.height / 2 && Math.random() < 0.1 && col > 2 && col < this.width - 3) {
                    this.map[row][col] = this.patterns.PLATFORM;
                    // Сделать платформу шириной 3-5 тайлов
                    const platformWidth = Math.floor(Math.random() * 3) + 3;
                    for (let i = 1; i < platformWidth && col + i < this.width; i++) {
                        this.map[row][col + i] = this.patterns.PLATFORM;
                    }
                }
                // Случайные стены
                else if (Math.random() < 0.05) {
                    this.map[row][col] = this.patterns.WALL;
                }
            }
        }
        return this;
    }

    setPattern(pattern) {
        if (pattern.length === this.height && pattern[0].length === this.width) {
            this.map = pattern;
        } else {
            console.warn('Pattern dimensions do not match map size');
        }
        return this;
    }

    resize(newWidth, newHeight) {
        const newMap = [];
        for (let row = 0; row < newHeight; row++) {
            newMap[row] = [];
            for (let col = 0; col < newWidth; col++) {
                if (row < this.height && col < this.width && this.map[row]) {
                    newMap[row][col] = this.map[row][col];
                } else {
                    newMap[row][col] = this.patterns.EMPTY;
                }
            }
        }
        
        this.map = newMap;
        this.width = newWidth;
        this.height = newHeight;
        return this;
    }

    changeTileSize(newSize) {
        this.tileSize = Math.max(10, newSize);
        return this;
    }

    getTileAt(x, y) {
        const col = Math.floor(x / this.tileSize);
        const row = Math.floor(y / this.tileSize);
        
        if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
            return this.map[row][col];
        }
        return this.patterns.WALL;
    }

    getPixelWidth() {
        return this.width * this.tileSize;
    }

    getPixelHeight() {
        return this.height * this.tileSize;
    }

    // Утилиты для работы с картой
    findTilePositions(tileType) {
        const positions = [];
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                if (this.map[row][col] === tileType) {
                    positions.push({ row, col, x: col * this.tileSize, y: row * this.tileSize });
                }
            }
        }
        return positions;
    }

    setTile(row, col, tileType) {
        if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
            this.map[row][col] = tileType;
            return true;
        }
        return false;
    }
}