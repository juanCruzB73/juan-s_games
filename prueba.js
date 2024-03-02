let a=[]
for(let i=0;i<5;i++){
    let b=[]
    for(let j=0;j<5;j++){
        b.push(j)
    }
    a.push(b)
}
console.log(a)
let c=[]
for(let i=0;i<5;i++){
    let d=[]
    for(let j=4;j>=0;j--){
        d.push(a[j][i])
    }
    c.push(d)
}