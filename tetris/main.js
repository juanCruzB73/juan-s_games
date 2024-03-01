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
let figureY=0

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
    
        //calculate maximun height of piece
        
        this.figureHeight=(figure)=>{
            maximunFigureHeight=0;
            for(let i=0;i<figure.length;i++){
                for(let j=0;j<figure[i].length;j++){
                    if(figure[i][j]==1){
                        this.maximunFigureHeight++
                        break;
                    }
                }

            }
            return this.maximunFigureHeight
        }
        this.maximunFigureHeight=this.figureHeight(this.activeFigure[0])

        //figure down per second
        this.downPerSecond=()=>{   
            if(this.collision(0,1,this.activeFigure[0])){ 
                    this.drawOldFigure(this.activeFigure[0],this.activeFigure[1])
                    console.log("popo downSecond")
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
                        let nextY=this.y+i+y;
    
                        /*if(nextY <= 0 || nextX <= 0){
                            continue;
                        }*/
                        /*if () {
                            return true; // Collision with button
                        }*/
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

                    if(nextY <= 0 || nextX <= 0){
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
        }
        //start over
        this.startOver=()=>{
                this.x=x;
                this.y=y;
                this.activeFigure=this.newFigure(this.figures)
                //this.maximunFigureHeight=0;
                //this.figureHeight(this.activeFigure[0])
                //this.FigureWidith(this.activeFigure[0]);
        }
        //rotate pieces
        this.rotatePiece=(figure)=>{
            let newFigure=[]
            for(let i=0;i<figure.length;i++){
                let element=[]
                for(let j=0;j<figure[i].length;j++){
                    element.push(figure[j][i])
                }
                newFigure.push(element)
            }
            if(!this.collision(0,0,newFigure)){
                return newFigure
            }
        }
        //player moves
        switch (move){
            case "ArrowUp":
                this.activeFigure[0]=this.rotatePiece(this.activeFigure[0])
                this.FigureWidith(this.activeFigure[0])
                break;
            case "ArrowDown":
                if(this.collision(0,1,this.activeFigure[0])){
                    this.drawOldFigure(this.activeFigure[0],this.activeFigure[1])
                    console.log("popo arrow down")
                    this.startOver()
                }
                this.y += 1;
                break;
            case "ArrowRight":
                if(this.collision(0,-1,this.activeFigure[0])){
                    this.drawOldFigure(this.activeFigure[0],this.activeFigure[1]);
                    console.log("popo arrow right")
                    this.startOver();
                    
                }else if(!this.collisionBorders(1,0,this.activeFigure[0])){
                    this.x++;
                }
                /*if(this.collision(1,0,this.activeFigure[0])){
                    this.drawOldFigure(this.activeFigure[0],this.activeFigure[1]);
                    this.startOver();
                }else{
                    this.x++;
                }*/
                break;
            case "ArrowLeft":
                if(this.collision(0,-1,this.activeFigure[0])){
                    this.drawOldFigure(this.activeFigure[0],this.activeFigure[1]);
                    console.log("popo arrow right")
                    this.startOver();
                }else if(!this.collisionBorders(-1,0,this.activeFigure[0])){
                    this.x--
                }
                break;
            case "Enter":
                this.startOver()
                break;
        }
        if(this.y<0 && (this.collision(0,0,this.activeFigure[0]))){ 
            setBoard(board);
            unDrawFigure(this.x,this.y,this.activeFigure[0]);
            console.log("coñooo aaa")
            startGame=false
        }else{
            drawBoard()
            console.log("coñooo")
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

