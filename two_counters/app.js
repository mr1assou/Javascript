// select items


btns=document.querySelectorAll('.btn')

btns.forEach((btn,index)=>{
    btn.addEventListener('click',e=>{
        const lengthArray=(btns.length)/2
        if(index<lengthArray){
            calculate(e)
        }
        else{
            calculate(e)
        }
    })
})

function calculate(e){
    const counter=e.currentTarget.parentNode.previousElementSibling
    let x=parseInt(counter.textContent)
    const item=e.currentTarget
    if(item.textContent==='Decrease'){
        x--;
        counter.textContent=`${x}`
    }
    else if(item.textContent==='Reset'){
        x=0;
        counter.textContent=`${x}`
    }
    else{
        x++;
        counter.textContent=`${x}`
    }
}