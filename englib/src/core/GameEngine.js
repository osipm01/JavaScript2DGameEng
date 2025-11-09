import InputManager from './InputManager.js';
import TileMap from '../entities/TileMap.js';
import Player from '../entities/Player.js';
import Renderer from '../rendering/Renderer.js';
import PhysicsEngine from '../physics/PhysicsEngine.js';

export default class GameEngine {
    constructor(canvasId, options = {}) {
        this.renderer = new Renderer(canvasId);
        this.input = new InputManager();
        this.tileMap = new TileMap(
            options.mapWidth || 12,
            options.mapHeight || 6,
            options.tileSize || 100
        );
        this.player = new Player(
            options.playerX || 50,
            options.playerY || 50,
            options.playerSizeRatio || 0.4,
            options.playerSpeedRatio || 0.05
        );
        this.physics = new PhysicsEngine();
        
        this.isRunning = false;
        this.lastTime = 0;
        this.fps = 0;
        this.frameCount = 0;
        this.lastFpsUpdate = 0;

        // Настройки физики
        this.physicsSettings = {
            gravity: options.gravity || 0.8,
            jumpPower: options.jumpPower || -15,
            moveSpeed: options.moveSpeed || 5,
            friction: options.friction || 0.8,
            airControl: options.airControl || 0.6
        };

        this.setupCanvas();
        this.applyPhysicsSettings();
    }

    applyPhysicsSettings() {
        this.physics.setSettings(this.physicsSettings);
        this.player.physics = this.physics;
    }

    setupCanvas() {
        const mapWidth = this.tileMap.getPixelWidth();
        const mapHeight = this.tileMap.getPixelHeight();
        this.renderer.resizeCanvas(mapWidth, mapHeight);
    }

    generatePlatformerMap() {
        this.tileMap.generatePlatformerMap();
        this.setupCanvas();
        return this;
    }

    setMapPattern(pattern) {
        this.tileMap.setPattern(pattern);
        this.setupCanvas();
        return this;
    }

    resizeMap(width, height) {
        const oldX = this.player.x;
        const oldY = this.player.y;
        const oldWidth = this.tileMap.getPixelWidth();
        const oldHeight = this.tileMap.getPixelHeight();

        this.tileMap.resize(width, height);
        this.setupCanvas();

        // Сохраняем относительную позицию игрока
        const relativeX = oldX / oldWidth;
        const relativeY = oldY / oldHeight;
        this.player.x = relativeX * this.tileMap.getPixelWidth();
        this.player.y = relativeY * this.tileMap.getPixelHeight();
        this.player.constrainPosition(this.tileMap);

        return this;
    }

    changeTileSize(newSize) {
        const oldSize = this.tileMap.tileSize;
        const playerCenterX = this.player.x + this.player.getSize(oldSize) / 2;
        const playerCenterY = this.player.y + this.player.getSize(oldSize) / 2;

        this.tileMap.changeTileSize(newSize);
        this.setupCanvas();

        const newPlayerSize = this.player.getSize(newSize);
        this.player.x = playerCenterX - newPlayerSize / 2;
        this.player.y = playerCenterY - newPlayerSize / 2;
        this.player.constrainPosition(this.tileMap);

        return this;
    }

    update(deltaTime) {
        const movement = this.input.getMovement();
        const oldX = this.player.x;
        const oldY = this.player.y;

        // Движение игрока
        if (movement.direction !== 0) {
            this.player.move(movement.direction, this.tileMap.tileSize, this.player.isGrounded);
        }

        // Прыжок
        if (movement.jump) {
            this.player.jump();
        }

        // Применяем физику
        this.physics.updatePlayer(this.player, this.tileMap);

        // Обновление FPS
        this.updateFPS(deltaTime);
    }

    updateFPS(deltaTime) {
        this.frameCount++;
        if (deltaTime - this.lastFpsUpdate >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (deltaTime - this.lastFpsUpdate));
            this.frameCount = 0;
            this.lastFpsUpdate = deltaTime;
        }
    }

    render() {
        this.renderer.clear();
        this.renderer.drawMap(this.tileMap);
        this.renderer.drawPlayer(this.player, this.tileMap.tileSize);
        this.renderer.drawDebugInfo(this.tileMap, this.player, this.fps);
    }

    gameLoop(currentTime) {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.lastTime = performance.now();
        this.gameLoop(this.lastTime);
        
        console.log('Platformer game started');
    }

    stop() {
        this.isRunning = false;
        console.log('Game stopped');
    }

    setPhysics(settings) {
        this.physicsSettings = { ...this.physicsSettings, ...settings };
        this.applyPhysicsSettings();
        return this;
    }

    getState() {
        return {
            map: {
                width: this.tileMap.width,
                height: this.tileMap.height,
                tileSize: this.tileMap.tileSize
            },
            player: {
                x: this.player.x,
                y: this.player.y,
                velocityX: this.player.velocityX,
                velocityY: this.player.velocityY,
                isGrounded: this.player.isGrounded,
                isJumping: this.player.isJumping
            },
            physics: this.physicsSettings
        };
    }

    // События
    on(event, callback) {
        if (!this.events) this.events = {};
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }

    emit(event, data) {
        if (this.events && this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}