export class DrawObg{

    public x:number;
    public y:number;
    public ctx:CanvasRenderingContext2D;    
    public color: string;

    constructor(x:number, y:number, ctx:CanvasRenderingContext2D, color:string){
        this.color = color;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
    }

    darwRect(h:number, w:number){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, w, h);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    darwBall(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 20, 0, Math.PI*2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    drawAq(size: number){
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, size, size);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }   

    darwTriangle(){

    }

}