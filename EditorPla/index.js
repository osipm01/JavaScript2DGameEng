import { Map } from "./src/Map.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const map = new Map(ctx, 6);

// Draw the map
map.draw();

// Get tile at mouse position
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const tile = map.getTile(x, y);
    if (tile) {
        console.log(`Clicked tile: ${tile.col}, ${tile.row}`);
        map.setTile(tile.col, tile.row, 1); // Mark as occupied
        map.draw(); // Redraw
    }
});