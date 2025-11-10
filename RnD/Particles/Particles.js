
class Particles{

    constructor(size, type, color, positions, tics, ctx){
        this.size = size,
        this.type = type,
        this.color = color,
        this.positions = positions
        this.tics = tics
        this.ctx = ctx
    }

    parseType(){
        if(this.type === "circle"){
            return "this part = circle"
        }
        if(this.type === "rect"){
            return "this part = rect"
        }
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.beginPath();
        if(this.type === "circle"){

        }
        if(this.type === "rect"){
            
        }
    }

    update(){}

}

export { Particles };