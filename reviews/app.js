// local reviews data
const reviews = [
  {
    id: 1,
    name: 'susan smith',
    job: 'web developer',
    img:'https://www.course-api.com/images/people/person-1.jpeg',
    text: "I'm baby meggings twee health goth +1. Bicycle rights tumeric chartreuse before they sold out chambray pop-up. Shaman humblebrag pickled coloring book salvia hoodie, cold-pressed four dollar toast everyday carry",
  },
  {
    id: 2,
    name: 'anna johnson',
    job: 'web designer',
    img: 'https://www.course-api.com/images/people/person-2.jpeg',
    text: 'Helvetica artisan kinfolk thundercats lumbersexual blue bottle. Disrupt glossier gastropub deep v vice franzen hell of brooklyn twee enamel pin fashion axe.photo booth jean shorts artisan narwhal.',
  },
  {
    id: 3,
    name: 'peter jones',
    job: 'intern',
    img: 'https://www.course-api.com/images/people/person-4.jpeg',
    text: 'Sriracha literally flexitarian irony, vape marfa unicorn. Glossier tattooed 8-bit, fixie waistcoat offal activated charcoal slow-carb marfa hell of pabst raclette post-ironic jianbing swag.',
  },
  {
    id: 4,
    name: 'bill anderson',
    job: 'the boss',
    img: 'https://www.course-api.com/images/people/person-3.jpeg',
    text: 'Edison bulb put a bird on it humblebrag, marfa pok pok heirloom fashion axe cray stumptown venmo actually seitan. VHS farm-to-table schlitz, edison bulb pop-up 3 wolf moon tote bag street art shabby chic. ',
  },
];
const article=document.querySelector('.review')
let count=0
article.innerHTML=`<div class="img-container">
            <img src="${reviews[count].img}" id="person-img"   alt="" />
          </div>
          <h4 id="author">${reviews[count].name}</h4>
          <p id="job">${reviews[count].job}</p>
          <p id="info">
            ${reviews[count].text}
          </p>
          <div class="button-container">
            <button class="prev-btn">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button class="next-btn">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          <button class="random-btn">surprise me</button>`
//select items
const img=document.getElementById('person-img')
const author=document.getElementById('author')
const job=document.getElementById('job')
const info=document.getElementById('info')
const nextBtn=document.querySelector('.next-btn')
const prevBtn=document.querySelector('.prev-btn')
const randomBtn=document.querySelector('.random-btn')

function showPerson(){
  img.src=reviews[count].img
  author.textContent=reviews[count].name
  job.textContent=reviews[count].job
  info.textContent=reviews[count].text
}
function addToLocalStorage(){
  localStorage.setItem('list',count)
}
function getFromLocalStorage(){
  return JSON.parse(localStorage.getItem('list'));

}
function createElement(item){
  img.src = reviews[item].img;
  author.textContent = reviews[item].name;
  job.textContent = reviews[item].job;
  info.textContent = reviews[item].text;
}
nextBtn.addEventListener('click',function(){
  if(count===reviews.length-1){
    count=-1
  }
  count++;
  showPerson()
  addToLocalStorage()
})
prevBtn.addEventListener('click',function(){
  count--;
  if(count===-1){
    count=reviews.length-1
  }
  showPerson()
  addToLocalStorage()
})
randomBtn.addEventListener('click',function(){
  count = Math.floor(Math.random() * 4);
  console.log(count)
  showPerson()
  addToLocalStorage()
})
window.addEventListener('DOMContentLoaded',function(){
  const item=getFromLocalStorage()
  createElement(item)
})