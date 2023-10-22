
// select elemnts
const columns=document.querySelectorAll('.col')
const overflowImg=document.querySelector('.overflow-img')
const modal=document.querySelector('.modal')
const container=document.querySelector('.container')
const bottomImages=document.querySelector('.bottom-images')
const closeBtn=document.querySelector('.close-btn')
const titleImg=document.querySelector('.title-img')
// Functions
function natureFilter(item){
  const element=item.firstElementChild
  if(element.src.includes('nature')){
    return element
  }
}
function cityFilter(item){
  const element=item.firstElementChild
  if(element.src.includes('city')){
    return element
  }
}
function mapFunc(image){
  const item=image.firstElementChild.getAttribute('title')
  return `<img src="./images/${item}.jpeg" class="img-2" alt="" />`
}
function addBottomImages(array){
  array.forEach((item,index)=>{
    item=`<div class="col-2">`+item+`</div>`
    array[index]=item
  })
  const elements=array.join("")
  const substring=`class="img-2"`
  const stringUpdate=elements.replaceAll(substring,"")
  return stringUpdate
}
// add Event Listenner
let counter=1;
columns.forEach((column,index)=>{
  const child=column.firstElementChild
  if(child.src.includes('nature')){
    child.setAttribute('title',`nature-${index+1}`)
  }
  if(child.src.includes('city')){
    child.setAttribute('title',`city-${counter++}`)
  }
})
function sortingArray(element,array){
  const title=element.title
  let secondArray;
  let position;
  array.forEach((item,index)=>{
    if(item.includes(title)){
      secondArray=array.slice(index)
      position=index
    }  
  })
  array.forEach((item,index)=>{
    if(index<position){
      secondArray.push(item)
    }     
  })
  return secondArray
}
function titleContent(array){
  titleImg.textContent=array[cmp].title
}
columns.forEach((column)=>{
  column.addEventListener('click',e=>{
    modal.style.display='block'
    container.style.display='none'
    const image=e.target
    const arrayColumns=Array.from(columns)
    if(image.src.includes('nature')){
      const natureArray=arrayColumns.filter(natureFilter)
      const natureArrayMap=natureArray.map(mapFunc)
      const secondArray=sortingArray(image,natureArrayMap)
      overflowImg.innerHTML=secondArray.join("")
      titleImg.textContent="";
      const stringUpdate1=addBottomImages(natureArrayMap)
      bottomImages.innerHTML=stringUpdate1
    }
    if(image.src.includes('city')){
      const cityArray=arrayColumns.filter(cityFilter)
      const cityArrayMap=cityArray.map(mapFunc)
      const secondArrayCity=sortingArray(image,cityArrayMap)
      overflowImg.innerHTML=secondArrayCity.join("")
      titleImg.textContent="";
      const stringUpdate2=addBottomImages(cityArrayMap)
      bottomImages.innerHTML=stringUpdate2
    }
    // bottom images
    const bottomImg=document.querySelectorAll('.col-2')
    const columnImages=document.querySelectorAll('.img-2')
    let x=1;
    columnImages.forEach((column,index)=>{
    if(column.src.includes('nature')){
      column.setAttribute('title',`nature-${index+1}`)
    }
    if(column.src.includes('city')){
      column.setAttribute('title',`city-${x++}`)
      }
    })
    bottomImg.forEach((image,index)=>{
      image.addEventListener('click',()=>{
        if(index>cmp){
          cmp=index
          carousel(columnImages)
        }
        if(index<cmp){
          cmp=index
          carousel(columnImages)
        }
      })
    })
    
  })
})
// close Btn let's do our logic
closeBtn.addEventListener('click',()=>{
  modal.style.display='none'
  container.style.display='block'
})
// carousiel
const nextBtn=document.querySelector('.next-btn')
const prevBtn=document.querySelector('.prev-btn')
let cmp=0;
function carousel(array){
  array.forEach((image)=>{
    image.style.transform=`translateX(${-cmp*100}%)`
  })
}
nextBtn.addEventListener('click',()=>{
  const columnImages=document.querySelectorAll('.img-2')
  cmp++;
  carousel(columnImages)
  if(cmp>columnImages.length-1){
    cmp=0;
    carousel(columnImages)
  }
  else{
    carousel(columnImages)
  }
  // titleContent(columnImages)
})
prevBtn.addEventListener('click',()=>{
  const columnImages=document.querySelectorAll('.img-2')
  cmp--;
  if(cmp<0){
    cmp=columnImages.length-1
    carousel(columnImages)
  }
  else{
    carousel(columnImages)
  }
  // titleContent(columnImages)
})





