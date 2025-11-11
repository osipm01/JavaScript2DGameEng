const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Map {
    constructor(img, vec) {
        this.img = img;
        this.vec = vec;
        this.speed = 0;
        this.maxSpeed = 5;
        this.acceleration = 0.2;
        this.friction = 0.1;
    }

    update(ctx) {
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

    moveRight() {
        this.speed += this.acceleration;
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
    }
}

class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let map1 = new Map("red", new Vector2D(0, 0));

const keys = {};

document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function handleInput() {
    if (keys["ArrowRight"]) {
        map1.moveRight();
    }
}

function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    handleInput(); 
    map1.update(ctx);
    

}

function gameLoop() {
    drawMap();
    requestAnimationFrame(gameLoop);
}

gameLoop();