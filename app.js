const baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdown= document.querySelectorAll(".dropdown select");
 const btn=document.querySelector(" form button");
const fromcurr=document.querySelector(".from select");
const tocurr= document.querySelector(".to select");
const msg= document.querySelector(".msg");

 for( let select of dropdown){
for(currcode in countryList){
    let newoptn=document.createElement("option");
   newoptn.innerText=currcode;
   newoptn.value=currcode;
   if(select.name==="from"&&currcode==="USD"){
    newoptn.selected="selected";
   }
   if(select.name==="to"&&currcode==="INR"){
    newoptn.selected="selected";
   }
   select.append(newoptn);
   
}
select.addEventListener("change",(evt)=>{
    updateflag(evt.target);
})
}

const updateflag=(element)=>{
    currcode=element.value;
    countrycode= countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
 let img=element.parentElement.querySelector("img");
img.src=newsrc;

};
btn.addEventListener("click",async (evt)=>{
evt.preventDefault();
let amount=document.querySelector(".amount input");
let amtvalue=amount.value;
if(amtvalue===""||amtvalue<1){
amtvalue=1;
amount.value="1";
}
console.log(fromcurr.value,tocurr.value);
const URL=`${baseurl}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
let response=  await fetch(URL);
let data= await response.json();
let rate= data[tocurr.value.toLowerCase()];
let finalamt=amtvalue*rate;
msg.innerText=`${amtvalue} ${fromcurr.value}=${finalamt} ${tocurr.value}`;
});

