let weekend = 0;
let hoilday = 0;
let payday = 0;

let income = 0.01;
let incomeNow = 0.01;
let Shour, Smin, WTime;
let StartCount = false;

let joke = "DefJoke";
let memeTitle = "Defmeme";
let meme;
let puppy;
let act = "load on job";


var t = -1;//获取当前时间
var year = -1;
var month = -1;
var day = -1;
var week = -1;
var hour = -1;
var minute = -1;
var second = -1;

let hoiladyURL = "https://date.nager.at/api/v3/publicholidays/2022/US";

/*default display*/
window.addEventListener('load',function(){

  fetch('https://www.boredapi.com/api/activity/')
  .then(response => response.json() )
  .then(data => {

    let act = data.activity;
    document.getElementById('actName').innerText = act;
  })
  .catch(error => {
    console.log(error);
  })
  
  fetch('https://v2.jokeapi.dev/joke/Any?format=json')
      .then(response => response.json() )
      .then(data => {
    
        if(data.type == "single"){
          joke = data.joke;
        }
        else if(data.type == "twopart") {
          joke = "- " + data.setup + "\n" + "- " + data.delivery;
        }
    
        document.getElementById('joke').innerText = joke; 
        joke = "DefJoke";
      })
      .catch(error => {
        console.log(error);
      })

  fetch('https://dog.ceo/api/breeds/image/random')
  .then(response => response.json() )
  .then(data => {

    puppy = data.message;
    document.getElementById('p-img').src = puppy; 
  })
  .catch(error => {
    console.log(error);
  })
  
  fetch('https://api.imgflip.com/get_memes')
  .then(response => response.json() )
  .then(data => {
    let memeTotal = data.data.memes;
    let RNum = Math.floor(Math.random()*memeTotal.length);

    memeTitle = memeTotal[RNum].name;
    document.getElementById('memeTitle').innerHTML = memeTitle; 
    
    meme = memeTotal[RNum].url;
    document.getElementById('m-img').src = meme; 
  })
  .catch(error => {
    console.log(error);
  })


      
})

/*generate joke*/
var NewJoke = function(){

    fetch('https://v2.jokeapi.dev/joke/Any?format=json')
    .then(response => response.json() )
    .then(data => {
  
      if(data.type == "single"){
        if(joke == data.joke){NewJoke();}
        else{
          joke = data.joke;
        }
      }

      else if(data.type == "twopart") {
        if(joke == "- " + data.setup + "\n" + "- " + data.delivery){NewJoke();}
        else{
          joke = "- " + data.setup + "\n" + "- " + data.delivery;
        }
      }
  
      document.getElementById('joke').innerText = joke; 
      
    })
    .catch(error => {
      console.log(error);
    })

}

/*setup from p5js*/
function setup(){
  /*get local time year month date day*/
  t = new Date();
  year = t.getFullYear();
  month = t.getMonth()+1;
  day = t.getDate();
  week = t.getDay();

  /* countdown to weekend*/
  ToWeekend(week);

  /* countdown to hoilady*/
  hoiladyURL = "https://date.nager.at/api/v3/publicholidays/" + year + "/US";
  ToHoliday(year,month,day);
}

/*draw from p5js*/
function draw(){
  /*get local time hour minute sec*/
  t = new Date();
  hour = t.getHours();
  minute = t.getMinutes();
  second = t.getSeconds();
  document.getElementById("timeNow").innerHTML = t;

  if(t.getDay() != week){
    setup();
  }

  countSalary(income, Shour, Smin, WTime);

}

/*set payday and count*/
function setPD(){
  t = new Date();
  month = t.getMonth()+1;
  day = t.getDate();
  let dayleft = -1;

  let input = document.getElementById("SetPayDay").value;

  document.getElementById('SetPayDay').remove();
  document.getElementById('pay-button').remove();
  
  if(input == "1st"){
    payday = 1;
    if(payday == day) {
      document.getElementById('2Payday').style.innerHTML='TODAY IS PAYDAY!';
    }else{
      dayleft = MleftD(month,day) + 1;
      document.getElementById('2Payday').innerText = dayleft + " days to payday.";
    }
    
  }else if(input == "15th"){
    payday = 15;
    if(payday == day) {
      document.getElementById('2Payday').style.innerHTML='TODAY IS PAYDAY!';
    }else if (day < 15){
      dayleft = 15 - day;
      document.getElementById('2Payday').innerText = dayleft + " days to payday.";
    }else{
      dayleft = MleftD(month,day) + 15;
      document.getElementById('2Payday').innerText = dayleft + " days to payday.";
    }
  }else if(input == "End of the month"){
    dayleft = MleftD(month,day);
    if(dayleft = 0){
      document.getElementById('2Payday').style.innerHTML='TODAY IS PAYDAY!';
    }else{
      dayleft = MleftD(month,day);
      document.getElementById('2Payday').innerText = dayleft + " days to payday.";
    }
  }


}

