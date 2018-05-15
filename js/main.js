window.onload=function(){
    // 运动状态判定,false代表未在运动
    var moved=false;
    var auto_moved=true;
    var auto_delay=2000;    
    var carousel=document.getElementsByClassName("carousel");
    var imglist=document.getElementsByClassName("imglist");
    var left_btn=document.getElementsByClassName("left-btn");
    var right_btn=document.getElementsByClassName("right-btn");
    var control_btn=document.getElementsByClassName("control-btn");  
    var index=1;
    imglist[0].style.left = "0px";
    function img_move(offset) {
        moved=true;        
        // 图片切换总时间
        var move_all_time = 300;
        // 图片移动单次时间
        var move_time = 10;
        // 图片移动速度
        var speed = offset / (move_all_time / move_time);
        // 目标left值
        var newleft = parseInt(imglist[0].style.left) + offset;
        // 当第六张图片右移时，切换到第一张
        if (newleft == -3600) {
            imglist[0].style.left = "0px";
            newleft = parseInt(imglist[0].style.left) + offset;
        }
        // 当第一张图片左移时，切换到第六张
        if (newleft == 600) {
            imglist[0].style.left = "-3000px";
            newleft = parseInt(imglist[0].style.left) + offset;
        }
        function go() {
            // 还未到达目标left时，持续移动
            if (parseInt(imglist[0].style.left) != newleft) {
                imglist[0].style.left = parseInt(imglist[0].style.left) + speed + "px";
                // 递归，重复函数
                setTimeout(go, move_time);
            } 
            else {
                // imglist[0].style.left = newleft + "px";
                moved=false;
            }
        }
        go();
    }
    function showbtn(){
        // 先清除所有按钮的active类
        for(var i=0;i<control_btn.length;i++){
            control_btn[i].className=control_btn[i].className.replace(/\bactive\b/g,"");
        }
        // 当第五张图片右移时，按钮切换为第一个
        if(index>5){    
            index=1;
        }
        // 当第一张图片左移时，按钮切换为第五个        
        if(index<1){
            index=5;
        }
        // 新按钮添加active类
        control_btn[index-1].className+=" active";
    }
    // 左移方向键函数
    left_btn[0].onclick=function(){
        // 如果在运动过程中点击，则点击无效
        if(moved){
            return;
        }
        index--;
        img_move(600);
        showbtn();
    }
    // 右移方向键函数
    right_btn[0].onclick=function(){
        // 如果在运动过程中点击，则点击无效        
        if(moved){
            return;
        }
        index++;
        img_move(-600);
        showbtn();
    }
    //点击按钮切换图片
    for(var i=0;i<control_btn.length;i++){
        control_btn[i].onclick=function(){
            // 如果点击的是当前图片对应的按钮，则退出函数
            if(/\bactive\b/g.test(this.className)){
                return;
            }
            // 获取点击按钮对应的图片序号
            var myindex=this.getAttribute("index");
            // 移动到点击按钮相应的图片
            img_move(600*(index-myindex));
            // 点击按钮的active类添加
            index=myindex;
            showbtn();
        }
    }
    // 图片自动切换
    function auto(){
        if(auto_moved){
            right_btn[0].onclick();
        }
        // 递归，始终运行
        setTimeout(auto,auto_delay);
    }
    auto();
    // 当焦点在轮播图中，改变auto_moved的状态，停止自动切换
    carousel[0].onmouseover=function(){
        auto_moved=false;
    }
    // 焦点离开轮播图，自动切换开始
    carousel[0].onmouseout=function(){
        auto_moved=true;
    }
 }