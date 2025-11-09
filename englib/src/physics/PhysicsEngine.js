export default class PhysicsEngine {
    constructor() {
        this.settings = {
            gravity: 0.8,
            jumpPower: -15,
            moveSpeed: 5,
            friction: 0.8,
            airControl: 0.6,
            maxFallSpeed: 15
        };
    }

    setSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }

    updatePlayer(player, tileMap) {
        this.applyGravity(player);
        this.applyFriction(player);
        this.updatePosition(player);
        this.handleCollisions(player, tileMap);
        this.constrainPlayer(player, tileMap);
    }

    applyGravity(player) {
        player.velocityY += this.settings.gravity;
        player.velocityY = Math.min(player.velocityY, this.settings.maxFallSpeed);
    }

    applyFriction(player) {
        if (player.isGrounded) {
            player.velocityX *= this.settings.friction;
            if (Math.abs(player.velocityX) < 0.1) {
                player.velocityX = 0;
            }
        }
    }

    updatePosition(player) {
        player.x += player.velocityX;
        player.y += player.velocityY;
    }

    handleCollisions(player, tileMap) {
        const playerSize = player.getSize(tileMap.tileSize);
        player.isGrounded = false;

        // Проверяем все четыре стороны игрока
        const points = {
            bottomLeft: { x: player.x, y: player.y + playerSize },
            bottomRight: { x: player.x + playerSize, y: player.y + playerSize },
            topLeft: { x: player.x, y: player.y },
            topRight: { x: player.x + playerSize, y: player.y },
            centerBottom: { x: player.x + playerSize / 2, y: player.y + playerSize }
        };

        // Проверка столкновений снизу (земля)
        const bottomLeftTile = tileMap.getTileAt(points.bottomLeft.x, points.bottomLeft.y + 1);
        const bottomRightTile = tileMap.getTileAt(points.bottomRight.x, points.bottomRight.y + 1);
        
        if (this.isSolid(bottomLeftTile) || this.isSolid(bottomRightTile)) {
            player.isGrounded = true;
            player.isJumping = false;
            player.velocityY = 0;
            // Корректируем позицию чтобы не проваливаться
            const bottomY = Math.floor((player.y + playerSize) / tileMap.tileSize) * tileMap.tileSize;
            player.y = bottomY - playerSize;
        }

        // Проверка столкновений сверху
        const topLeftTile = tileMap.getTileAt(points.topLeft.x, points.topLeft.y - 1);
        const topRightTile = tileMap.getTileAt(points.topRight.x, points.topRight.y - 1);
        
        if (this.isSolid(topLeftTile) || this.isSolid(topRightTile)) {
            player.velocityY = 0;
            // Корректируем позицию
            const topY = Math.ceil(player.y / tileMap.tileSize) * tileMap.tileSize;
            player.y = topY;
        }

        // Проверка столкновений слева
        const leftBottomTile = tileMap.getTileAt(points.topLeft.x - 1, points.topLeft.y + playerSize / 2);
        const leftTopTile = tileMap.getTileAt(points.topLeft.x - 1, points.topLeft.y);
        
        if (this.isSolid(leftBottomTile) || this.isSolid(leftTopTile)) {
            player.velocityX = Math.max(0, player.velocityX);
            // Корректируем позицию
            const leftX = Math.ceil(player.x / tileMap.tileSize) * tileMap.tileSize;
            player.x = leftX;
        }

        // Проверка столкновений справа
        const rightBottomTile = tileMap.getTileAt(points.topRight.x + 1, points.topRight.y + playerSize / 2);
        const rightTopTile = tileMap.getTileAt(points.topRight.x + 1, points.topRight.y);
        
        if (this.isSolid(rightBottomTile) || this.isSolid(rightTopTile)) {
            player.velocityX = Math.min(0, player.velocityX);
            // Корректируем позицию
            const rightX = Math.floor((player.x + playerSize) / tileMap.tileSize) * tileMap.tileSize;
            player.x = rightX - playerSize;
        }

        // Проверка на смертельные тайлы
        const centerBottomTile = tileMap.getTileAt(points.centerBottom.x, points.centerBottom.y);
        if (this.isDeadly(centerBottomTile)) {
            player.respawn(tileMap);
        }
    }

    isSolid(tileType) {
        return tileType === 1 || tileType === 2; // WALL или PLATFORM
    }

    isDeadly(tileType) {
        return tileType === 3; // SPIKE
    }

    constrainPlayer(player, tileMap) {
        const playerSize = player.getSize(tileMap.tileSize);
        const mapWidth = tileMap.getPixelWidth();
        const mapHeight = tileMap.getPixelHeight();

        player.x = Math.max(0, Math.min(player.x, mapWidth - playerSize));
        
        // Если игрок падает за нижнюю границу - респавн
        if (player.y > mapHeight) {
            player.respawn(tileMap);
        }
    }

    // Дополнительные физические утилиты
    calculateTrajectory(startX, startY, velocityX, velocityY, steps = 100) {
        const points = [];
        let x = startX;
        let y = startY;
        let vx = velocityX;
        let vy = velocityY;

        for (let i = 0; i < steps; i++) {
            points.push({ x, y });
            x += vx;
            y += vy;
            vy += this.settings.gravity;
        }

        return points;
    }
}