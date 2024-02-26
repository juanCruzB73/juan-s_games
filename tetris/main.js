let canvas = document.querySelector('canvas');

let context=canvas.getContext('2d');

canvas.width=300
canvas.height=600

let figure1=[
    [1,1,0],
    [1,1,0],
    [0,0,0]
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

console.log(move)

let columns=10;
let rows=20;
let square=30;

function drawSquare(x,y,color){
    context.fillStyle = color;
    context.fillRect(x*square,y*square,square,square)
    context.strokeStyle="BLACK";
    context.strokeRect(x*square,y*square,square,square)
}
function Game(){

}

//figures

let figureX=3
let figureY=0

function Game(x,y,figures){
    this.x=x;
    this.y=y;
    this.figures=figures;

    //board
    this.drawBoard=()=>{
        for(let i=0;i<columns;i++){
            for(let j=0;j<rows;j++){
                drawSquare(i,j,"white")
            }
        }
    }
    //chose figure
    this.randomFigure=(pieces)=>{
        let active =  Math.floor(Math.random() * pieces.length)
        return [pieces[active][0],pieces[active][1]]
    }
    this.activeFigure=this.randomFigure(figures)

    //draw the figure
    this.drawFigure = () => {
        for(let i=0;i<this.activeFigure[0].length;i++){
            for(let j=0;j<this.activeFigure[0][i].length;j++){
                if(this.activeFigure[0][i][j]==1){
                    drawSquare(x+j,y+i,this.activeFigure[1])
                }
            }
        }
    }


}

let figures=[[figure1,"yellow"],[figure2,"green"],[figure3,"red"],[figure4,"purple"],[figure5,"blue"],[figure6,"pink"],[figure7,"orange"]];

let program = new Game(figureX,figureY,figures)

function animate(){
    requestAnimationFrame(animate);
    context.clearRect(0,0,canvas.width,canvas.height);
    program.drawBoard()
    program.drawFigure()
}
animate()