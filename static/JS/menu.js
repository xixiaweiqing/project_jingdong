/* jshint esversion: 6 */ 
/*js作用： 优化用户菜单使用体验，主菜单移动延时+副菜单显示延时*/
class Menu{
  constructor(id){
    this.box=document.querySelector(id);//获取最大组件
    this.ul =this.box.querySelector('ul');
    this.lis=this.box.querySelectorAll('li');
    this.subMenuEles=this.box.querySelectorAll('.sub-menu');//选择副菜单

    this.timer1=null;
    this.timer2=null;
    this.init(); 
  }

init(){
  this.lis.forEach((item)=>{ //foreach适用于只是进行集合或数组遍历,for应用广泛
      item.addEventListener('mouseenter',(e)=>{
        let li=e.target;//鼠标移入的当前li（e.target等于this）  
   if(this.timer1!=null){//效果：清除鼠标快速掠过时的li和副菜单显示效果，只保留用户停留下来时的效果
            clearTimeout(this.timer1);
          }
          /* 定时器作用：延时显示 */
          this.timer1=setTimeout(()=>{
            this.subMenuEles.forEach((item)=>{
             item.classList.remove('active');//副菜单不显示
            });
             li.children[1].classList.add('active');//当前鼠标移入的li显示  
          },200);

         
       },false);
    });

      /* 鼠标移出后 */
    this.lis.forEach((item)=>{ 
      item.addEventListener('mouseleave',(e)=>{
         let li=e.target;
if(this.timer2!=null){//效果：只触发一次效果，显示不会闪来闪去
          clearTimeout(this.timer2);
        }
         this.timer2=setTimeout(()=>{ 
           li.children[1].classList.remove('active');
           //鼠标移出副菜单后不显示
          },200);
          
      },false);
   });
  }


}