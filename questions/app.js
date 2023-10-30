//using selectors inside the element
// traversing the dom

const btns=document.querySelectorAll('.question-btn')
const questions=document.querySelectorAll('.question')
btns.forEach(function(btn){
    btn.addEventListener('click',function(e){
        const item=e.currentTarget.parentElement.parentElement
        const check=item.classList.contains('show-text')
        if(check){
            item.classList.remove('show-text')
        }
        else{
            item.classList.add('show-text')
        }
        questions.forEach(function(question){
            if(question!==item){
               question.classList.remove('show-text') 
            }
        })
    })
})