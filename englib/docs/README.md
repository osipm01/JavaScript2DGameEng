Platformer Game Engine
Модульная JavaScript библиотека для создания 2D платформеров и тайловых игр в браузере.

🚀 Возможности
🎮 Гибкая система управления с поддержкой клавиатуры и тач-контролов

🏗️ Динамические тайловые карты с возможностью изменения размеров в реальном времени

⚡ Реалистичная физика прыжков, гравитации, трения и коллизий

🎨 Кастомизируемый рендеринг с поддержкой анимаций и различных стилей

🔧 Модульная архитектура для легкого расширения и кастомизации

📱 Адаптивные размеры тайлов и карт

🎯 Разные типы тайлов: стены, платформы, шипы, монеты, чекпоинты

🔄 Событийная система для реакции на игровые события

📦 Установка
Подключение через CDN
html
<script type="module">
  import { GameEngine } from 'https://cdn.jsdelivr.net/npm/platformer-game-engine@1.0.0/src/index.js';
  
  const game = new GameEngine('gameCanvas');
  game.generatePlatformerMap();
  game.start();
</script>
Локальная установка
bash
npm install platformer-game-engine
javascript
import { GameEngine } from 'platformer-game-engine';

const game = new GameEngine('gameCanvas', {
  mapWidth: 15,
  mapHeight: 10,
  tileSize: 64
});
Ручная установка
Скачайте файлы библиотеки

Подключите в HTML:

html
<script type="module" src="src/index.js"></script>
<script type="module">
  import { GameEngine } from './src/index.js';
  
  const game = new GameEngine('gameCanvas');
  game.start();
</script>
🎮 Быстрый старт
Минимальный пример
html
<!DOCTYPE html>
<html>
<head>
    <title>Platformer Game</title>
    <style>
        body { margin: 0; padding: 20px; background: #1a1a1a; }
        canvas { border: 2px solid #34495e; background: #87CEEB; }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    
    <script type="module">
        import { GameEngine } from './src/index.js';
        
        // Создание экземпляра игры
        const game = new GameEngine('gameCanvas', {
            mapWidth: 15,
            mapHeight: 10,
            tileSize: 64
        });
        
        // Генерация карты и запуск
        game.generatePlatformerMap();
        game.start();
    </script>
</body>
</html>
Расширенный пример с настройками
javascript
import { GameEngine } from './src/index.js';

const game = new GameEngine('gameCanvas', {
    mapWidth: 20,
    mapHeight: 12,
    tileSize: 50,
    playerX: 100,
    playerY: 100,
    gravity: 0.8,
    jumpPower: -12,
    moveSpeed: 6,
    friction: 0.7,
    airControl: 0.5
});

// Генерация платформерной карты
game.generatePlatformerMap();

// Подписка на события
game.on('playerSpawn', (player) => {
    console.log('Игрок заспавнен:', player);
});

game.on('playerDeath', () => {
    console.log('Игрок погиб!');
});

// Запуск игры
game.start();
🎯 Управление
Стандартное управление
A/D или ←/→ - движение влево/вправо

SPACE или W или ↑ - прыжок

SHIFT - бег (увеличивает скорость)

Двойной прыжок - нажмите прыжок в воздухе

Программное управление
javascript
// Принудительное перемещение игрока
game.player.x = 200;
game.player.y = 150;

// Применение скорости
game.player.velocityX = 10;
game.player.velocityY = -5;

// Прыжок из кода
game.player.jump();
📚 API Документация
GameEngine
Основной класс, управляющий игровой логикой.

Конструктор
javascript
new GameEngine(canvasId, options)
Параметры:

canvasId - ID HTML canvas элемента

options - объект с настройками (опционально)

Опции:

javascript
{
    mapWidth: 12,           // Ширина карты в тайлах
    mapHeight: 6,           // Высота карты в тайлах  
    tileSize: 100,          // Размер тайла в пикселях
    playerX: 50,            // Начальная позиция игрока X
    playerY: 50,            // Начальная позиция игрока Y
    playerSizeRatio: 0.4,   // Размер игрока относительно тайла
    gravity: 0.8,           // Сила гравитации
    jumpPower: -15,         // Сила прыжка (отрицательное значение)
    moveSpeed: 5,           // Скорость движения
    friction: 0.8,          // Коэффициент трения
    airControl: 0.6         // Контроль в воздухе (0-1)
}
Методы
start() - Запускает игровой цикл

stop() - Останавливает игровой цикл

generatePlatformerMap(obstacleProbability = 0.3) - Генерирует случайную карту для платформера

setMapPattern(pattern) - Устанавливает пользовательский паттерн карты

javascript
const customMap = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1], 
    [1, 0, 2, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1]
];
game.setMapPattern(customMap);
resizeMap(width, height) - Изменяет размер карты

