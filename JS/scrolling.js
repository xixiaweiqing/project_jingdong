window.onload=function(){
  var odiv=document.getElementById('div1');
  var oul=odiv.getElementsByTagName('ul')[0];
  var oli=oul.getElementsByTagName('li');
  var speed=-1.5;

  oul.innerHTML=oul.innerHTML+oul.innerHTML;/*8张图片*/
  oul.style.width=oli[0].offsetWidth*oli.length+'px';/*ul的宽*/

  function move(){
    oul.style.left=oul.offsetLeft+speed+'px';

    if (oul.offsetLeft<-oul.offsetWidth/2) {/*负号是因为左边的值为负，右边想要比较，必须加负号*/
      oul.style.left='0';
    }
    if(oul.offsetLeft>0){//left>0,ul向右,图片整体向左滚
      oul.style.left=-oul.offsetWidth/2+'px';
    }
  }
  
 var timer= setInterval(move,30);
 
    odiv.onmouseover=function(){
      clearInterval(timer);
    };
     odiv.onmouseout=function(){
      timer= setInterval(move,30);
    };
    document.getElementsByTagName('a')[0].onclick=function(){
      speed=-2;
    };
    document.getElementsByTagName('a')[1].onclick=function(){
      speed=2;
    };
};