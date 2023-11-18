

// javascript

// toogle button and add client
const sideBarBtn=document.querySelector('.sidebar-btn')
const sidebar=document.querySelector('.sidebar')
const container=document.querySelector('.container')
const gridContainer=document.querySelector('.grid-container')
sideBarBtn.addEventListener('click',()=>{
    if(window.innerWidth>1150){
        const check=sidebar.classList.contains('sidebar-appear')
        if(check){
            sidebar.classList.remove('sidebar-appear')
            gridContainer.classList.remove('adjust-grid-container')
            container.classList.remove('adjust-container')
        }
        else{
            sidebar.classList.add('sidebar-appear')
            gridContainer.classList.add('adjust-grid-container')
            container.classList.add('adjust-container')
        }
    }
    if(window.innerWidth<1150){
        sidebar.classList.add('out-side-bar')
    }
})
// close sidebar
const closeBtn=document.querySelector('.close')
closeBtn.addEventListener('click',()=>{
    const check=sidebar.classList.contains('sidebar-appear')  
    if(!check){
        sidebar.classList.add('sidebar-appear')
        gridContainer.classList.add('adjust-grid-container')
        container.classList.add('adjust-container')
    }
    if(window.innerWidth<1150){
        sidebar.classList.remove('out-side-bar')
    }
})
// student form
const studentForm=document.querySelector('.form-new-student')
const addStudentBtn=document.querySelector('.add-student')
let isFormVisible = false;
addStudentBtn.addEventListener('click', () => {
    if (!isFormVisible) {
        studentForm.style.transform = `translate(0)`;
        isFormVisible = true;
    } else {
        studentForm.style.transform = `translate(100%)`;
        isFormVisible = false;
        editFlag=false
        submit.textContent='submit'
        firstName.value=""
        secondName.value=""
        number.value=""
    }
});
// add a student logic
const form=document.querySelector('.form')
const firstName=document.getElementById('first-name')
const secondName=document.getElementById('second-name')
const number=document.getElementById('number-phone')
const gmail=document.getElementById('gmail')
const submit=document.querySelector('.submit')
const radioButtons=document.querySelectorAll(`input[name='level']`)
function setToDefault(){
    firstName.value=""
    secondName.value=""
    number.value=""
    editFlag=""
    submit.textContent='submit'
    radioButtons.forEach(button => {
        button.checked = false;
    });
    radioBtn="";
    editFlag=false
}
let radioName="";
radioButtons.forEach(button=>{
    button.addEventListener('click',(e)=>{
        const item=e.currentTarget
        radioName=item.previousElementSibling.textContent
    })
})
let allStudents;
let studentCounter=0;
function timer(inscriptionTime){
    const days=allStudents[studentCounter].querySelector('.days')
    const hours=allStudents[studentCounter].querySelector('.hours')
    const minutes=allStudents[studentCounter].querySelector('.minutes')
    const secondes=allStudents[studentCounter].querySelector('.secondes')
    // units in millisecondes
    const oneDay=24*60*60*1000
    const thirtyDays=1*oneDay
    const oneHour=60*60*1000
    const oneMinute=60*1000
    const oneSecond=1000
    // desendent timer
    const studentTimeStretch=document.querySelector(`div[data-id='${inscriptionTime}']`)
    const endTimer=inscriptionTime+oneMinute
    studentTimeStretch.setAttribute(`data-time`,endTimer)
    const setIntervaleVariable=setInterval(()=>{
        let endTime=parseInt(studentTimeStretch.dataset.time)
        let t=endTime-new Date().getTime()
        if(t>=0){
            days.textContent=Math.floor((t/oneDay))
            hours.textContent=Math.floor((t%oneDay)/oneHour)
            minutes.textContent=Math.floor((t%oneHour)/oneMinute)
            secondes.textContent=Math.floor((t%oneMinute)/oneSecond)
            const student=document.querySelector(`div[data-id="${inscriptionTime}"]`)
            student.children[1].classList.add('green')
        }
        if(t<0){
            days.textContent=Math.ceil((t/oneDay))
            hours.textContent=Math.ceil((t%oneDay)/oneHour)
            minutes.textContent=Math.ceil((t%oneHour)/oneMinute)
            secondes.textContent=Math.ceil((t%oneMinute)/oneSecond)
            const student=document.querySelector(`div[data-id="${inscriptionTime}"]`)
            student.children[1].classList.add('red')
        }
    },1000)
}
function adjustLocalStorage(parent){
    const elements=JSON.parse(localStorage.getItem('students'))
    elements.forEach(element=>{
        if(element.name===parent.querySelector('.year').textContent){
            element.datatime=parseInt(element.datatime)+60000
        }
    })
    localStorage.setItem('students',JSON.stringify(elements))
}
function adjustLocalStorageMinus(parent){
    const elements=JSON.parse(localStorage.getItem('students'))
    elements.forEach(element=>{
        if(element.name===parent.querySelector('.year').textContent){
            element.datatime=parseInt(element.datatime)-60000
        }
    })
    localStorage.setItem('students',JSON.stringify(elements))
}
function adjustLocalStorageRed(parent,endTime){
    const elements=JSON.parse(localStorage.getItem('students'))
    elements.forEach(element=>{
        if(element.name===parent.querySelector('.year').textContent){
            element.datatime=endTime
        }
    })
    localStorage.setItem('students',JSON.stringify(elements))
}
function stretchTime(e){
    const parent=e.currentTarget.parentElement.parentElement
    let endTime=parseInt(parent.dataset.time)
    if(parent.children[1].classList.contains('green')){
        endTime=endTime+60000
        parent.setAttribute('data-time',endTime)
        adjustLocalStorage(parent)
    }
    if(parent.children[1].classList.contains('red')){
        endTime=new Date().getTime()+60000
        parent.setAttribute('data-time',endTime)
        parent.children[1].classList.remove('red')
        parent.children[1].classList.add('green')
        adjustLocalStorageRed(parent,endTime)
    }
}
function minusTime(e){
    const parent=e.currentTarget.parentElement.parentElement
    let endTime=parseInt(parent.dataset.time)
    if(parent.children[1].classList.contains('green') && !parent.children[1].classList.contains('red')){
        endTime=endTime-60000
        parent.setAttribute('data-time',endTime)
    }
    adjustLocalStorageMinus(parent)
}
let student;
function editFunc(e){
    editFlag=true
    submit.textContent='edit'
    if (!isFormVisible) {
        studentForm.style.transform = `translate(0)`;
        isFormVisible = true;
    } else {
        studentForm.style.transform = `translate(100%)`;
        isFormVisible = false;
    }
    student=e.currentTarget.parentElement.previousElementSibling
    const fullName=student.firstElementChild
    for(let i=0;i<fullName.textContent.length;i++){
        if(fullName.textContent[i]===" "){
            firstName.value=fullName.textContent.slice(0,i)
            secondName.value=fullName.textContent.slice(i+1)
            break;
        }
    }
    const numberPhone=student.querySelector('.number')
    number.value=numberPhone.textContent
}
let editFlag=false
let studentsLocalStorage=[];
function addToLocalStorage(item){
    const image=item.querySelector('.profile-image').src
    const name=item.querySelector('.year').textContent
    const level=item.querySelector('.level').textContent
    const number=item.querySelector('.number').textContent
    const id=item.dataset.id
    const datatime=item.dataset.time
    const dictionnary={image:image,name:name,level:level,number:number,id:id,datatime:datatime}
    let element=[];
    if(localStorage.getItem('students')){
        element=JSON.parse(localStorage.getItem('students'))
        element.push(dictionnary)
    }
    else{
        element.push(dictionnary)
    }
    localStorage.setItem('students',JSON.stringify(element))
}
form.addEventListener('submit',e=>{
    e.preventDefault()
    if(!editFlag){
        studentForm.style.transform=`translateX(100%)`
        const id=new Date().getTime()
        const student=`<div class="student" data-id="${id}">
          <div class="image">
            <img src="./blank.png" alt="" class="profile-image" />
            <button class="add-image"><i class="fa-solid fa-plus"></i></button>
            <input type="file" id="file" class="file" />
          </div>
          <div class="identification">
            <p class="year">${firstName.value} ${secondName.value}</p>
            <p class="year level">${radioName}</p>
            <p class="year number">${number.value}</p>
            <div class="timer">
              <span class="days">0</span
              >days<span class="hours">0</span>hrs<span class="minutes">0</span>min<span class="secondes">0</span>sec
            </div>
          </div>
          <div class="button">
            <button class="btn stretch-time">
              <i class="fa-solid fa-plus plus"></i>
            </button>
            <button class="btn minus-time">
              <i class="fa-solid fa-minus"></i>
            </button>
            <button class="btn edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>`
        container.insertAdjacentHTML('beforeend',student)
        const objectStudent={name:firstName.value+" "+secondName.value,level:radioName,number:number.value}
        studentsLocalStorage.push(objectStudent)
        // adjust the time
        allStudents=document.querySelectorAll('.student')
        timer(id)
        addToLocalStorage(allStudents[studentCounter])
        // edit and delete and stretch-timer
        const stretchBtn=allStudents[studentCounter].querySelector('.stretch-time')
        const minusCounter=allStudents[studentCounter].querySelector('.minus-time')
        const editStudent=allStudents[studentCounter].querySelector('.edit')
        editStudent.addEventListener('click',editFunc)
        minusCounter.addEventListener('click',minusTime)
        stretchBtn.addEventListener('click',stretchTime)
        studentCounter++;
    }
    else if(editFlag===true){
        student.firstElementChild.textContent=firstName.value+' '+secondName.value
        student.children[1].textContent=radioName
        student.children[2].textContent=number.value
        editLocalStorage(student)
    }
    // add images to client
    const file=document.querySelectorAll('#file')
    const addImage=document.querySelectorAll('.add-image')
    const profileImage=document.querySelectorAll('.profile-image')
    addImage.forEach((element,index)=>{
        element.addEventListener('click',()=>{
            file[index].click()
            file[index].addEventListener('change',()=>{
                profileImage[index].src=URL.createObjectURL(file[index].files[0])
                imageToLocalStorage(file[index],profileImage[index].src)
                })
            })
        })
    setToDefault()
})
function imageToLocalStorage(file,link){
    const parent=file.parentElement.parentElement
    const array=JSON.parse(localStorage.getItem('students'))
    array.forEach(item=>{
        if(parent.querySelector('.year').textContent===item.name){
            item.image=link
        }
    })
    localStorage.setItem('students',JSON.stringify(array))
}
// local storage
function editLocalStorage(student){
    const name=student.firstElementChild.textContent
    const level=student.children[1].textContent
    const number=student.children[2].textContent
    const array=JSON.parse(localStorage.getItem('students'))
    console.log(name)
    console.log(level)
    console.log(number)
    console.log(array)
    array.forEach(item=>{
        if(student.parentElement.dataset.id===item.id){
            item.name=name
            item.level=level
            item.number=number
        }
    })
    localStorage.setItem('students',JSON.stringify(array))
}
function secondTimer(item,endTime){
    const days=allStudents[studentCounter].querySelector('.days')
    const hours=allStudents[studentCounter].querySelector('.hours')
    const minutes=allStudents[studentCounter].querySelector('.minutes')
    const secondes=allStudents[studentCounter].querySelector('.secondes')
    // units in millisecondes
    const oneDay=24*60*60*1000
    const oneHour=60*60*1000
    const oneMinute=60*1000
    const oneSecond=1000
    // desendent timer
    const setIntervaleVariable=setInterval(()=>{
        let t=item.dataset.time-new Date().getTime()
        if(t>=0){
            days.textContent=Math.floor((t/oneDay))
            hours.textContent=Math.floor((t%oneDay)/oneHour)
            minutes.textContent=Math.floor((t%oneHour)/oneMinute)
            secondes.textContent=Math.floor((t%oneMinute)/oneSecond)
            const student=document.querySelector(`div[data-time="${item.dataset.time}"]`)
            student.children[1].classList.add('green')
        }
        if(t<0){
            days.textContent=Math.ceil((t/oneDay))
            hours.textContent=Math.ceil((t%oneDay)/oneHour)
            minutes.textContent=Math.ceil((t%oneHour)/oneMinute)
            secondes.textContent=Math.ceil((t%oneMinute)/oneSecond)
            const student=document.querySelector(`div[data-time="${item.dataset.time}"]`)
            student.children[1].classList.add('red')
        }
    },1000)
}

