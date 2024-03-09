let canvas = document.querySelector('canvas');

let context=canvas.getContext('2d');

let score=document.getElementById('score')

let currentScore=0;
canvas.width=300
canvas.height=600
let startGame=false;
let looser=false;

let figure1=[
    [1,1],
    [1,1]
]
let figure2=[
    [1,1,0],
    [0,1,1],
    [0,0,0]
]
let figure3=[
    [0,1,1],
    [1,1,0],
    [0,0,0]
]
let figure4=[
    [1,1,1],
    [0,1,0],
    [0,0,0]
]
let figure5=[
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
]
let figure6=[
    [1,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
]
let figure7=[
    [0,0,0,1],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
]

//event listeners
move=''
document.addEventListener("keydown", (event) => {
    event.preventDefault();
    move = event.key;
    homeScreen();
});

document.addEventListener("keyup",(event)=>{
    event.preventDefault()
    move='';

})

let columns=10;
let rows=20;
let square=30;

//board
let notOccupied="#101010"
let board=[]

let setBoard=(board)=>{
    for(let i=0;i<rows;i++){
        board[i]=[]
        for(let j=0;j<columns;j++){
            board[i][j]=notOccupied;    
        }
    }
}

setBoard(board)

let drawBoard=()=>{
    for(let i=0;i<columns;i++){
        for(let j=0;j<rows;j++){
            drawSquare(i,j,board[j][i])
        }
    }
}
//drawBoard()

//figures
let figureX=3
let figureY=-1

function drawSquare(x,y,color){
    context.fillStyle = color;
    context.fillRect(x*square,y*square,square,square)
    context.strokeStyle="#2C2C2C";
    context.strokeRect(x*square,y*square,square,square)
}

//draw a figure
let drawFigure = (x,y,figure,color) => {
    for(let i=0;i<figure.length;i++){
        for(let j=0;j<figure[i].length;j++){
            if(figure[i][j]==1){
                drawSquare(x+j,y+i,color)
            }
        }
        
    }
}
let unDrawFigure = (x,y,figure) => {
    for(let i=0;i<figure.length;i++){
        for(let j=0;j<figure[i].length;j++){
            if(figure[i][j]==1){
                drawSquare(x+j,y+i,notOccupied)
            }
        }
        
    }
}
//check for collition
let changes=0
function Game(x,y,figures){
    this.x=x;
    this.y=y;
    this.figures=figures;
    this.playedPices=[]

    //new figure
    this.newFigure=(pieces)=>{
        let active =  Math.floor(Math.random() * pieces.length)
        return [pieces[active][0],pieces[active][1]]
    }
    this.activeFigure=this.newFigure(this.figures)
        //figure down per second
        this.downPerSecond=()=>{   
            if(this.collision(0,1,this.activeFigure[0])){ 
                    this.drawOldFigure(this.activeFigure[0],this.activeFigure[1])
                    this.startOver()}
            this.y += 1;
            
        }
        setInterval(this.downPerSecond,1000)

        //the update function
        this.update=()=>{
            this.collisionBorders=(x,y,piece)=>{
                for(let i=0;i<piece.length;i++){//rows
                    for(let j=0;j<piece[i].length;j++){
    
                        if(!piece[i][j]){
                            continue;
                        }
                        
                        let nextX=this.x+j+x;
                        
                        if ( nextX < 0 || nextX >= columns) {
                            return true; // Collision with boundaries
                        }
                    }
                }
                return false
            }
        //detect collision
        this.collision=(x,y,piece)=>{
            for(let i=0;i<piece.length;i++){//rows
                for(let j=0;j<piece[i].length;j++){

                    if(!piece[i][j]){
                        continue;
                    }
                    
                    let nextX=this.x+j+x;
                    let nextY=this.y+i+y;

                    if(nextY <= 0 ){
                        continue;
                    }
                    if (nextY < 0 ||  nextY >= rows) {
                        return true; // Collision with boundaries
                    }
                    //check for old figures
                    if(board[nextY][nextX] != notOccupied){
                        return true;
                    }
                }
            }
            return false
        }
        //draw the old piece and start the new one
        this.drawOldFigure = (figure, color) => {
            for (let i = 0; i < figure.length; i++) {
                for (let j = 0; j < figure[i].length; j++) {
                    if (figure[i][j] == 1) {
                        board[this.y + i][this.x + j] = color;
                    }
                }
            }
            for(let i=0;i<rows;i++){
                let fullRow=true;
                for(let j=0;j<columns;j++){
                    fullRow=fullRow && (board[i][j]!=notOccupied)
                }
                if(fullRow){
                    currentScore+=100
                    for(let k=i;k>1;k--){
                        for(let l=0;l<columns;l++){
                            board[k][l]=board[k-1][l]
                        }
                    }
                    for(let m=0;m<columns;m++){
                        board[0][m]=notOccupied
                    }
                }
            }
        }
        //start over
        this.startOver=()=>{
                this.x=x;
                this.y=y;
                this.activeFigure=this.newFigure(this.figures)
        }
        //rotate pieces
        
        this.rotatePiece=(figure)=>{
            let newFigure=[]
            if(changes%2==0){
                for(let i=figure.length-1;i>=0;i--){
                    let element=[]
                    for(let j=figure[i].length-1;j>=0;j--){
                        element.push(figure[j][i])
                    }
                    newFigure.push(element)
                }
            }else{
                for(let i=0;i<figure.length;i++){
                    let element=[]
                    for(let j=0;j<figure[i].length;j++){
                        element.push(figure[j][i])
                    }
                    newFigure.push(element)
                }
            }
            if(changes<4){
                changes++
            }else{
                changes=0;
            }
            if(!this.collisionBorders(0,0,newFigure) && (!this.collision(0,0,newFigure))){
                return newFigure
            }
            return figure
        }
        //player moves
        switch (move){
            case "ArrowUp":
                this.activeFigure[0]=this.rotatePiece(this.activeFigure[0])
                console.log(changes)
                move='';
                break;
            case "ArrowDown":
                if(!this.collision(0,1,this.activeFigure[0])){
                    this.y += 1;
                    move='';
                }
                break;
            case "ArrowRight":
                if(!this.collisionBorders(1,0,this.activeFigure[0])&&!this.collision(1,0,this.activeFigure[0])){
                    this.x++;
                    move='';
                }
                break;
            case "ArrowLeft":
                if(!this.collisionBorders(-1,0,this.activeFigure[0])&&!this.collision(-1,0,this.activeFigure[0])){
                    this.x--
                    move='';
                }
                break;
            case "Enter":
                this.startOver()
                setBoard(board)
                break;
            case "Escape":
                startGame=false
                break
            case " ":
                while(!this.collision(0,1,this.activeFigure[0])){
                    this.y++
                }
                move=""
                break;
        }
        if(this.y<=0 && (this.collision(0,0,this.activeFigure[0]))){ 
            setBoard(board);
            unDrawFigure(this.x,this.y,this.activeFigure[0]);
            looser=true;
            startGame=false
        }else{
            drawBoard()
            drawFigure(this.x,this.y,this.activeFigure[0],this.activeFigure[1])
        }
        score.innerHTML=currentScore
    }
}
let figures=[[figure1,"yellow"],[figure2,"green"],[figure3,"red"],[figure4,"purple"],[figure5,"blue"],[figure6,"pink"],[figure7,"orange"]];

let program = new Game(figureX,figureY,figures)

let homeScreen=()=>{
    if(!startGame && move=='Enter'){
        startGame=true;
        animate()
    }
}

function animate(){
    if(startGame){
        requestAnimationFrame(animate);
        program.update()
    }else{
        init()
    }
    
}
function init(){
    context.beginPath();
    drawBoard();
    context.font = "30px Arial";
    context.fillStyle = "white";
    looser ? context.fillText("Game over",canvas.width/4,canvas.height/2) : '';
}

init()

