
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
// set up varibales
const deadline=document.querySelector('.deadline')
const giveAways=document.querySelector('.giveaway')
const items=document.querySelectorAll('.deadline-format')
// dates
const deadlineDate=new Date(2023,7,11,19,30)
const year=deadlineDate.getFullYear()
const month=deadlineDate.getMonth()
const weekDay=deadlineDate.getDay()
const day=deadlineDate.getDate()
// giveAways.textContent=`giveaway ends on Sunday, April 2020, 8:00am`
giveAways.textContent=`giveaway ends on ${weekdays[weekDay]},  ${months[month]} ${year}, 8:00am`
// adjust the timer
function getRemainingTime(){ 
  const currentDate=new Date().getTime()
  const futureTime=deadlineDate.getTime()
  const minute=60*1000
  const hour=60*60*1000
  const oneDay=24*60*60*1000
  const t=futureTime-currentDate
  // rest days
  restDays=Math.floor(t/oneDay)
  // rest hours
  restHours=Math.floor((t%oneDay)/hour)
  // rest minutes
  restMinutes=Math.floor((t%hour)/minute)
  // rest secondes
  restSeconds=Math.floor((t%minute)/1000)
  // asignement
  values=[restDays,restHours,restMinutes,restSeconds]
  items.forEach(function(item,index){
    const child=item.firstElementChild.firstElementChild
    if(values[index]>=10){
    child.innerHTML=values[index]
    }
    else{
    child.innerHTML=`0${values[index]}`
    }
  })
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
  }
}  
// getRemainingTime()
let countdown=setInterval(getRemainingTime,1000)

