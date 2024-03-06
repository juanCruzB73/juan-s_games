let canvas = document.querySelector('canvas');

let context=canvas.getContext('2d');

canvas.width=900
canvas.height=500
let move=''
let gameStart=false
let looser=false
document.addEventListener("keydown",(event)=>{
    event.preventDefault();
    move=event.key;
    if(move=='Enter' && !gameStart){
        homePage()
    }
})

document.addEventListener("keyup",(event)=>{
    event.preventDefault()
    move='';

})
let ballX=canvas.width/2.15;
let ballY=canvas.height-150;
let ballSpeedX=4;
let ballSpeedY=4;
function Blocks(x,y,colors){
    this.x=x;
    this.y=y;
    this.playerX=canvas.width/2.4;
    this.playerY=canvas.height-50;
    this.ballX=ballX;
    this.ballY=ballY;
    this.ballSpeedX=ballSpeedX;
    this.ballSpeedY=ballSpeedY;
    this.collided=false;

    this.draw=()=>{
        //blocks
        context.beginPath();
        context.fillStyle=colors;
        context.fillRect(this.x,this.y,100,20);
        context.strokeStyle='#2C2C2C';
        context.strokeRect(this.x,this.y,100,20);

        //player
        context.fillStyle='white';
        context.strokeStyle='#2C2C2C';
        context.fillRect(this.playerX,this.playerY,100,20);
        context.strokeRect(this.playerX,this.playerY,100,20);

        //ball
        context.arc(this.ballX,this.ballY,8,0,2 * Math.PI)
        //context.fillStyle = "white";
        context.fill();
    }
    this.unDraw=(x,y,width,height)=>{
        context.clearRect(x,y,width,height)
    }
    this.update=(figures)=>{
        //lifes<0?gameStart=false:gameStart=true
        this.figures=figures;
        //movement
        if(move=="ArrowRight" && this.playerX<=canvas.width-100){
            this.playerX+=10;
        }
        if(move=="ArrowLeft" && this.playerX>=0){
            this.playerX-=10;
        }
        if(move=="Enter"){
            this.ballX=ballX;
            this.ballY=ballY;
            gameStart=true;
            looser=false;
            //homePage()
        }
        //collision with borders
        if(this.ballY+8>=canvas.height){
            gameStart=false;
            looser=true;
        }
        if(this.ballX+8>=canvas.width || this.ballX-8<=0){
            this.ballSpeedX = (-this.ballSpeedX); 
        }
        if( this.ballY-8<=0 ){//|| this.ballY<=0
            this.ballSpeedY = (-this.ballSpeedY); 
        }

        //collision with player
        if(this.ballY+8 == this.playerY && this.ballX >= this.playerX && this.ballX-8 <= this.playerX+100){
            this.ballSpeedX = (this.ballSpeedX);
            this.ballSpeedY = (-this.ballSpeedY); 
        }

        //collesion with blocks
        for(let i=0;i<this.figures.length;i++){
            //deleate
            if(this.ballY+8 >= this.figures[i].y && this.ballY<=this.figures[i].y+20 && this.ballX>=this.figures[i].x && this.ballX <= this.figures[i].x+100){
                this.ballSpeedX = (this.ballSpeedX);
                this.ballSpeedY = (-this.ballSpeedY);
                this.figures[i].collided=true;
            }
        }
        //console.log(lifes)
        this.ballX += this.ballSpeedX;
        this.ballY += this.ballSpeedY
    }
}

let blocks=[];
let x=10;
let y=10;
let colors=['#B0E0E6','#7B68EE','#0000CD','#4B0082','#9400D3'];
gameStart=false;
context.font = "30px Arial";
context.fillStyle = "white";
context.fillText('PRESS ENTER',canvas.width/2.6,canvas.height/2);
for(let i=0;i<5;i++){
    x=10;
    for(let j=0;j<8;j++){
        blocks.push(new Blocks(x,y,colors[i]));
        x+=110;
    }
    y+=50;
}
function homePage(){
    if(move=='Enter' && !gameStart){
        gameStart=true
        looser=false;
        animated()
    }
}
function animated(){
    if(gameStart){
        if(blocks.length<=0){
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.fillText('YOU WIN',canvas.width/2.6,canvas.height/2);
            gameStart==false
        }else{
            requestAnimationFrame(animated);
            context.clearRect(0,0,canvas.width,canvas.height);

            let collidedBlocks=[];

            for(let i=0;i<blocks.length;i++){
                blocks[i].update(blocks)

                if(blocks[i].collided){
                    collidedBlocks.push(i)
                }else{
                    blocks[i].draw()
                }
            }

            for(let i=collidedBlocks.length-1;i>=0;i--){
                blocks.splice(collidedBlocks[i],1);
            }
            }
    }else if(!gameStart && looser){
        context.beginPath()
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.fillText('GAME OVER',canvas.width/2.6,canvas.height/2);
    }else{
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.fillText('PRESS ENTER',canvas.width/2.6,canvas.height/2);
    }

}
homePage()
//animated()
