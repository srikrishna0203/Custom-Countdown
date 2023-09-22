const inputContainer=document.getElementById('input-cont');
const countdownForm=document.getElementById('countdownform');
const dateEl= document.getElementById('datecont');

const countdownEl=document.getElementById('count-down');
const countdownElTitle=document.getElementById('count-down-title');
const countdownBtn=document.getElementById('reset');
const timeElements=document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeInfo=document.getElementById('complete-info');
const completeBtn=document.getElementById('complete-button');



let countdownTitle='';
let countdownDate='';
let countdownValue=new Date();
let countdownActive;
let savedCountdown;

const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;

// setting date input min today's Date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min',today);
// populate count/complete ui
function updateDom()
{
    countdownActive=setInterval(()=>{
        const now=new Date().getTime();
        const distance=countdownValue-now;
        const days=Math.floor(distance/day);
        const hours=Math.floor((distance % day)/hour);
        const minutes=Math.floor((distance % hour)/minute);
        const seconds=Math.floor((distance % minute)/second);
        //hide input
        inputContainer.style.display="none";

        // if the countdown has ended, show complete
        if(distance<0)
        {
            countdownEl.style.display="none";
            clearInterval(countdownActive);
            completeInfo.textContent=`${countdownTitle} finished on ${countdownDate}`;
            completeEl.style.display="flex";
        }
        else{
            // countdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            if(days===1)
            {
                timeElements[0].textContent=`${days}`
            }
            timeElements[0].textContent=`${days}`
            timeElements[1].textContent=`${hours}`
            timeElements[2].textContent=`${minutes}`
            timeElements[3].textContent=`${seconds}`
            completeEl.style.display="none";
            countdownEl.style.display="flex";
        }
        
    },second);
}


// takes values from form input
function updateCountdown(e)
{
    e.preventDefault()
    countdownTitle=e.srcElement[0].value;
    countdownDate=e.srcElement[1].value;
    savedCountdown={
        title:countdownTitle,
        date:countdownDate
    };
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    // check for valid date
    if(countdownDate === "")
    {
        alert('please select date')
    }
    else{
    countdownValue=new Date(countdownDate).getTime();
    updateDom();
    }
}
//Reset All values
function reset()
{
    // Hide countdown, show input
    countdownEl.style.display='none';
    completeEl.style.display='none'
    inputContainer.style.display='flex';
    // stop the count down
    clearInterval(countdownActive);
    // reset values
    countdownTitle="";
    countdownDate="";
    document.getElementById('inputfield').value=""
    document.getElementById('datecont').value=""
    localStorage.removeItem('countdown')
} 
function restorePreviousCountDown(){
    // Getting CountDown From LocalStorage
    if(localStorage.getItem('countdown'))
    {
     inputContainer.style.display='none';
     savedCountdown=JSON.parse(localStorage.getItem('countdown'));
     countdownTitle=savedCountdown.title;
     countdownDate=savedCountdown.date;
     countdownValue=new Date(countdownDate).getTime();
     updateDom();
    }
}
countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset)
completeBtn.addEventListener('click',reset);

// On Load check localstorage
restorePreviousCountDown();