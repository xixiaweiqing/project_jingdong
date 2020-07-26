/* jshint esversion: 6 */ 
let Box=document.getElementById("count-down");
let spn=Box.getElementsByTagName("span");

let time2;

setInterval(function(){
    /* 获取系统当前时间 */
let myDate= new Date();
let Year=myDate.getFullYear(); //获取完整的年份(4位,1970-????)
let Month=myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
let Day=myDate.getDate();//获取当前天数
let myHours= myDate.getHours();//获取当前小时数

// 根据当前的小时来判断活动开始时间是今天十点还是明天十点
if(myHours<10){
time2=new Date(Year+'/'+Month+'/'+Day+' 10:00:00');
}else{
Day+=1;
time2=new Date(Year+'/'+Month+'/'+Day+' 10:00:00');
}
/* getTime() 方法可返回距 1970 年 1 月 1 日之间的毫秒数//基本得到数据格式：1595320514543 */
var i=time2.getTime()-myDate.getTime();//距离10点的剩余时间

// spn[4].innerHTML=i%(1000);//剩余毫秒
spn[2].innerHTML=num((i-i%1000)/1000%60);//剩余秒数
spn[1].innerHTML=num((i-i%(1000*60))/(60*1000)%60);//剩余分钟
spn[0].innerHTML=num((i-i%(1000*60*60))/(60*1000*60)%24);//剩余小时
// spn[0].innerHTML=num((i-i%(24*60*60*1000))/(24*60*60*1000));//剩余天数
},1);

/* 空位补零 */
function num(obj){
if(obj<10){
obj='0'+obj;
}
return obj;
}

