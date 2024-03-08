let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
canvas.width=innerWidth/1.5;
canvas.height=innerHeight/1.2;

let size=20;
let snakeX=100;
let snakeY=100;
let lastFrameTime = 0;
let frameDelay = 200;

context.beginPath();

let move=''
document.addEventListener("keydown",(event)=>{
    event.preventDefault();
    move = event.key;
    console.log(move)
})


function Game(snakeX,snakeY){
    this.snakeX=snakeX;
    this.snakeY=snakeY;

    this.draw=()=>{
        context.fillStyle = 'red';
        context.fillRect(this.snakeX,this.snakeY,size,size);
        context.strokeStyle="#2C2C2C";
        context.strokeRect(this.snakeX,this.snakeY,size,size)
    }

    this.update=(x,y)=>{
          this.snakeX=x;
          this.snakeY=y  
    }
}
let snake=[]
let long=5;
//let snakePart=''

function createSnake(){
    for(let i=0;i<long;i++){
        let snakePiece = new Game(snakeX,snakeY);
        snake.push(snakePiece)
        snakeX=snakeX-20
    }
}
createSnake()

function moveSnake(){
    let headX=snake[0].snakeX;
    let headY=snake[0].snakeY;
    switch(move){
        case "ArrowUp":
            headY-=size;
            break;
        case "ArrowDown":
            headY+=size;
            break;
        case "ArrowLeft":
            headX-=size;
            break
        case "ArrowRight":
            headX+=size;
            break;
    }
    for(let i=snake.length-1;i>0;i--){
        snake[i].update(snake[i-1].snakeX,snake[i-1].snakeY);
    }
    snake[0].update(headX,headY);
}
function animate(){
    
    setInterval(()=>{
        context.clearRect(0,0,canvas.width,canvas.height);
        moveSnake();
        for(let i=0;i<snake.length;i++){
            snake[i].draw()
        }
    },100)
    
}
animate()