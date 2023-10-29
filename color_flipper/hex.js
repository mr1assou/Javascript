const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const btn=document.getElementById('btn')
const color=document.querySelector('.color')

btn.addEventListener('click',function(){
    let hexcolor='#'
    for (let i=1;i<7;i++){
        let x=Math.floor(Math.random()*hex.length)
        hexcolor=hexcolor+hex[x]
    }
    document.body.style.backgroundColor=hexcolor
    color.textContent=hexcolor
})