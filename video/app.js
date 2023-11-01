// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.

const btnSwitch=document.querySelector('.switch-btn')
const video=document.querySelector('.video-container')
const preloader=document.querySelector('.preloader')
// console.log(video)
// functions
function funcSwitch(){
    const btn=btnSwitch.classList.contains('slide')
    if(btn){
        btnSwitch.classList.remove('slide')
        video.play()
    }
    else{
        btnSwitch.classList.add('slide')
        video.pause()
    }
}
function funcPreloader(){
    preloader.classList.add('hide-preloader')
}
// eventlistenner
btnSwitch.addEventListener('click',funcSwitch)
window.addEventListener('load',funcPreloader)