const arrayLocalStorage=JSON.parse(localStorage.getItem('students'))
studentCounter=0;
function createItems(){
    if(arrayLocalStorage!==null){
        arrayLocalStorage.forEach(item=>{
            const student=`<div class="student" data-id="${item.id}" data-time="${item.datatime}">
          <div class="image">
            <img src="${item.image}" alt="" class="profile-image" />
            <button class="add-image"><i class="fa-solid fa-plus"></i></button>
            <input type="file" id="file" class="file" />
          </div>
          <div class="identification">
            <p class="year">${item.name}</p>
            <p class="year level">${item.level}</p>
            <p class="year number">${item.number}</p>
            <div class="timer">
              <span class="days">0</span
              >days<span class="hours">0</span>hrs<span class="minutes">0</span>min<span class="secondes">0</span>sec
            </div>
          </div>
          <div class="button">
            <button class="btn stretch-time">
              <i class="fa-solid fa-plus plus"></i>
            </button>
            <button class="btn minus-time">
              <i class="fa-solid fa-minus"></i>
            </button>
            <button class="btn edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </div>
        </div>`
        container.insertAdjacentHTML('beforeend',student)
        allStudents=document.querySelectorAll('.student')
        secondTimer(allStudents[studentCounter],item.datatime)
        const stretchBtn=allStudents[studentCounter].querySelector('.stretch-time')
        stretchBtn.addEventListener('click',stretchTime)
        const minusCounter=allStudents[studentCounter].querySelector('.minus-time')
        minusCounter.addEventListener('click',minusTime)
        const editStudent=allStudents[studentCounter].querySelector('.edit')
        editStudent.addEventListener('click',editFunc)
        const btnAddImage=allStudents[studentCounter].querySelector('.add-image')
        btnAddImage.classList.add('remove')
        // add images to client
        studentCounter++;
        })
    }
}
createItems()
// filter students
const categories=document.querySelectorAll('.categorie')
categories.forEach(categorie=>{
    categorie.addEventListener('click',e=>{
        allStudents.forEach(student=>{
            if(student.querySelector('.level').textContent.toLowerCase()==e.currentTarget.textContent.toLowerCase())
            {
                student.style.display=`block`
                student.style.display=`flex`
            }
            else{
                student.style.display=`none`
            }
            if(e.currentTarget.textContent.toLowerCase()==='all'){
                student.style.display=`block`
                student.style.display=`flex`
            }
        })
    })
})

