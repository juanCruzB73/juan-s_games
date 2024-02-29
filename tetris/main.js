let canvas = document.querySelector('canvas');

let context=canvas.getContext('2d');

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
document.addEventListener("keydown",(event)=>{
    event.preventDefault()
    move=event.key
    console.log(move)
    homeScreen()
})

document.addEventListener("keyup",(event)=>{
    event.preventDefault()
    move='';

}) 

let columns=10;
let rows=20;
let square=30;

//board
let notOccupied="white"
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
let figureY=-2

function drawSquare(x,y,color){
    context.fillStyle = color;
    context.fillRect(x*square,y*square,square,square)
    context.strokeStyle="BLACK";
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

    //calculate widith of current figure
    this.maximunFigureWidith=0;
    this.FigureWidith=(figure)=>{
        switch(figure[0].length){
            case 2:
                this.maximunFigureWidith=2;
                break;
            case 3:
                this.maximunFigureWidith=3;
                break;
            case 4:
                this.maximunFigureWidith=4;
        }
    }
    this.FigureWidith(this.activeFigure[0])
        //calculate maximun height of piece
        this.maximunFigureHeight=0;
        this.figureHeight=(figure)=>{
            for(let i=0;i<figure.length;i++){
                for(let j=0;j<figure[i].length;j++){
                    if(figure[i][j]==1){
                        this.maximunFigureHeight++
                        break;
                    }
                }

            }
        }
        this.figureHeight(this.activeFigure[0])

        //figure down per second
        this.downPerSecond=()=>{   
            if(this.y>=20-this.maximunFigureHeight || this.collision(0,1,this.activeFigure[0])){
                this.drawOldFigure(this.activeFigure[0],this.activeFigure[1])
                this.startOver()
            }
            this.y += 1;
            
        }
        setInterval(this.downPerSecond,1000)

        //the update function
        this.update=()=>{
        
        //detect collision
        this.collision=(x,y,piece)=>{
            for(let i=0;i<piece.length;i++){//rows
                for(let j=0;j<piece[i].length;j++){
                    if(!piece[i][j]){
                        continue;
                    }
                    let nextX=this.x+j+x;
                    let nextY=this.y+i+y;

                    // skip board[-1]
                    if(nextY < 0){
                        continue;
                    }
                    //skip board[9]
                    
                    if(nextY >= rows){
                        return true;
                    }
                    if(nextX >= columns || nextX < 0 ){
                        return false
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
        }
        //start over
        this.startOver=()=>{
                this.x=x;
                this.y=y;
                this.activeFigure=this.newFigure(this.figures)
                this.maximunFigureHeight=0;
                this.figureHeight(this.activeFigure[0])
                this.FigureWidith(this.activeFigure[0]);
        }
        //rotate pieces
        
        //player moves
        switch (move){
            /*case "ArrowUp":
                this.y -= 1;
                break;*/
            case "ArrowDown":
                if(this.collision(0,1,this.activeFigure[0])){
                    this.drawOldFigure(this.activeFigure[0],this.activeFigure[1])
                    this.startOver()
                }
                this.y += 1;
                break;
            case "ArrowRight":
                this.x+this.maximunFigureWidith>=columns ? this.x=this.x : this.x++;
                if(this.collision(1,0,this.activeFigure[0])){
                    this.drawOldFigure(this.activeFigure[0],this.activeFigure[1]);
                    this.startOver();
                }
                break;
            case "ArrowLeft":
                this.x<=0 ? this.x=this.x : this.x -=1;
                if(this.collision(-1,0,this.activeFigure[0])){
                    this.drawOldFigure(this.activeFigure[0],this.activeFigure[1]);
                    this.startOver();
                }
                break;
            case "Enter":
                console.log("aasa")
                this.startOver()
                break;
        }
        if(this.y<0 && (this.collision(0,1,this.activeFigure[0]))){ 
            setBoard(board);
            unDrawFigure(this.x,this.y,this.activeFigure[0]);
            startGame=false
        }else{
            drawBoard()
            drawFigure(this.x,this.y,this.activeFigure[0],this.activeFigure[1])
        }
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
        looser=true;
        init()
    }
    
}
function init(){
    context.beginPath();
    drawBoard();
    context.font = "30px Arial";
    context.fillStyle = "black";
    looser ? context.fillText("Game over",100,100) : '';
}

init()

