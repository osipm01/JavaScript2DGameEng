
class Particles{

    constructor(size, type, color, positions, tics){
        this.size = size,
        this.type = type,
        this.color = color,
        this.positions = positions
        this.tics = tics
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

    }

    update(){}

}

export { Particles };