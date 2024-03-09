let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
canvas.width=innerWidth/2;
canvas.height=innerHeight/1.5;

context.beginPath();

let gameOn=false
let size=30;
let snakeX=100;
let snakeY=100;
let move=''
let moves=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Escape","Enter"]
document.addEventListener("keydown",(event)=>{
    event.preventDefault();
    previusMove=move
    move = event.key;
    console.log(move)
    if(moves.includes(move)){
        if(gameOn==false && move=="Enter"){
            gameOn=true;
            size=30;
            long=1
            snakeX=100;
            snakeY=100;
            createSnake()
            placeFood()
        }
    }else{
        move=previusMove
    }
})

function Game(snakeX,snakeY){
    this.snakeX=snakeX;
    this.snakeY=snakeY;

    this.draw=()=>{
        //snake
        context.fillStyle = 'red';
        context.fillRect(this.snakeX,this.snakeY,size,size);
        context.strokeStyle="#2C2C2C";
        context.strokeRect(this.snakeX,this.snakeY,size,size);
        //food
        context.fillStyle = '#7FFF00';
        context.fillRect(foodX,foodY,foodSize,foodSize);
        context.strokeStyle="#2C2C2C";
        context.strokeRect(foodX,foodY,foodSize,foodSize);
    }

    this.update=(x,y)=>{
          this.snakeX=x;
          this.snakeY=y  
    }
}
let snake=[]
let long=1;
let foodX
let foodY
let foodSize = 15;

function placeFood(){
    foodX=Math.floor(Math.random()*canvas.width)+1; 
    foodY=Math.floor(Math.random()*canvas.height)-1; 
}
function createSnake(){
    snake=[]
    for(let i=long;i>0;i--){
        let snakePiece = new Game(snakeX,snakeY);
        snake.push(snakePiece)
        snakeX=snakeX-20
    }
}

createSnake()

placeFood()

function checkCollision(){
    let headX=snake[0].snakeX;
    let headY=snake[0].snakeY;
    for(let i=1;i<snake.length;i++){
        if(headX===snake[i].snakeX && headY===snake[i].snakeY){
            return true;
        }
    }
    if(headY<=0 || headY>=canvas.height-size || headX <= 0 || headX+size >= canvas.width){
        return true;
    }
    return false;
}

function eatFood(){
    let headX=snake[0].snakeX;
    let headY=snake[0].snakeY;
    if(headY <= foodY && headY+size+5>=foodY && headX <= foodX+5 && headX+size >= foodX){
        context.clearRect(foodX,foodY,foodSize,foodSize)
        return true;
    }
    return false
}
function moveSnake(){
    let headX=snake[0].snakeX;
    let headY=snake[0].snakeY;
    switch(move){
        case "ArrowUp":
            if(previusMove=="ArrowDown" && snake.length>1){
                checkCollision() ? gameOn=false : headY+=size;
            }else{
                checkCollision() ? gameOn=false : headY-=size;
            }
            if(eatFood()){
                placeFood()
                long++;
                createSnake()
            } 
            break;
        case "ArrowDown":
            if(previusMove=="ArrowUp" && snake.length>1){
                checkCollision() ? gameOn=false : headY-=size;
            }else{
                checkCollision() ? gameOn=false : headY+=size;
            }
            if(eatFood()){
                placeFood()
                long++;
                createSnake()
            } 
            break;
        case "ArrowLeft":
            if(previusMove=="ArrowRight" && snake.length>1){
                checkCollision() ? gameOn=false : headX+=size;
            }else{
                checkCollision() ? gameOn=false : headX-=size;
            }
            if(eatFood()){
                placeFood()
                long++;
                createSnake()
            }
            break
        case "ArrowRight":
            if(previusMove=="ArrowLeft" && snake.length>1){
                checkCollision() ? gameOn=false : headX-=size;
            }else{
                checkCollision() ? gameOn=false : headX+=size;
            }
            if(eatFood() ){
                placeFood()
                long++;
                createSnake()
            }
            break;
        case "Escape":
            gameOn=false
            break;
        default:
            move=previusMove;
            break;
    }
    for(let i=snake.length-1;i>0;i--){
        snake[i].update(snake[i-1].snakeX,snake[i-1].snakeY);
    }
    snake[0].update(headX,headY);
}
function animate(){
    setInterval(()=>{
        if(gameOn){
            context.clearRect(0,0,canvas.width,canvas.height);
            moveSnake();
            for(let i=0;i<snake.length;i++){
                snake[i].draw()
                console.log(long)
            }
        }else{
            context.clearRect(0,0,canvas.width,canvas.height);
            context.font = "30px Arial";
            context.fillStyle = "white";
            context.fillText("Game over",canvas.width/2.6,canvas.height/2)
        }
    },100)
}
animate()