

btnContainer=document.querySelector('.button-container')
btns=document.querySelectorAll('.btn')
const value=document.getElementById('value')
let count=0
btns.forEach(function(item){
    item.addEventListener('click',function(e){
        const btn=e.target
        if(btn.textContent==='decrease'){
            count--;
            value.innerHTML=count
            value.style.color='red'
        }
        else if(btn.textContent==='increase'){
            count++;
            value.innerHTML=count
            value.style.color='green'
        }
        else{
            count=0;
            value.innerHTML=count
            value.style.color='black'
        }
    })
}) 