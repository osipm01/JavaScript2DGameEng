

export class Vector2{

    constructor(x:number, y: number){
        this.x = x;
        this.y = y;
    }

    public x: number;
    public y: number;


    public get_repos(old_x:number, old_y:number){
        return ([this.x - old_x, this.y - old_y])
    }

    public position(){
        return [this.x, this.y]
    }

}