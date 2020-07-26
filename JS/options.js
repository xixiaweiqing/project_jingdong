window.onload=function(){
var oDiv=document.getElementsByClassName('text2');
var oBtn=oDiv.getElementsByTagName('span');
var oDiv1=document.getElementsByClassName('goods-left');

  for(var i=0;i<oBtn.length;i++){
    oBtn[i].index=i;
    oBtn[i].onclick=()=>{
      for(var j=0;j<oBtn.length;j++){
        oBtn[j].className='';
        oDiv1[j].style.display='none';
      }
      this.className='active';
      oDiv1[this.index].style.display='block';
    };
  }

}