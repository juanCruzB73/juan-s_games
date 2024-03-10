let gameName= document.getElementById("gameName")
let games=document.querySelectorAll("#games a")

console.log(gameName)

for(let i=0;i<games.length;i++){
    games[i].addEventListener("mouseover",()=>{
        gameName.innerHTML=games[i].name
    })
}
