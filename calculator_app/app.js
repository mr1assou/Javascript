// javascript

const operation=document.querySelector('.operation')
const result=document.querySelector('.result')
const squares=document.querySelectorAll('.square')

// let's do our logic
let arrayOperation=[]
function pushOnArray(element){
    if(arrayOperation.length<34){
        if(element!=='AC'){
            if(element==='(' && count===0){
                arrayOperation.push('1x')    
            }
            if(element==='(' && count>0){
                arrayOperation.push('x')    
            }
            arrayOperation.push(element)
            let arrayString=arrayOperation.join('')
            operation.textContent=arrayString
            arrayString=arrayString.replaceAll('x','*').replaceAll('÷','/')
            try{
            const outcome=eval(arrayString)
                if(!isNaN(outcome)){
                    result.textContent=parseFloat(outcome.toFixed(2))
                }
            }
            catch(error){
                console.log('')
            }
        }
    }
    if(element==='AC'){
            arrayOperation=[]
            arrayString=""
            operation.textContent=""
            result.textContent="0"
        }
}
let count=0;
squares.forEach(square=>{
    square.addEventListener('click',e=>{
        const element=e.currentTarget
        if(element.classList.contains('number')){
            pushOnArray(element.textContent)
        }
        if(element.textContent==='+'){
            pushOnArray(element.textContent)
        }
        if(element.textContent==='-'){
            pushOnArray(element.textContent)
        }
        if(element.textContent==='x'){
            pushOnArray(element.textContent)
        }
        if(element.textContent==='÷'){
            pushOnArray(element.textContent)
        }
        if(element.textContent==='.'){
            pushOnArray(element.textContent)
        }
        if(element.textContent==='%'){
            pushOnArray(element.textContent)
        }
        if(element.textContent==='AC'){
            pushOnArray(element.textContent)
        }
        if(element.textContent==='(' && count===0){
            pushOnArray(element.textContent)
        }
        if(element.textContent===')'){
            pushOnArray(element.textContent)
        }
    })
})