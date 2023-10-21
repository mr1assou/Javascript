

// select items
const titles=document.querySelectorAll('.tab-btn')
const content=document.querySelectorAll('.content')
// add Event Listenner

titles.forEach(function(title,index){
    title.addEventListener('click',function(){
        titles.forEach(function(title,index){
            title.classList.remove('active')
            content[index].classList.remove('active')
        })
        title.classList.add('active')
        content[index].classList.add('active')
        addToLocalStorage(index)
    })
})
// add to local storage
function addToLocalStorage(index){
    const grocery = {index:index};
    localStorage.setItem('list', JSON.stringify(grocery));
}
window.addEventListener('DOMContentLoaded',function(){
    const items=JSON.parse(localStorage.getItem('list'))
    const id=items.index
    titles.forEach(function(title,index){
        title.classList.remove('active')
        content[index].classList.remove('active')
    })
    titles[id].classList.add('active')
    content[id].classList.add('active')
})