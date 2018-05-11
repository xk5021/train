var bg=document.getElementById('bg');
var	main=document.getElementById('main');
var	subitem=document.getElementById('subitem');
var bgBtn=document.getElementsByClassName('bg_btn')[0];
var bodyobj=document.getElementsByTagName("body")[0];
var gon=document.getElementsByClassName('gon');
var end=document.getElementById('end');
var score=document.getElementById('score');
var scorelabel=document.getElementById('scorelabel');
var planescore=document.getElementById("planeScore");
var gon=document.getElementById("gon");
var scores=0
var set=0;
//创建飞机类
function plane(hp,x,y,sizex,sizey,score,dietime,speed,boomimage,imagesrc){
	this.planex=x;
	this.planey=y;
	this.planesizex=sizex;
	this.planesizey=sizey;
	this.planespeed=speed;
    this.planesdie=false;
    this.planedietimes=0;
    this.planedietime=dietime;
    this.planehp=hp;
    this.planeboomimage=boomimage;
    this.imagenode=null;
    this.planescore=score;
	//显示飞机
	this.init=function(){
        this.imagenode=document.createElement("img");
        this.imagenode.style.left=this.planex+"px";
        this.imagenode.style.top=this.planey+"px";
        this.imagenode.src=imagesrc;
        main.appendChild(this.imagenode);
    }
    this.init();
    //移动行为
    this.planemove=function(){
    	if(scores<=50000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.planespeed+"px";
        }
        else if(scores>50000&&scores<=100000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.planespeed+1+"px";
        }
        else if(scores>100000&&scores<=150000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.planespeed+2+"px";
        }
        else if(scores>150000&&scores<=200000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.planespeed+3+"px";
        }
        else if(scores>200000&&scores<=300000){
            this.imagenode.style.top=this.imagenode.offsetTop+this.planespeed+4+"px";
        }
        else{
            this.imagenode.style.top=this.imagenode.offsetTop+this.planespeed+5+"px";
        }
    }
}
//创建子弹类
function bullet(x,y,sizex,sizey,imagesrc){
	this.bulletx=x;
	this.bullety=y;
    this.bulletimage=null;
    this.bulletattach=1;
	this.bulletsizex=sizex;
	this.bulletsizey=sizey;
    this.bulletmove=function(){
        this.bulletimage.style.top=this.bulletimage.offsetTop-20+"px";
    }
	this.init=function(){
        this.bulletimage=document.createElement("img");
        this.bulletimage.style.left=this.bulletx+"px";
        this.bulletimage.style.top=this.bullety+"px";
        this.bulletimage.src=imagesrc;
        main.appendChild(this.bulletimage);
    }
    this.init();
}
//创建子弹
function addbullet(x,y){
	bullet.call(this,x,y,6,14,"images/bullet1.png");
}

//创建敌机类
function enemy(hp,a,b,sizex,sizey,score,dietime,speed,boomimage,imagesrc){
	plane.call(this,hp,random(a,b),-100,sizex,sizey,score,dietime,speed,boomimage,imagesrc);
}
//产生min到max之间的随机数
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}


//创建我方飞机类
function ourplane(x,y){
    var imagesrc="images/我的飞机.gif";
    plane.call(this,1,x,y,66,80,0,660,0,"images/本方飞机爆炸.gif",imagesrc);
    this.imagenode.setAttribute('id','ourplane');
}




//创建我们飞机
var selfplane=new ourplane(127,485);
//selfplane移动行为
var ourPlane=document.getElementById('ourplane');
function move(ev){ 
	var e=ev||window.event;
	var intx = e.clientX;
   	var inty = e.clientY;
   	ourPlane.style.left=intx-context.offsetLeft-selfplane.planesizex/2+'px';
	ourPlane.style.top=inty-selfplane.planesizey/2+'px';
}
//暂停事件
var number=0;
var stop=function(){
    if(number==0){
        subitem.style.display="block";
        if(document.removeEventListener){
            main.removeEventListener("mousemove",move,true);
            bodyobj.removeEventListener("mousemove",border,true);
        }
        else if(document.detachEvent){
            main.detachEvent("onmousemove",move);
            bodyobj.detachEvent("onmousemove",border);
        }
        clearInterval(set);
        number=1;
    }
    else{
        subitem.style.display="none";
        if(document.addEventListener){
            main.addEventListener("mousemove",move,true);
            bodyobj.addEventListener("mousemove",border,true);
        }
        else if(document.attachEvent){
            main.attachEvent("onmousemove",move);
            bodyobj.attachEvent("onmousemove",border);
        }
        set=setInterval(star,20);
        number=0;
    }
}

