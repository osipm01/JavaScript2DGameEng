import { Vector2D } from "../math/Vec2";

export class Map {
    img: string;
    vec: Vector2D;
    speed: number;
    maxSpeed: number;
    acceleration: number;
    friction: number;

    constructor(img: string, vec: Vector2D) {
        this.img = img;
        this.vec = vec;
        this.speed = 0;
        this.maxSpeed = 5;
        this.acceleration = 0.2;
        this.friction = 0.1;
    }

    update(ctx: CanvasRenderingContext2D): void {
        if (this.speed > 0) {
            this.speed -= this.friction;
            if (this.speed < 0) this.speed = 0;
        } else if (this.speed < 0) {
            this.speed += this.friction;
            if (this.speed > 0) this.speed = 0;
        }
        
        this.vec.x += this.speed;
        
        ctx.fillStyle = this.img;
        ctx.fillRect(this.vec.x, this.vec.y, 200, 200);
    }

    moveRight(): void {
        this.speed += this.acceleration;
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
    }
}