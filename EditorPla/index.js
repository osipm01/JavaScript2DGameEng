import { Map } from './src/Map.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const save = document.getElementById('save');
const load = document.getElementById('load');
const clear = document.getElementById('clear');

const map = new Map(ctx, 32);

save.addEventListener('click', () => {
    map.saveMap()
})
load.addEventListener('click', () => {
    map.loadMap()
})
clear.addEventListener('click', () => {
    map.clearMap()
})

function gameLoop() {
    map.update();
    requestAnimationFrame(gameLoop);
}

gameLoop();