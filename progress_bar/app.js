



// javascript

const indicator=document.querySelector('.indicator');
const nextBtn=document.querySelector('.next');
const prevBtn=document.querySelector('.prev');

increment=0;
nextBtn.addEventListener("click",()=>{
    if(increment<=60){
        increment+=30;
        indicator.style.width=`${increment}%`;
    }
})
prevBtn.addEventListener("click",()=>{
    if(increment>0){
        increment-=30;
        indicator.style.width=`${increment}%`;
    }
})