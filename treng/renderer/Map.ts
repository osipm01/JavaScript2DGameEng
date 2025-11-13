import { Vector2D } from "../math/Vec2";

export class Map {
    img: string;
    vec: Vector2D;
    speed: number;
    maxSpeed: number;
    acceleration: number;
    friction: number;
    speedY: number; // Добавляем отдельную скорость для вертикального движения

    constructor(img: string, vec: Vector2D) {
        this.img = img;
        this.vec = vec;
        this.speed = 0;
        this.speedY = 0; // Инициализируем вертикальную скорость
        this.maxSpeed = 5;
        this.acceleration = 0.2;
        this.friction = 0.1;
    }

    update(ctx: CanvasRenderingContext2D): void {
        // Применяем трение для горизонтального движения
        if (this.speed > 0) {
            this.speed -= this.friction;
            if (this.speed < 0) this.speed = 0;
        } else if (this.speed < 0) {
            this.speed += this.friction;
            if (this.speed > 0) this.speed = 0;
        }
        
        // Применяем трение для вертикального движения
        if (this.speedY > 0) {
            this.speedY -= this.friction;
            if (this.speedY < 0) this.speedY = 0;
        } else if (this.speedY < 0) {
            this.speedY += this.friction;
            if (this.speedY > 0) this.speedY = 0;
        }
        
        // Обновляем позицию
        this.vec.x += this.speed;
        this.vec.y += this.speedY;
        
        // Отрисовываем карту
        ctx.fillStyle = this.img;
        ctx.fillRect(this.vec.x, this.vec.y, 200, 200);
    }

    moveRight(): void {
        this.speed += this.acceleration;
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
    }

    moveLeft(): void {
        this.speed -= this.acceleration;
        if (this.speed < -this.maxSpeed) {
            this.speed = -this.maxSpeed;
        }
    }

    moveUp(): void {
        this.speedY -= this.acceleration; // Движение вверх - отрицательная скорость по Y
        if (this.speedY < -this.maxSpeed) {
            this.speedY = -this.maxSpeed;
        }
    }

    moveDown(): void {
        this.speedY += this.acceleration; // Движение вниз - положительная скорость по Y
        if (this.speedY > this.maxSpeed) {
            this.speedY = this.maxSpeed;
        }
    }
}