changeTileSize(newSize) - Изменяет размер тайлов

setPhysics(settings) - Настраивает физические параметры

javascript
// Луная гравитация
game.setPhysics({
    gravity: 0.3,
    jumpPower: -8
});

// Высокая гравитация  
game.setPhysics({
    gravity: 1.5,
    jumpPower: -20
});

// Изменение скорости
game.setPhysics({
    moveSpeed: 8
});
getState() - Возвращает текущее состояние игры

javascript
const state = game.getState();
console.log(state.player); // {x, y, velocityX, velocityY, isGrounded, isJumping}
console.log(state.map);    // {width, height, tileSize}
console.log(state.physics); // {gravity, jumpPower, moveSpeed}
on(event, callback) - Подписка на события

javascript
game.on('playerSpawn', (player) => {
    console.log('Игрок создан:', player);
});

game.on('playerDeath', () => {
    console.log('Игрок погиб!');
});
TileMap
Класс для работы с тайловыми картами.

Типы тайлов
javascript
{
    EMPTY: 0,       // Пустое пространство
    WALL: 1,        // Стена (непроходимая)
    PLATFORM: 2,    // Платформа (можно прыгать снизу)
    SPIKE: 3,       // Шипы (убивают игрока)
    COIN: 4,        // Монеты (собираемые предметы)
    CHECKPOINT: 5   // Чекпоинты (точки сохранения)
}
Методы
generateRandom(obstacleProbability = 0.3) - Генерирует случайную карту

resize(newWidth, newHeight) - Изменяет размер карты

getTileAt(x, y) - Возвращает тип тайла по координатам

setTile(row, col, tileType) - Устанавливает тип тайла

findTilePositions(tileType) - Находит все позиции тайлов определенного типа

Player
Класс игрока с физикой и управлением.

Методы
jump() - Выполняет прыжок, если игрок на земле

move(direction, tileSize, isGrounded) - Двигает игрока в указанном направлении

dash(direction) - Выполняет рывок в указанном направлении

setAbilities(abilities) - Настраивает способности игрока

javascript
game.player.setAbilities({
    canDoubleJump: true,
    canDash: true,
    dashCooldown: 1000
});
Renderer
Класс для отрисовки игры на canvas.

Методы
setStyles(newStyles) - Изменяет стили отрисовки

javascript
game.renderer.setStyles({
    player: {
        body: "#FF69B4", // Розовый игрок
        border: "#FF1493",
        eye: "#FFFFFF"
    },
    wall: {
        primary: "#8B4513", // Коричневые стены
        secondary: "#A0522D"
    }
});
drawText(text, x, y, style) - Рисует текст

drawRect(x, y, width, height, style) - Рисует прямоугольник

