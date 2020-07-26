window.onload=function () {
  var odiv=document.getElementById('div1');
  var oBtn1=odiv.getElementsByTagName('span');

  var odiv2=document.getElementsByClassName('left');

      for (let i = 0; i < oBtn1.length; i++) {
      oBtn1[i].index=i;//自定义一个index，用来表顺序 
      oBtn1[i].onclick=function (){
         for (let j = 0;j < oBtn1.length; j++){
         oBtn1[j].className='';
         odiv2[j].style.display='none'; 
        }
      this.className='active';	
      odiv2[this.index].style.display='block';
      

      //for循环{点击=函数（for循环（选项卡变色））}
      //意思：点击第一、二、三、四（for循环1）个选项卡时，选项卡会随之（for循环2）变色
        
};
      }};