
function type(system,unit){
  let convert=0;
  let sign='';
  if(system==0){convert=0.1;sign=' mm'}
  if(system==1){convert=1;sign=' cm'}
  if(system==2){convert=2.54;sign=' in'};
 return unit={convert,sign};
}
function calculate (scaleInput,scaleSign,fretNum,endSign){
  let type2=type(endSign).convert;
  let sign1=type(scaleSign).sign;
  let sign2=type(endSign).sign;
  let input=scaleInput*type(scaleSign).convert;
  let scaleLength=input;
  let factor=17.817154;
  let frets=Math.floor(fretNum);
  if(frets>50){frets=50};
  
  for (let i=1;i<=frets;i++){
    //rounded to 4 decimal places 
    let initial=scaleLength;
    scaleLength-=scaleLength/factor;
    let PrevfretSpace=Math.round(((initial-scaleLength)/type2)*10000)/10000;
    let rounded=Math.round(((input-scaleLength)/type2)*10000)/10000;
    
    //console.log(i+"~"+rounded+sign2+"~spacing: "+PrevfretSpace+sign2+"~"+scaleInput+sign1);
    //add table contents
    let tableParent=document.getElementById('table1');
    let tableRow=document.createElement('tr'); 
    for (let x=0;x<3;x++){
    let rowData=document.createElement('td');
    
    if (x==0){rowData.textContent=i.toString()}
    if (x==1){rowData.textContent=rounded+sign2.toString()}
    if (x==2){rowData.textContent=PrevfretSpace+sign2.toString()};
    tableRow.appendChild(rowData);
    };
  
    tableRow.classList.add("deletable");
    tableRow.classList.add("row");
    tableParent.appendChild(tableRow);
  };
}
function calc(){
  //hide card1
 const card1=document.getElementById("body1");
 card1.style.display="none";
 const card2=document.getElementById("body2");
 card2.style.display="flex";
let in1=document.getElementById("scale").value;
let in2=document.getElementById("unit0").value;
let in3=document.getElementById("fret").value;
let in4=document.getElementById("unit1").value;
//param
calculate(in1,in2,in3,in4);
}
function closeButton(){
  const card1=document.getElementById("body1");
 card1.style.display="flex";
 const card2=document.getElementById("body2");
 card2.style.display="none";
 Remove('deletable');
function Remove(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}
}
function openBar (){
  let sidebar=document.getElementById('overlay');
  sidebar.style.display='flex';
}
function closeBar (){
  let sidebar=document.getElementById('overlay');
  sidebar.style.display='none';
}
 
 var hintToggler=1;
function showHint(){
 let hint=document.getElementById("hint");
 if(hintToggler==1){hint.style.display='block';
   hintToggler=0;
 }
 else{hint.style.display='none'
  hintToggler=1;
 };
}

var fontToggler=1;
function openFont(){
 let font=document.getElementById("chooseFont");

 if(fontToggler==1){font.style.display='flex';
   fontToggler=0;
 }
 else{font.style.display='none'
  fontToggler=1;
 };
}

function changeFont(){
 let fam=document.getElementsByName("fontRadio");
 let body=document.getElementById("bodyRoot");
 for(let f=0;f<fam.length;f++){
  if(fam[f].checked){
    let newValue=fam[f].value;
    f=fam.length;
    body.style.fontFamily=newValue;
  };
 }
}
function openInfo(){
 let card1=document.getElementById("body1");
 card1.style.display="none";
 let card2=document.getElementById("body2");
 card2.style.display="none";
  let card3=document.getElementById("card3");
  card3.style.display="flex";
  let buttons=document.getElementsByClassName("donate");
  for(let f=0;f<buttons.length;f++){
    buttons[f].addEventListener("click", function(){
    card3.style.display="none";
    closeButton();
    });
  }
}
function homeButton(){
  let card3=document.getElementById("card3");
  card3.style.display="none";
  closeButton();
}




function loadingScreen(){
  //jank ahead
  let container=document.getElementById("loadCanvas");
  container.style.display="flex";
 let screened=document.getElementById("drawing");
 let ctx=screened.getContext("2d");
 let t=0;
ctx.beginPath();
 ctx.clearRect(0,0,screened.width,screened.height);
 ctx.closePath();
const timer=setInterval(function (){
  t+=30;
 let angel=(t/180)*Math.PI;
 let radi=64;
 let orbsize=Math.sin(angel/2)*12;
 let originx=screened.width/2;
 let originy=screened.height/2;
 let sx=Math.sin(angel)*radi+originx;
 let sy=Math.cos(angel)*radi+originy
 let r=Math.sin(angel)*255;
 let g=Math.sin(angel+(120/180*Math.PI))*255;
let b=Math.sin(angel+(240/180*Math.PI))*255;

let color="rgb("+r+","+g+","+b+")";
 
 
 ctx.beginPath();
 ctx.fillStyle=color;
 ctx.arc(originx,originy,25,0,6.28);
 ctx.fill()
 ctx.beginPath();
 ctx.arc(sx,sy,orbsize,0,6.28);
 ctx.fill();
 ctx.closePath();
 let op38=document.getElementById("logo");
 op38.style.color=color;

 if(t>480){clearInterval(timer);

container.style.display="none";
 };
},200);

}

loadingScreen();