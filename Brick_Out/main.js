let canvas = document.querySelector('canvas');

let context=canvas.getContext('2d');

canvas.width=900
canvas.height=500
let move=''
document.addEventListener("keydown",(event)=>{
    event.preventDefault();
    move=event.key;
})

document.addEventListener("keyup",(event)=>{
    event.preventDefault()
    move='';

})
let ballX=canvas.width/2.15;
let ballY=canvas.height-150;
let ballSpeedX=4;
let ballSpeedY=4;
function Blocks(x,y){
    this.x=x;
    this.y=y;
    this.playerX=canvas.width/2.4;
    this.playerY=canvas.height-50;
    this.ballX=ballX;
    this.ballY=ballY;
    this.ballSpeedX=ballSpeedX;
    this.ballSpeedY=ballSpeedY;

    this.draw=()=>{
        //blocks
        context.beginPath();
        context.fillRect(this.x,this.y,100,20)

        //player
        context.fillRect(this.playerX,this.playerY,100,20)

        //ball
        context.arc(this.ballX,this.ballY,8,0,2 * Math.PI)
        //context.fillStyle = "white";
        context.fill();
    }
    this.unDraw=(x,y,width,height)=>{
        context.clearRect(x,y,width,height)
    }
    this.update=(figures)=>{
        this.figures=figures;
        //movement
        if(move=="ArrowRight" && this.playerX<=canvas.width-100){
            this.playerX+=10;
        }
        if(move=="ArrowLeft" && this.playerX>=0){
            this.playerX-=10;
        }
        
        //collision with borders
        if(this.ballX+8>=canvas.width || this.ballX-8<=0){
            this.ballSpeedX = (-this.ballSpeedX); 
        }
        if(this.ballY+8>=canvas.height || this.ballY-8<=0 ){//|| this.ballY<=0
            this.ballSpeedY = (-this.ballSpeedY); 
        }

        //collision with player
        if(this.ballY+8 == this.playerY && this.ballX+8 >= this.playerX && this.ballX <= this.playerX+100){
            this.ballSpeedX = (this.ballSpeedX);
            this.ballSpeedY = (-this.ballSpeedY); 
        }
        //collesion with blocks
        for(let i=0;i<this.figures.length;i++){
            if(this.ballY+8 >= this.figures[i].y && this.ballY<=this.figures[i].y+20 && this.ballX>=this.figures[i].x && this.ballX <= this.figures[i].x+100){
                this.ballSpeedX = (this.ballSpeedX);
                this.ballSpeedY = (-this.ballSpeedY);
                this.figures.forEach(figure => {
                    if(figure.x == this.figures[i].x && figure.y == this.figures[i].y){
                        let index = this.figures.indexOf(figure);
                        console.log(index)
                        this.figures.splice(index,1)
                    }
                });
            }
        }
        figures=this.figures;
        //deleate
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY;
        this.draw()
    }
}
let blocks=[]
let x=10
let y=10
for(let i=0;i<5;i++){
    x=10
    for(let j=0;j<8;j++){
        blocks.push(new Blocks(x,y));
        x+=110;
    }
    y+=50;
}

function animated(){ 
    requestAnimationFrame(animated);
    context.clearRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<blocks.length;i++){
        blocks[i].update(blocks)
    }

}
animated()
