let canvas = document.querySelector('canvas')

canvas.width=(window.innerWidth/2)+(window.innerWidth/4);
canvas.height=(window.innerHeight/2)+(window.innerHeight/3);

let context=canvas.getContext('2d')

move=''

playerScore=0
botScore=0

let gameStart=false;

//event listener for key pressed
document.addEventListener("keydown",(event)=>{
    event.preventDefault();
    move=event.key;
    console.log(move)
    homeScreem()
})

context.font="3vw monospace";

//function wich strat the game if enter is pressed 
function homeScreem(){
    if(move == 'Enter' && !gameStart){
        gameStart=true
        animated()
    }
}


//event listines for key up
document.addEventListener("keyup",(event)=>{
    event.preventDefault();
    move=''
})

//ball speed
let ballXMovement=9;
let ballYMovement=9;
let xMovement=10;
let yMovement=10;

//objet that moves ball, player and bot
function Movement(x,y,ballX,ballY,botX,botY){

    //initial values
    this.x=x;
    this.y=y;
    this.ballX=ballX;
    this.ballY=ballY;
    this.botX=botX;
    this.botY=botY;
    this.xMovement = xMovement;
    this.yMovement = yMovement;
    this.ballXMovement=ballXMovement;
    this.ballYMovement=ballYMovement;
    let playerScoreText=playerScore.toString();
    let botScoreText = botScore.toString();

    //function wich draws player,bot and ball
    this.draw=()=>{
        context.beginPath()
        //score
        context.fillText('Player',canvas.width*1/10,canvas.height/10);
        context.fillText(playerScoreText,canvas.width*1/7,canvas.height/5);
        context.fillText('Machine',canvas.width/1.3,canvas.height/10);
        context.fillText(botScoreText,canvas.width/1.2,canvas.height/5);

        //player
        context.beginPath()
        context.fillRect(this.x,this.y,15,100)

        //ball
        context.beginPath()
        context.arc(this.ballX,this.ballY,10,0,2 * Math.PI)
        context.fillStyle = "white";
        context.fill();

        //bot
        context.beginPath() 
        context.fillRect(this.botX,this.botY,15,100)

    }

    //function updates positions of player bot and ball
    this.update=()=>{
        if(playerScore>5 ){
            this.yMovement=10;
            this.xMovement=10;
        }
        //prevent player to leave the map
        this.y <= 0 && move=="ArrowUp" ? move='' : move=move;
        this.y+100 >= canvas.height && move=="ArrowDown" ? move='' : move=move


        //ball ineteraction with left and right border
        if(this.ballX<=11){
            botScore += 1;
            gameStart = false
            animated()
        }
        if(this.ballX >= canvas.width-10){
            playerScore += 1;
            gameStart = false
            animated()
        }

        //ball interaction with top and down border
        if(this.ballY+15>=canvas.height || this.ballY-15<=0){
            this.ballYMovement= -this.ballYMovement
        }

        //ball interaction with player
        if(this.ballX-15 <= this.x && this.ballY >= this.y && this.ballY <= this.y+100 ){
            this.ballXMovement = -this.ballXMovement;
            this.ballYMovement = -this.ballYMovement;
        }

        //player moves based on keys
        switch (move){
            case "ArrowUp":
                this.y -= 10;
                break;
            case "ArrowDown":
                this.y += 10;
                break;
            case "Escape":
                init()
                gameStart=false;
                playerScore=0;
                botScore=0
                break;
        }
         
        //bot move down
        if(this.ballY >= this.botY && this.ballX >= canvas.width/2 && this.botY+100<=canvas.height) {
            this.botY += (yMovement)
        }

        //bot move up and prevent from leaving the map
        if(this.ballY <= this.botY && this.ballX >= canvas.width/2 && this.botY>=0) {
            this.botY -= (yMovement)
        }

        //bot interaction with ball
        if(this.ballX+15 >= this.botX && this.ballY <= this.botY+100 && this.ballY>=this.botY ){
            this.ballXMovement = -this.ballXMovement+(Math.random()*0.5);
            this.ballYMovement = -this.ballYMovement+(Math.random()*0.5);
        }

        this.ballX += this.ballXMovement;
        this.ballY += this.ballYMovement;

        this.draw()
    }
}
let game=''

//function that gives strat values to bot, player and ball and draw initial mesaage
function init(){
    let x=canvas.width/50
    let y=canvas.height/2.5
    let botX=canvas.width-38;
    let botY=canvas.height/2.5;
    let playerScoreText=playerScore.toString();
    let botScoreText = botScore.toString();
    game = new Movement(x,y,canvas.width/2,canvas.height/2,botX,botY)
    context.fillStyle = "white";
    context.fillText('Player',canvas.width*1/10,canvas.height/10);
    context.fillText(playerScoreText,canvas.width*1/7,canvas.height/5);
    context.fillText('Machine',canvas.width/1.3,canvas.height/10);
    context.fillText(botScoreText,canvas.width/1.2,canvas.height/5);
    context.fillText('press enter to start the game',canvas.width/5,canvas.height/1.5);
    context.fillText('use down and up arrows to move',canvas.width/6,canvas.height*1/2.5);
}

init()

//function that produce animations
function animated(){
    if(gameStart){
        requestAnimationFrame(animated);

        context.clearRect(0,0,canvas.width,canvas.height);
    
        game.update();
    }else{
        context.clearRect(0,0,canvas.width,canvas.height);
        init()
    }

}