🎨 Кастомизация
Создание кастомной карты
javascript
const customLevel = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 4, 0, 1],
    [1, 0, 2, 2, 0, 0, 3, 0, 0, 1],
    [1, 0, 0, 0, 0, 2, 2, 2, 0, 1],
    [1, 0, 4, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

game.setMapPattern(customLevel);
Добавление новых типов тайлов
javascript
// Расширение TileMap
class CustomTileMap extends TileMap {
    constructor() {
        super();
        this.patterns.TELEPORT = 6;
        this.patterns.ENEMY = 7;
    }
}

// Расширение Renderer
class CustomRenderer extends Renderer {
    drawTeleport(x, y, size) {
        this.ctx.fillStyle = "#9B59B6";
        this.ctx.beginPath();
        this.ctx.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
Создание кастомной физики
javascript
class CustomPhysics extends PhysicsEngine {
    handleWaterPhysics(player, tileMap) {
        const playerCenterX = player.x + player.getSize(tileMap.tileSize) / 2;
        const playerCenterY = player.y + player.getSize(tileMap.tileSize) / 2;
        
        const tile = tileMap.getTileAt(playerCenterX, playerCenterY);
        if (tile === tileMap.patterns.WATER) {
            player.velocityY *= 0.5; // Замедленное падение в воде
            player.velocityX *= 0.7; // Замедленное движение в воде
        }
    }
}
🔧 Примеры использования
Динамическое изменение игры
javascript
// Изменение размера карты во время игры
document.getElementById('resizeBtn').addEventListener('click', () => {
    game.resizeMap(20, 10);
});

// Изменение физики
document.getElementById('moonGravity').addEventListener('click', () => {
    game.setPhysics({
        gravity: 0.3,
        jumpPower: -8
    });
});

// Сбор монет
game.on('playerMove', () => {
    const playerState = game.getState().player;
    const tile = game.tileMap.getTileAt(playerState.x, playerState.y);
    
    if (tile === game.tileMap.patterns.COIN) {
        // Удаляем монету с карты
        const col = Math.floor(playerState.x / game.tileMap.tileSize);
        const row = Math.floor(playerState.y / game.tileMap.tileSize);
        game.tileMap.setTile(row, col, game.tileMap.patterns.EMPTY);
        
        console.log('Монета собрана!');
    }
});
Создание UI поверх игры
javascript
function drawUI() {
    const ctx = game.renderer.ctx;
    const state = game.getState();
    
    // Очки жизни
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "20px Arial";
    ctx.fillText(`Жизни: ${state.player.lives}`, 20, 40);
    
    // Собранные монеты
    ctx.fillText(`Монеты: ${state.player.coins}`, 20, 70);
    
    // Таймер
    ctx.fillText(`Время: ${Math.floor(state.gameTime / 1000)}s`, 20, 100);
}

// Интеграция с игровым циклом
const originalRender = game.render.bind(game);
game.render = function() {
    originalRender();
    drawUI();
};
🚀 Производительность
Оптимизация отрисовки
javascript
// Кэширование часто используемых вычислений
class OptimizedRenderer extends Renderer {
    constructor(canvasId) {
        super(canvasId);
        this.tileCache = new Map();
    }
    
    drawTile(tileMap, row, col) {
        const cacheKey = `${row}-${col}-${tileMap.map[row][col]}`;
        
        if (!this.tileCache.has(cacheKey)) {
            // Создаем offscreen canvas для кэширования
            const cachedTile = this.createCachedTile(tileMap, row, col);
            this.tileCache.set(cacheKey, cachedTile);
        }
        
        const cached = this.tileCache.get(cacheKey);
        const x = col * tileMap.tileSize;
        const y = row * tileMap.tileSize;
        this.ctx.drawImage(cached, x, y);
    }
}
Ограничение FPS
javascript
class FixedFPSGame extends GameEngine {
    constructor(canvasId, options) {
        super(canvasId, options);
        this.targetFPS = options.targetFPS || 60;
        this.interval = 1000 / this.targetFPS;
        this.then = performance.now();
    }
    
    gameLoop(currentTime) {
        if (!this.isRunning) return;
        
        const delta = currentTime - this.then;
        
        if (delta > this.interval) {
            this.then = currentTime - (delta % this.interval);
            this.update(delta);
            this.render();
        }
        
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}
🐛 Отладка
Включение отладочной информации
javascript
// Расширенная отладочная информация
game.renderer.drawDebugInfo = function(tileMap, player, fps) {
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.font = "12px Arial";
    
    const debugInfo = [
        `FPS: ${fps}`,
        `Position: ${Math.floor(player.x)}, ${Math.floor(player.y)}`,
        `Velocity: X:${player.velocityX.toFixed(2)}, Y:${player.velocityY.toFixed(2)}`,
        `State: ${player.isGrounded ? 'GROUNDED' : 'AIRBORNE'}`,
        `Map: ${tileMap.width}x${tileMap.height} (${tileMap.tileSize}px)`,
        `Tile: ${Math.floor(player.x/tileMap.tileSize)}, ${Math.floor(player.y/tileMap.tileSize)}`
    ];
    
    debugInfo.forEach((text, i) => {
        this.ctx.fillText(text, 10, 20 + i * 15);
    });
};
Логирование игровых событий
javascript
// Подписка на все события для отладки
const events = ['playerSpawn', 'playerMove', 'playerJump', 'playerDeath', 'collision'];
events.forEach(event => {
    game.on(event, (data) => {
        console.log(`[${event}]`, data);
    });
});
🤝 Вклад в развитие
Мы приветствуем вклад в развитие библиотеки!

Форкните репозиторий

Создайте ветку для вашей функции (git checkout -b feature/amazing-feature)

Закоммитьте изменения (git commit -m 'Add some amazing feature')

Запушьте в ветку (git push origin feature/amazing-feature)

Откройте Pull Request

📄 Лицензия
Этот проект распространяется под лицензией MIT. Смотрите файл LICENSE для подробностей.

🆕 История версий
v1.0.0
Первый стабильный релиз

Базовая физика платформера

Модульная архитектура

Документация и примеры

📞 Поддержка
Если у вас есть вопросы или предложения:

Создайте Issue на GitHub

Happy coding! 🎮