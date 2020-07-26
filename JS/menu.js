/* jshint esversion: 6 */ 
class Menu{
  constructor(id){
    this.box=document.querySelector(id);//获取最大组件
    this.ul=this.box.querySelector('ul');
    this.lis=this.box.querySelectorAll('li');
    this.subMenuEles=this.box.querySelectorAll('.sub-menu');

    this.init();  

    this.timer1=null;
    this.timer2=null;
  }

  init(){/* 选项卡效果：不过添加了定时器 */
    this.lis.forEach((item)=>{ 
       item.addEventListener('mouseenter',(e)=>{
          let li=e.target;//鼠标移入的当前li  想到了_this=this
       
          if(this.timer1!=null){//效果：只触发一次效果，显示不会闪来闪去
            clearTimeout(this.timer1);
          }
          this.timer1=setTimeout(()=>{
            this.subMenuEles.forEach((item)=>{
             item.classList.remove('active');
             //移除class为active的这个效果：每个li都不显示sub-menu
            });
            li.children[1].classList.add('active');
            //鼠标移入的li显示          
          },200);
       });
    });

    this.lis.forEach((item)=>{ 
      item.addEventListener('mouseleave',(e)=>{
         let li=e.target;
         if(this.timer2!=null){//效果：只触发一次效果，显示不会闪来闪去
          clearTimeout(this.timer2);
        }
         this.timer2=setTimeout(()=>{ 
           li.children[1].classList.remove('active');
           //鼠标移出后不显示
          },200);
      });
   });
  }


}