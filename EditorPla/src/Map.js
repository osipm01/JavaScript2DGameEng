class Map {
    constructor(ctx, tileSize) {
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
        this.tileSize = tileSize;

        // Инициализация карты
        this.grid = [];
        this.selectedTileType = 1; // Тип выбранной плитки по умолчанию
        this.isDrawing = false;
        this.tileTypes = {
            0: { name: 'empty', color: '#ffffff' },
            1: { name: 'grass', color: '#7cfc00' },
            2: { name: 'water', color: '#1e90ff' },
            3: { name: 'stone', color: '#808080' },
            4: { name: 'sand', color: '#f0e68c' }
        };

        this.initGrid();
        this.setupEventListeners();
    }

    initGrid() {
        // Создаем пустую сетку
        const cols = Math.floor(this.width / this.tileSize);
        const rows = Math.floor(this.height / this.tileSize);

        for (let x = 0; x < cols; x++) {
            this.grid[x] = [];
            for (let y = 0; y < rows; y++) {
                this.grid[x][y] = 0; // Пустая плитка
            }
        }
    }

    setupEventListeners() {
        const canvas = this.ctx.canvas;

        // Нажатие мыши - начало рисования
        canvas.addEventListener('mousedown', (e) => {
            this.isDrawing = true;
            this.drawAtPosition(e.offsetX, e.offsetY);
        });

        // Движение мыши - продолжение рисования
        canvas.addEventListener('mousemove', (e) => {
            if (this.isDrawing) {
                this.drawAtPosition(e.offsetX, e.offsetY);
            }
        });

        // Отпускание мыши - конец рисования
        canvas.addEventListener('mouseup', () => {
            this.isDrawing = false;
        });

        // Выход за пределы canvas
        canvas.addEventListener('mouseleave', () => {
            this.isDrawing = false;
        });

        // Обработка клавиш для выбора типа плитки
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '5') {
                this.selectedTileType = parseInt(e.key);
                console.log(`Selected tile type: ${this.tileTypes[this.selectedTileType].name}`);
            }
        });
    }

    drawAtPosition(mouseX, mouseY) {
        const gridX = Math.floor(mouseX / this.tileSize);
        const gridY = Math.floor(mouseY / this.tileSize);

        if (gridX >= 0 && gridX < this.grid.length &&
            gridY >= 0 && gridY < this.grid[0].length) {
            this.grid[gridX][gridY] = this.selectedTileType;
        }
    }

    getTile(x, y) {
        if (x >= 0 && x < this.grid.length && y >= 0 && y < this.grid[0].length) {
            return this.grid[x][y];
        }
        return null;
    }

    drawGrid() {
        // Рисуем сетку
        this.ctx.strokeStyle = '#cccccc';
        this.ctx.lineWidth = 0.5;

        for (let x = 0; x <= this.width; x += this.tileSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }

        for (let y = 0; y <= this.height; y += this.tileSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }

    drawTiles() {
        // Рисуем все плитки
        for (let x = 0; x < this.grid.length; x++) {
            for (let y = 0; y < this.grid[x].length; y++) {
                const tileType = this.grid[x][y];
                if (tileType !== 0) { // Не рисуем пустые плитки
                    const tileInfo = this.tileTypes[tileType];
                    this.ctx.fillStyle = tileInfo.color;
                    this.ctx.fillRect(
                        x * this.tileSize,
                        y * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    );
                }
            }
        }
    }

    drawLines() {
        // Очищаем canvas
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Рисуем плитки
        this.drawTiles();

        // Рисуем сетку поверх
        this.drawGrid();

        // Рисуем информацию о выбранной плитке
        this.drawUI();
    }

    drawUI() {
        // Отображаем информацию о выбранном типе плитки
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(10, 10, 200, 100);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '14px Arial';
        this.ctx.fillText(`Selected: ${this.tileTypes[this.selectedTileType].name}`, 20, 30);
        this.ctx.fillText('Press 1-5 to change tile type:', 20, 50);

        Object.keys(this.tileTypes).forEach((key, index) => {
            const type = this.tileTypes[key];
            this.ctx.fillText(`${key}: ${type.name}`, 20, 70 + index * 15);
        });
    }

    // Сохранение карты
    saveMap() {
        const mapData = {
            grid: this.grid,
            tileSize: this.tileSize,
            width: this.width,
            height: this.height
        };

        const dataStr = JSON.stringify(mapData);
        localStorage.setItem('savedMap', dataStr);
        console.log('Map saved!');

        // Можно также скачать файл
        this.downloadMap(mapData);
    }

    // Загрузка карты
    loadMap() {
        const savedMap = localStorage.getItem('savedMap');
        if (savedMap) {
            const mapData = JSON.parse(savedMap);
            this.grid = mapData.grid;
            this.tileSize = mapData.tileSize;
            console.log('Map loaded!');
        }
    }

    downloadMap(mapData) {
        const dataStr = JSON.stringify(mapData, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'map.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    // Очистка карты
    clearMap() {
        this.initGrid();
    }

    // Установка типа плитки
    setTileType(type) {
        if (this.tileTypes[type]) {
            this.selectedTileType = type;
        }
    }

    update() {
        this.drawLines();
    }
}

export { Map };