/*set var for sount salary */
function setWork(){
  let salary = parseInt(document.getElementById("salary").value);
  if(isNaN(salary)){
    alert("Numbers Only");
  }else{
    income = salary;
    Shour = parseInt(document.getElementById("SetStartHour").value);
    Smin = parseInt(document.getElementById("SetStartMinute").value);
    WTime = parseInt(document.getElementById("SetWorkTime").value);

    document.getElementById('s-i').remove();

    StartCount = true;
  }
  
}

/*count salary*/
function countSalary(Money, Shour, Smin, WTime){
  t = new Date();
  hour = t.getHours();
  minute = t.getMinutes();
  second = t.getSeconds();

  let StartSec = (Shour * 3600) + (Smin*60);
  let NowSec = (hour * 3600) + (minute*60) + second;
  let EndSec = ((Shour+WTime) * 3600) + (Smin*60);
  let workSec = NowSec - StartSec;
  let workTotal = EndSec - StartSec;
  let dailyIncome = Money / 22;


  if(NowSec >= EndSec){
    incomeNow = Money;
  }else if (NowSec < StartSec){
    incomeNow = 0;
  }else{
    let incomePSec = 0.01
    incomePSec = dailyIncome / workTotal;
    incomeNow = incomePSec * workSec;
    incomeNow = incomeNow.toFixed(3);
  }
  
  if(StartCount){
    document.getElementById('incomeNum').innerText = "You've earned $" + incomeNow + " today \n Keep on Loafing!";
  }
}

/* countdown to ToWeekend*/
function ToWeekend(today){
  let day2weekend = 7 - today;
  if(day2weekend >=3){
    document.getElementById("Num2Weekend").innerHTML = day2weekend-1;
  }else{
    document.getElementById("2Weekend").innerHTML = "Today is Weekend!!";
  }
}

/*countdown to holiday (US)Version*/
function ToHoliday(yearN,monthN,dateN){
  fetch(hoiladyURL)
  .then(response => response.json() )
  .then(data => {
    let dayleft = -1;
    for(let i=0; i<data.length; i++) {
      let Hdate = data[i].date;
      var hoilDayY = parseInt(Hdate.substring(0,4));
      var hoilDayM = parseInt(Hdate.substring(5,7));
      var hoilDayD = parseInt(Hdate.substring(8,10));

      if(hoilDayY == yearN && hoilDayM == monthN && hoilDayD == dateN ){
        document.getElementById("2Holiady").innerHTML = "Today is Holiday!!";
        break;
      }
      else if(hoilDayY == yearN && hoilDayM == monthN && hoilDayD >= dateN){
        document.getElementById("HolidayName").innerHTML = data[i].name;
        dayleft = hoilDayD - dateN;
        document.getElementById("Num2Holiday").innerHTML = dayleft + " Days ";
        break;
      }
      else if(hoilDayY == yearN && hoilDayM >= monthN){
        if(hoilDayD <= dateN){
          dayleft = hoilDayD - hoilDayD;
          let monthleft = hoilDayM - monthN;
          let TotalLeft = monthleft + " month " + dayleft + " Days ";
          document.getElementById("HolidayName").innerHTML = data[i].name;
          document.getElementById("Num2Holiday").innerHTML = dayleft;
        }
        else{
          dayleft = MleftD(monthN,dateN);
          dayleft += hoilDayD;
          let monthleft = hoilDayM - 1 - monthN;
          if (monthleft == 0){
            document.getElementById("Num2Holiday").innerHTML = dayleft + " Days ";
          }else{
            let TotalLeft = monthleft + " month " + dayleft + " Days ";
            document.getElementById("Num2Holiday").innerHTML = dayleft;
          }
          document.getElementById("HolidayName").innerHTML = data[i].name;
        }
        break;
      }
      else if(monthN == 12 && dateN >= 27 ){
        document.getElementById("HolidayName").innerHTML = " New Year";
        dayleft = 31 - dateN;
        document.getElementById("Num2Holiday").innerHTML = dayleft + " Days ";
        break;
      }

    }
  })
  .catch(error => {
    console.log(error);
  })

}

/*这个月剩多少天*/
function MleftD(M,D){

  switch (M) 
  { 
    case 1: 
      x=31-D; 
      break; 
      
    case 2: 
      if(Date.getFullYear() ){ x=29-D; }
      else { x=28-D; }
    break; 

    case 3: 
      x=31-D; 
      break;

    case 4: 
      x=30-D; 
      break;
      
    case 5: 
      x=31-D; 
      break;

    case 6: 
      x=30-D; 
      break;

     case 7: 
      x=31-D; 
      break;

     case 8: 
      x=31-D; 
      break;

     case 9: 
      x=30-D; 
      break;
      
    case 10: 
      x=31-D; 
      break;

    case 11: 
      x=30-D; 
      break;
      
    case 12: 
      x=31-D; 
      break;
  } 
  return x;
}
