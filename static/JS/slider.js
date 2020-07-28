/* jshint esversion: 6 */
/* JS效果：图片左右按钮切换、自动轮播、小点点随图片显示*/
class Slider {
  constructor(id) {
    this.box = document.querySelector(id); //整个轮播图
    this.picBox = this.box.querySelector("ul"); //图片ul
    this.indexBox = this.box.querySelector(".index-box"); //小圆点容器

    this.sliderWidth = this.box.clientWidth;//一张图片的宽
    this.sliders = this.picBox.children.length;//图片个数（5）
    this.index = 1;//索引值初始化
    this.animated = false;//运动速率
    this.auto = null;//定时器名字

    this.init();
  }

  init() {
    this.initPoint();
    this.copyPic();
    this.leftRight();
    this.play();
  }

  initPoint() {
    //添加图片上的一排小点点
    const num = this.picBox.children.length; //num=5（图片）
    let frg = document.createDocumentFragment(); //性能更好

    for (let i = 0; i < num; i++) {
      let li = document.createElement("li");
      li.setAttribute("data-index", i + 1); //li data-index=1,2,3,4,5
      //添加索引属性，每个li都有编号（1-5），方便后面查看
      if (i == 0) {
        li.className = "active";
      } //第一个小点点为红色
      frg.appendChild(li);
    }
    this.indexBox.children[0].style.width = num * 10 * 2 + "px"; //*2是留下左右边距
    this.indexBox.children[0].appendChild(frg); //前面指<ol>标签

    this.indexBox.children[0].addEventListener("click", (e) => {
      /* this.index=(e.target).getAttribute("data-index"); */ //获取到每一个li
      let pointIndex = e.target.getAttribute("data-index");
      if (pointIndex == this.index || this.animated) {
        return;
      }
      let offset = (pointIndex - this.index) * this.sliderWidth;
      //用户隔好几个小点点击，当前索引值-之前的值*一张图片的宽度
      this.index = pointIndex;
      this.move(offset);
    });
  }

  copyPic() {
    //扩展ul图片，图片队伍顺序变成 5,1,2,3,4,5,1
    const first = this.picBox.firstElementChild.cloneNode(true);
    const last = this.picBox.lastElementChild.cloneNode(true);

    this.picBox.appendChild(first); //队首添加第五张照片
    this.picBox.insertBefore(last, this.picBox.firstElementChild);
    //队末添加第一张图片 
    this.picBox.style.width =
      this.sliderWidth * this.picBox.children.length + "px";
    this.picBox.style.left = -1 * this.sliderWidth + "px"; //可视区宽度=1个图片的宽
  }

  move(offset) {
    this.animate(offset);
    const num = this.indexBox.children[0].children.length; //小点点li的长度
    for (let i = 0; i < num; i++) {
      this.indexBox.children[0].children[i].className = "";
    }
    this.indexBox.children[0].children[this.index - 1].className = "active";
  }

  animate(offset) {//控制移动速度    offset是位移
    let speed = offset / 10;
    let goal = parseFloat(this.picBox.style.left) - offset;
     //left带px单位，需转换
    this.animated = true;
    
    let timer = setInterval(() => {
      if (
        this.picBox.style.left == goal ||
        Math.abs(
          Math.abs(parseFloat(this.picBox.style.left)) - Math.abs(goal)
        ) < Math.abs(speed)
      ) {
        //abs()绝对值，ul的左位置与目标距离相减的绝对值与speed(移动一次的距离？)作比较？
        this.picBox.style.left == goal;
        clearInterval(timer);
        this.animated = false;

        if (parseFloat(this.picBox.style.left) == 0) {
          this.picBox.style.left = -this.sliders * this.sliderWidth + "px";
        }//如果位置在真正的1图，那就每次向右移一个宽度的距离
         else if (
        parseFloat(this.picBox.style.left) == -(this.sliders + 1) * this.sliderWidth ) //如果位置在队尾的1，则拉到队首的5图：-（5+1）*宽
        {
          this.picBox.style.left = -this.sliderWidth + "px";
        }
      } else {//没有到目标值继续移动
        this.picBox.style.left =
          parseFloat(this.picBox.style.left) - speed + "px";
      }
    }, 100);
  }
  leftRight() {
    this.box.querySelector(".left-box").addEventListener("click", () => {
      console.log("left");
      if (this.animated) {
        // 动画正在进行中，不执行其他点击操作，防止用户迅速点击，加载空白
        return;
      }
      if (this.index - 1 < 1) {
        this.index = this.sliders;
      } else {
        this.index--;
      }
      this.move(-this.sliderWidth);
    });
    this.box.querySelector(".right-box").addEventListener("click", () => {
      console.log("right");
      if (this.animated) {
        return;
      }
      if (this.index + 1 > this.sliders) {
        this.index = 1;
      } else {
        this.index++;
      }
      this.move(this.sliderWidth);
    });
  }

  play() {
    this.auto = setInterval(() => {
      this.box.querySelector(".right-box").click();//挺好用的方法=点击右键的效果
    }, 2000);

    this.box.addEventListener("mouseenter", () => {
      clearInterval(this.auto);
    });

    this.box.addEventListener("mouseleave", () => {
      this.auto = setInterval(() => {
        this.box.querySelector(".right-box").click();
      }, 2000);
    });
  }
}