//判断本方飞机是否移出边界,如果移出边界,则取消mousemove事件,反之加上mousemove事件
var border=function(ev){
    var oevent=window.event||ev;
    var bodyobjX=oevent.clientX;
    var bodyobjY=oevent.clientY;
    if(bodyobjX<501||bodyobjX>810||bodyobjY<46||bodyobjY>530){
        if(document.removeEventListener){
            main.removeEventListener("mousemove",move,true);
        }
        else if(document.detachEvent){
            main.detachEvent("onmousemove",move);
        }
    }
    else{
        if(document.addEventListener){
            main.addEventListener("mousemove",move,true);
        }
        else if(document.attachEvent){
            main.attachEvent("nomousemove",move);
        }
    }
}


if(document.addEventListener){
    //为本方飞机添加移动和暂停
    main.addEventListener("mousemove",move,true);
    //为本方飞机添加暂停事件
   // console.log(selfplane.imagenode);
   	selfplane.imagenode.addEventListener("click",stop,true);
    //为body添加判断本方飞机移出边界事件
    bodyobj.addEventListener("mousemove",border,true);
    //为暂停界面的继续按钮添加暂停事件
    subitem.getElementsByTagName("button")[0].addEventListener("click",stop,true);
//    suspenddiv.getElementsByTagName("button")[1].addEventListener("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    subitem.getElementsByTagName("button")[2].addEventListener("click",gon,true);
}
else if(document.attachEvent){
    //为本方飞机添加移动
    main.attachEvent("onmousemove",move);
    //为本方飞机添加暂停事件
    selfplane.imagenode.attachEvent("onclick",stop);
    //为body添加判断本方飞机移出边界事件
    bodyobj.attachEvent("onmousemove",border);
    //为暂停界面的继续按钮添加暂停事件
    subitem.getElementsByTagName("button")[0].attachEvent("onclick",stop);
    // suspenddiv.getElementsByTagName("button")[1].attachEvent("click",chongxinkaishi,true);
    //为暂停界面的返回主页按钮添加事件
    subitem.getElementsByTagName("button")[2].attachEvent("click",gon,true);
}
//初始化隐藏本方飞机
selfplane.imagenode.style.display="none";

