export default class InputManager {
    constructor() {
        this.keys = {};
        this.jumpPressed = false;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener("keydown", (e) => {
            this.keys[e.key] = true;
            this.keys[e.keyCode.toString()] = true;
            
            // Предотвращаем прокрутку страницы при использовании пробела
            if (e.key === ' ' || e.keyCode === 32) {
                e.preventDefault();
            }
        });

        document.addEventListener("keyup", (e) => {
            this.keys[e.key] = false;
            this.keys[e.keyCode.toString()] = false;
            this.jumpPressed = false;
        });

        // Touch поддержка для мобильных устройств
        this.setupTouchControls();
    }

    setupTouchControls() {
        document.addEventListener('touchstart', (e) => {
            e.preventDefault();
            // Базовая реализация тач контролов
            this.keys['touch'] = true;
        });

        document.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.keys['touch'] = false;
            this.jumpPressed = false;
        });
    }

    isKeyPressed(key) {
        return this.keys[key] || this.keys[key.toUpperCase()];
    }

    getMovement() {
        let direction = 0;
        if (this.isKeyPressed('a') || this.isKeyPressed('A') || this.isKeyPressed('65')) {
            direction -= 1;
        }
        if (this.isKeyPressed('d') || this.isKeyPressed('D') || this.isKeyPressed('68')) {
            direction += 1;
        }

        const jump = (this.isKeyPressed(' ') || this.isKeyPressed('w') || this.isKeyPressed('W') || 
                     this.isKeyPressed('87') || this.isKeyPressed('38')) && !this.jumpPressed;
        
        if (jump) {
            this.jumpPressed = true;
        }

        return {
            direction,
            jump,
            running: this.isKeyPressed('shift')
        };
    }

    // Для кастомных контролов
    setCustomControl(key, value) {
        this.keys[key] = value;
    }
}