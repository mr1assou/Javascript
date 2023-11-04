// select classes css
const form=document.querySelector('.grocery-form')
const container=document.querySelector('.grocery-container')
const list=document.querySelector('.grocery-list')
const submitBtn=document.querySelector('.submit-btn')
const grocery=document.getElementById('grocery')
const alert=document.querySelector('.alert')
const clearBtn=document.querySelector('.clear-btn')
// variables for editing
let editIem; //title
let editFlag=false
let editId=''
// Functions
function addElement(e){
  e.preventDefault()
  const value=grocery.value
  const id=new Date().getTime()
  if(value && !editFlag){  // that's mean edit flag false
    const element=document.createElement('article')
    const attr=document.createAttribute('data-id')
    attr.value=id
    element.setAttributeNode(attr)
    element.classList.add("grocery-item");
    element.innerHTML=`<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`
    list.appendChild(element)
    container.classList.add('show-container')
    displayAlert('item added succefully','success')
    setBackToDefault()
    // add to local storage
    addToLocalStorage(id,value)
    // for delete and edit Btn
    const deleteBtn=element.querySelector('.delete-btn')
    const editBtn=element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click',deleteItem)
    editBtn.addEventListener('click',editItem)
  }
  else if(value && editFlag){
    editItem.innerHTML=value
    editToLocalStorage(editId,value)
    displayAlert('edit item succefully','success')
    setBackToDefault()
  }
  else{
    displayAlert('enter value please','danger')
  }
}
// local storage
function editToLocalStorage(id,value){
  let items=JSON.parse(localStorage.getItem('list'))
  console.log(items)
  items=items.map(function(item){
    if(item.id.toString()===id){
      item.value=value
    }
    return item
  })
  
}

// EDIT FUNCTION
function editItem(e){
  const element = e.currentTarget.parentElement.parentElement;
  editItem=e.currentTarget.parentElement.previousSibling.previousSibling
  grocery.value=editItem.innerHTML
  editFlag=true
  submitBtn.textContent='edit'
  editId=element.dataset.id
}
// delete Btn
function deleteItem(e){
  const item=e.currentTarget.parentElement.parentElement
  const id = item.dataset.id;
  const childs=document.querySelectorAll('.grocery-item')
  list.removeChild(item)
  if(childs.length===1){
    container.classList.remove('show-container')
  }
  displayAlert('item deleted succefully','danger')
  deleteToLocalStorage(id)
}
// CLEARE ITEM
function clearItems(){
  const items=document.querySelectorAll('.grocery-item')
  if(items.length>0){
    items.forEach(function(item){
      list.removeChild(item)
    })
  }
  container.classList.remove('show-container')
  localStorage.removeItem('list')
}
//DISPLAY ALERT FUNCTION
function displayAlert(text,status){
  alert.textContent=text  
  alert.classList.add(`alert-${status}`)
  setTimeout(function(){
    alert.textContent=''  
    alert.classList.remove(`alert-${status}`)
  },1000)
}
// SET BACK TO DEFAULT FUNCTION
function setBackToDefault(){
  grocery.value=""
  editFlag=false
  editId=''
  submitBtn.textContent='submit'
}
// setup items
function setupItems(){
  let items=JSON.parse(localStorage.getItem('list'))
  items.forEach(function(item){
    createListItem(item.id,item.value)
  })
}
function createListItem(id,value){
    const element=document.createElement('article')
    const attr=document.createAttribute('data-id')
    attr.value=id
    element.setAttributeNode(attr)
    element.classList.add("grocery-item");
    element.innerHTML=`<p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`
    list.appendChild(element)
    container.classList.add('show-container')
    displayAlert('item added succefully','success')
    setBackToDefault()
    // for delete and edit Btn
    const deleteBtn=element.querySelector('.delete-btn')
    const editBtn=element.querySelector('.edit-btn')
    deleteBtn.addEventListener('click',deleteItem)
    editBtn.addEventListener('click',editItem)
}
// main program
form.addEventListener('submit',addElement)
clearBtn.addEventListener('click',clearItems)
window.addEventListener('DOMContentLoaded',setupItems)