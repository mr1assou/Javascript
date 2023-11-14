
// select items
const allKinds=[...document.querySelectorAll('.kinds')]
const section1=document.querySelector('.sec-1')
// create sliders
const buyProduct=document.querySelector('.buy-product')
const colorsKinds=document.querySelector('.colors-kinds')
arrayProducts=products.map(product=>{
    return `<div class="sneaker">
        <p class="price">${product.price}</p>
        <img src=${product.img} class="photo-sneaker" />
        <div class="title">
            <p>${product.title}</p>
            <h1 class="buy">Buy Now</h1>
            </div>
        </div>`
}).join('')
section1.innerHTML=arrayProducts
const allSneakers=document.querySelectorAll('.sneaker')
allSneakers.forEach((sneaker,index)=>{
    sneaker.firstElementChild.style.color=products[index].color
    sneaker.children[1].style.background=products[index].background
})

function carousel(index){
    allSneakers.forEach(sneaker=>{
        sneaker.style.transform=`translateX(-${index*100}%)`
    })
}
function createColorsSquare(index){
    const len=Object.keys(colors[index]).length-2
    let squareHtml=''
    for(let i=0;i<2;i++){
        squareHtml+='<div class="square"></div>'
    }
    colorsKinds.innerHTML=squareHtml
    const squares=[...document.querySelectorAll('.square')]
    let count=0,countSquare=0,x=0;
    const arrayColors=Object.values(colors[index])
    for(i in colors[index]){
        if(count>=len){
            squares[x].style.background=arrayColors[countSquare]
            x++;
            countSquare++;
        }
        if(count<len){
            countSquare++;
        }
        count++;
    }
    let mapColors='';
    count=0;
    for(i in colors[index]){
        if(count<len){
            mapColors+=`<img src="${arrayColors[count]}" alt="" class="buy-product" />`
            count++;
        }
    }
    const imgShow=document.querySelector('.img-show')
    imgShow.innerHTML=mapColors
    const cubes=document.querySelectorAll('.square')
    const buyProduct=document.querySelectorAll('.buy-product')
    cubes.forEach((cube,i)=>{
            cube.addEventListener('click',e=>{
                buyProduct.forEach(product=>{
                product.style.transform=`translateX(-${i*100}%)`
            })
        })
    })
}
// let's move slider
allKinds.forEach((kind,index)=>{
    kind.addEventListener('click',()=>{
        carousel(index)
        buyProduct.src=products[index].img
        createColorsSquare(index)
    })
})
// product show
window.addEventListener('DOMContentLoaded',()=>{
    const len=Object.keys(colors[0]).length-2
    let squareHtml=''
    for(let i=0;i<2;i++){
        squareHtml+='<div class="square"></div>'
    }
    colorsKinds.innerHTML=squareHtml
    const squares=[...document.querySelectorAll('.square')]
    let count=0,countSquare=0,x=0;
    const arrayColors=Object.values(colors[0])
    for(i in colors[0]){
        if(count>=len){
            squares[x].style.background=arrayColors[countSquare]
            x++;
            countSquare++;
        }
        if(count<len){
            countSquare++;
        }
        count++;
    }
    let mapColors='';
    count=0;
    for(i in colors[0]){
        if(count<len){
            mapColors+=`<img src="${arrayColors[count]}" alt="" class="buy-product" />`
            count++;
        }
    }
    const imgShow=document.querySelector('.img-show')
    imgShow.innerHTML=mapColors
    const cubes=document.querySelectorAll('.square')
    const buyProduct=document.querySelectorAll('.buy-product')
    cubes.forEach((cube,i)=>{
            cube.addEventListener('click',e=>{
                buyProduct.forEach(product=>{
                product.style.transform=`translateX(-${i*100}%)`
            })
        })
    })
})
// 
const topPage=document.querySelector('.top')

// add Event Listenner
topPage.addEventListener('click',()=>{
    // window.scrollTo({left:0,top:0})
    // console.log(topPage.getBoundingClientRect())
    console.log('@@@')
})