var enemys=[];
var bullets=[];
var mark=0;
var mark1=0;
var backgroundPositionY=0;
//star
function star(){
	main.style.backgroundPositionY=backgroundPositionY+"px";
    backgroundPositionY+=0.5;
    if(backgroundPositionY==568){
        backgroundPositionY=0;
    }
    mark++;
    //创建敌方飞机
    if(mark==20){
        mark1++;
        //中飞机
        if(mark1%5==0){
            enemys.push(new enemy(6,25,274,46,60,5000,360,random(1,3),"images/中飞机爆炸.gif","images/enemy3_fly_1.png"));
        }
        //大飞机
        if(mark1==20){
            enemys.push(new enemy(12,57,210,110,164,30000,540,1,"images/大飞机爆炸.gif","images/enemy2_fly_1.png"));
            mark1=0;
        }
        //小飞机
        else{
            enemys.push(new enemy(1,19,286,34,24,1000,360,random(1,4),"images/小飞机爆炸.gif","images/enemy1_fly_1.png"));
        }
        mark=0;
    }
    
    //移动敌方飞机
    var enemyslen=enemys.length;
    for(var j=0;j<enemyslen;j++){
        if(enemys[j].planesdie !=true){
          enemys[j].planemove();
        }
    

        //如果敌机超出边界,删除敌机
        if(enemys[j].imagenode.offsetTop>=568){
            main.removeChild(enemys[j].imagenode);
            enemys.splice(j,1);
            enemys.len--;       
        }
        //当敌机死亡标记为true时，经过一段时间后清除敌机--;
        if(enemys[j].planesdie==true){
            enemys[j].planedietimes+=20;
            if(enemys[j].planedietimes==enemys[j].planedietime){
                main.removeChild(enemys[j].imagenode);
                enemys.splice(j,1);
                enemyslen--;
            }
        }
    }
    //创建子弹
    if(mark%5==0){
            bullets.push(new addbullet(parseInt(selfplane.imagenode.style.left)+31,parseInt(selfplane.imagenode.style.top)-10));
    }
    //移动子弹
    var bulletslen=bullets.length;
    for(var i=0;i<bulletslen;i++){
        bullets[i].bulletmove();
    
        //子弹超出边界   移除子弹
        if(bullets[i].bulletimage.offsetTop<0){
            main.removeChild(bullets[i].bulletimage);
            bullets.splice(i,1);
            bulletslen--;
        }
    }
    //碰撞判断
    for (var m = 0; m < bulletslen; m++) {
        for (var n = 0; n < enemyslen; n++) {
            //判断敌机与我方飞机相撞
            if(enemys[n].planesdie==false){
                if(enemys[n].imagenode.offsetLeft+enemys[n].planesizex>=selfplane.imagenode.offsetLeft&&enemys[n].imagenode.offsetLeft<=selfplane.imagenode.offsetLeft+selfplane.planesizex){
                    if(enemys[n].imagenode.offsetTop+enemys[n].planesizey>=selfplane.imagenode.offsetTop+40&&enemys[n].imagenode.offsetTop<=selfplane.imagenode.offsetTop-20+selfplane.planesizey){
                        //碰撞本方飞机，游戏结束，统计分数
                        selfplane.imagenode.src="images/本方飞机爆炸.gif";
                        end.style.display="block";
                        planescore.innerHTML=scores;
                        if(document.removeEventListener){
                            main.removeEventListener("mousemove",move,true);
                            bodyobj.removeEventListener("mousemove",border,true);
                        }
                        else if(document.detachEvent){
                            main.detachEvent("onmousemove",move);
                            bodyobj.removeEventListener("mousemove",border,true);
                        }
                        clearInterval(set);
                    }
                }
                //判断子弹与敌机碰撞
                if((bullets[m].bulletimage.offsetLeft+bullets[m].bulletsizex>enemys[n].imagenode.offsetLeft)&&(bullets[m].bulletimage.offsetLeft<enemys[n].imagenode.offsetLeft+enemys[n].planesizex)){
                    if(bullets[m].bulletimage.offsetTop<=enemys[n].imagenode.offsetTop+enemys[n].planesizey&&bullets[m].bulletimage.offsetTop+bullets[m].bulletsizey>=enemys[n].imagenode.offsetTop){
                        //敌机血量减子弹攻击力
                        enemys[n].planehp=enemys[n].planehp-bullets[m].bulletattach;
                        //敌机血量为0，敌机图片换为爆炸图片，死亡标记为true，计分
                        if(enemys[n].planehp==0){
                            scores=scores+enemys[n].planescore;
                            scorelabel.innerHTML=scores;
                            enemys[n].imagenode.src=enemys[n].planeboomimage;
                            enemys[n].planesdie=true;
                        }
                        //删除子弹
                        main.removeChild(bullets[m].bulletimage);
                            bullets.splice(m,1);
                            bulletslen--;
                            break;
                    }
                }
            }
        }
    }
}

//开始游戏
bgBtn.onclick=function(ev){
	bg.style.display="none";
	main.style.display="block";

    selfplane.imagenode.style.display="block";
    score.style.display="block";

    set=setInterval(star,20);
}

subitem.getElementsByTagName("button")[2].onclick=gon.onclick=function(){
    location.reload(true);
}
