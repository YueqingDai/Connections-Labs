var StartSize = 50;    
var largeSize = 10//Quit button increase size
var BiggerCounter =1;    //quit button change times

let narrations = [
  "Hello, user", 
  "I...I have a bad news.", 
  "Actually, there is no game.", 
  "There is nothing to do with a game.", 
  "Just leave and get some coffee.", 
  "Or watch TV.", 
  "STOP!", 
  "THERE IS NO GAME!", 
  "Leave NOW!", 
  "Leave me alone,",
  "Please...",
  "Just give up...",
  "Click that Quit button and leave me...",
  "*typing sound* Now you have to leave."
];

let textNum = 0;

var bye = function(){
    document.getElementById('quit').style.visibility='hidden';
    document.getElementById('narration').style.visibility='hidden';
    document.getElementById('start').style.visibility='hidden';

     alert("Bye.");
}

//each time the start been clicked:
//1. change start button position
//2. increase quit button size
//3. update text (if have)
var ChangePosition = function(num){
  var tempalign = 0;
  var temptop = 0;
  var templeftright = 0;

  BiggerCounter+=1;
  ChangeSize('button-quit');  //increase size for each click on start button
  // CHANGE button position and top number
  //randomly goes down 0 - 500px
  temptop= GetRandomInt(500); 
  document.getElementById(num).style.top= temptop +'px';

  //random align
  tempalign = GetRandomInt(3);
  templeftright= GetRandomInt(200);
  if(tempalign == 1){
  document.getElementById(num).align = 'center';
  templeftright= GetRandomInt(150);
  document.getElementById(num).style.left= templeftright +'px';
  templeftright= GetRandomInt(150);
  document.getElementById(num).style.right= templeftright +'px';
  }else if(tempalign == 2){
  document.getElementById(num).align = 'left';
    document.getElementById(num).style.right="0px";
  document.getElementById(num).style.left= templeftright +'px';
  }else{
  document.getElementById(num).align = 'right';
    document.getElementById(num).style.left='0px';
  document.getElementById(num).style.right= templeftright +'px';
  }

  if(textNum<13){
    document.getElementById('narration').innerText = narrations[textNum];
    textNum ++;
  }else{
    document.getElementById('narration').innerText = narrations[textNum];
    document.getElementById('start').style.visibility='hidden';
  }
  

}

//random number
var GetRandomInt = function(Max){
  return Math.floor(Math.random()*Max);
}

var ChangeSize = function(id){
 var tempsize =StartSize + (BiggerCounter*largeSize);
 document.getElementById(id).style.width = tempsize*2+'px';
 document.getElementById(id).style.height = tempsize+'px';
 document.getElementById(id).style.fontsize = tempsize+'px';
}