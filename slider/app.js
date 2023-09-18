

// select items

const slides=document.querySelectorAll('.slide')
const nextBtn=document.querySelector('.nextBtn')
const prevBtn=document.querySelector('.prevBtn')


// add EventListenner
let count=0;
slides.forEach(function(slide){
    slide.style.zIndex=count
    count++
})
count=3
prevBtn.addEventListener('click',function(){
    count--
    if(count===0){
        prevBtn.style.display='none'
    }
    slides[count].style.zIndex=3
    slides[count+1].style.zIndex=2
    nextBtn.style.display='block'
})
nextBtn.addEventListener('click',function(){
    count++
    if(count===3){
        nextBtn.style.display='none'
    }
    slides[count].style.zIndex=3
    slides[count-1].style.zIndex=2
    prevBtn.style.display='block'
})
window.addEventListener('DOMContentLoaded',function(){
    nextBtn.style.display='none'
})