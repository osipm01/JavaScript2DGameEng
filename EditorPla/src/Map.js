
class Map {


    constructor(ctx, tileSize) {
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
        this.tileSize = tileSize;
    }


    getTile(){
        console.log("Get Tile", this.ctx, this.width, this.height);
    }

    drawLines(){
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {

            }
        }
    }

    update() {

    }
}

export { Map };