// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class


const toggleBtn=document.querySelector('.nav-toggle')
const links=document.querySelector('.links')
toggleBtn.addEventListener('click',function(){
    // links.classList.add('show-links')
    if(links.classList.contains('show-links')){
        links.classList.remove('show-links')
    }
    else{
        links.classList.add('show-links')
    }
})
