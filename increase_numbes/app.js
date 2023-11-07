
// select variables

const numbers=[...document.querySelectorAll('.number')]

function updateNumbers(element){
    const value=parseInt(element.dataset.value)
    const increment=Math.ceil(value/1000)
    let initialValue=0;
    const increaseCount=setInterval(()=>{
        initialValue+=increment
        if(initialValue>value){
            element.textContent=`${value}+`
            clearInterval(increaseCount)
        }
        if(initialValue<value){
            element.textContent=`${initialValue}+`
        }
    },1)
}

// call function
numbers.forEach(item=>{
    updateNumbers(item)
})