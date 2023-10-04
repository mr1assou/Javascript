// create variables

const toggleBtn=document.querySelector('.nav-toggle')
const navbar=document.getElementById('nav')
const links=document.querySelector('.links')
const linksContainer=document.querySelector('.links-container')
const topLink=document.querySelector('.top-link')
const date=document.getElementById('date')
const scrollLinks=document.querySelectorAll('.scroll-link')
date.innerHTML=new Date().getFullYear()
// add event listeners

toggleBtn.addEventListener('click',function(){
    const linksHeight=links.getBoundingClientRect().height
    const linksContainerHeight=linksContainer.getBoundingClientRect().height
    if(linksContainerHeight===0){
        linksContainer.style.height=`${linksHeight}px`
    }
    else{
        linksContainer.style.height=0
    }
})
// scroll with nav fixed
window.addEventListener('scroll',function(){
    const navHeight=navbar.getBoundingClientRect().height
    const heightScroll=pageYOffset
    if(heightScroll>navHeight){
        navbar.classList.add('fixed-nav')
    }
    else{
        navbar.classList.remove('fixed-nav')
    }
    if(heightScroll>500){
        topLink.classList.add('show-link')
    }
    else{
        topLink.classList.remove('show-link')
    }
    console.log(pageYOffset)
})
// links
scrollLinks.forEach(function(link){
    link.addEventListener('click',function(e){
        e.preventDefault()
        const linksContainerHeight=linksContainer.getBoundingClientRect().height
        const navHeight=navbar.getBoundingClientRect().height
        const id=e.currentTarget.getAttribute('href').slice(1)
        const element=document.getElementById(id)
        const check=navbar.classList.contains('fixed-nav')
        // when the navlinks out of the flow
        let position=element.offsetTop-navHeight
        // end out of the flow
        if(!check){
            position-=navHeight
        }
        if(navHeight>82){
            position+=linksContainerHeight
        }
        window.scrollTo({left:0,top:position})
        linksContainer.style.height=0
    })
})




