export default class Player {
    constructor(x = 50, y = 50, sizeRatio = 0.4, speedRatio = 0.05) {
        this.x = x;
        this.y = y;
        this.sizeRatio = sizeRatio;
        this.speedRatio = speedRatio;
        this.color = "#e74c3c";
        this.borderColor = "#c0392b";
        
        // Физика прыжка
        this.velocityY = 0;
        this.velocityX = 0;
        this.isJumping = false;
        this.isGrounded = false;
        this.jumpPower = -15;
        this.gravity = 0.8;
        this.maxFallSpeed = 15;
        this.moveSpeed = 5;
        this.friction = 0.8;
        this.airControl = 0.6;
        
        // Состояния анимации
        this.facingRight = true;
        this.isMoving = false;

        // Дополнительные способности
        this.canDoubleJump = true;
        this.hasDoubleJumped = false;
        this.dashAvailable = true;
    }

    getSize(tileSize) {
        return tileSize * this.sizeRatio;
    }

    getSpeed(tileSize) {
        return tileSize * this.speedRatio;
    }

    jump() {
        if (this.isGrounded) {
            this.velocityY = this.jumpPower;
            this.isJumping = true;
            this.isGrounded = false;
            this.hasDoubleJumped = false;
            return true;
        } else if (this.canDoubleJump && !this.hasDoubleJumped) {
            // Двойной прыжок
            this.velocityY = this.jumpPower * 0.8;
            this.hasDoubleJumped = true;
            return true;
        }
        return false;
    }

    move(direction, tileSize, isGrounded) {
        const controlFactor = isGrounded ? 1 : this.airControl;
        this.velocityX = direction * this.moveSpeed * controlFactor;
        
        if (direction !== 0) {
            this.facingRight = direction > 0;
            this.isMoving = true;
        } else {
            this.isMoving = false;
        }
    }

    dash(direction) {
        if (this.dashAvailable) {
            this.velocityX = direction * this.moveSpeed * 3;
            this.dashAvailable = false;
            setTimeout(() => {
                this.dashAvailable = true;
            }, 1000);
            return true;
        }
        return false;
    }

    applyPhysics(physics) {
        physics.applyToPlayer(this);
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    constrainPosition(tileMap) {
        const playerSize = this.getSize(tileMap.tileSize);
        const mapWidth = tileMap.getPixelWidth();
        const mapHeight = tileMap.getPixelHeight();

        this.x = Math.max(0, Math.min(this.x, mapWidth - playerSize));
        
        // Если игрок падает за нижнюю границу - респавн
        if (this.y > mapHeight) {
            this.respawn(tileMap);
            return true; // Сигнал о респавне
        }
        return false;
    }

    respawn(tileMap) {
        this.x = 50;
        this.y = 50;
        this.velocityX = 0;
        this.velocityY = 0;
        this.isGrounded = false;
        this.isJumping = false;
        this.hasDoubleJumped = false;
    }

    // Для кастомизации способностей
    setAbilities(abilities) {
        Object.assign(this, abilities);
    }
}