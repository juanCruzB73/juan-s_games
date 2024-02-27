let canvas = document.querySelector('canvas');

let context=canvas.getContext('2d');

canvas.width=300
canvas.height=600

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
})

document.addEventListener("keyup",(event)=>{
    event.preventDefault()
    move='';
})
console.log(move)

let columns=10;
let rows=20;
let square=30;

//board
let notOccupied="white"
let board=[]
for(let i=0;i<rows;i++){
    board[i]=[];
    for(let j=0;j<columns;j++){
        board[i][j]=notOccupied;    
    }
}
let drawBoard=()=>{
    for(let i=0;i<columns;i++){
        for(let j=0;j<rows;j++){
            drawSquare(i,j,board[i][j])
        }
    }
}
drawBoard()

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
    this.maximunFigureWidith=0;
    this.FigureWidith=(figure)=>{
        switch(figure[0].length){
            case 2:
                this.maximunFigureWidith=7;
                break;
            case 3:
                this.maximunFigureWidith=6;
                break;
            case 4:
                this.maximunFigureWidith=5
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
            if(this.y<20-this.maximunFigureHeight){
                unDrawFigure(this.x,this.y,this.activeFigure[0]);
                this.y += 1;
            }
        }
        setInterval(this.downPerSecond,1000)

        this.update=()=>{
            if(board[19][0]!="white"){
                console.log("dsdsd")
            }
        //player moves
        switch (move){
            /*case "ArrowUp":
                this.y -= 1;
                break;*/
            case "ArrowDown":
                if(this.y>=20-this.maximunFigureHeight){
                    //this.oldPice=[this.x,this.y,this.activeFigure[0],this.activeFigure[1]];
                    //this.playedPices.push(this.oldPice);
                    for(let i=0;i<columns;i++){
                        for(let j=0;j<rows;j++){
                            board[j][i]=this.activeFigure[1]
                        }
                    }
                    this.x=x;
                    this.y=y;
                    this.activeFigure=this.newFigure(this.figures)
                    this.maximunFigureHeight=0;
                    this.figureHeight(this.activeFigure[0])
                    this.FigureWidith(this.activeFigure[0]);
                }else{
                    unDrawFigure(this.x,this.y,this.activeFigure[0])
                    this.y += 1;
                }
                break;
            case "ArrowRight":
                unDrawFigure(this.x,this.y,this.activeFigure[0])
                this.x>this.maximunFigureWidith ? this.x = this.x : this.x +=1;
                break;
            case "ArrowLeft":
                unDrawFigure(this.x,this.y,this.activeFigure[0])
                this.x<=0 ? this.x=this.x : this.x -=1;
                break;
        }
        /*if(this.playedPices.length>0){
            for(let i=0;i<this.playedPices.length;i++){
                drawFigure(this.playedPices[i][0],this.playedPices[i][1],this.playedPices[i][2],this.playedPices[i][3])
            }
        }*/
        
        drawFigure(this.x,this.y,this.activeFigure[0],this.activeFigure[1])
    }


}

let figures=[[figure1,"yellow"],[figure2,"green"],[figure3,"red"],[figure4,"purple"],[figure5,"blue"],[figure6,"pink"],[figure7,"orange"]];

let program = new Game(figureX,figureY,figures)

function animate(){
    requestAnimationFrame(animate);
    
    program.update()
}
animate()