let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');
canvas.width=innerWidth/1.5;
canvas.height=innerHeight/1.2;

context.beginPath();

let move=''
document.addEventListener("keydown",(event)=>{
    event.preventDefault();
    move = event.key;
    console.log(move)
})
document.addEventListener("keyup",(event)=>{
    event.preventDefault();
    move = '';
    console.log(move)
})
let size=20;
function Game(snakeX,snakeY){
    this.snakeX=snakeX;
    this.snakeY=snakeY;

    this.draw=()=>{
        context.fillStyle = 'red';
        context.fillRect(this.snakeX,this.snakeY,size,size);
        context.strokeStyle="#2C2C2C";
        context.strokeRect(this.snakeX,this.snakeY,size,size)
    }

    this.update=()=>{
        switch(move){
            case "ArrowUp":
                this.snakeY-=20;
                break;
            case "ArrowDown":
                this.snakeY+=20
                break;
            case "ArrowRight":
                this.snakeX+=20
                break;
            case "ArrowLeft":
                this.snakeX-=20;
                break;
        }
    }
}
let snake=[]
let long=5;

function createSnake(){
    let snakeX=100;
    let snakeY=100;
    for(let i=0;i<long;i++){
        let snakePiece = new Game(snakeX,snakeY);
        snake.push(snakePiece)
        snakeX=snakeX-20
    }
}
createSnake()
function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(let i=0;i<long;i++){
        snake[i].update();
        snake[i].draw()
    }
    
}
animate()