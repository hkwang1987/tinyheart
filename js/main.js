document.body.onload = game;

var can1;
var can2;
var ctx1;
var ctx2;
var mx;
var my;
//var mumX;
//var mumY;
var aneObj;  //海葵对象
var fruitObj; //果实对象
var dataObj;
var waveObj; //水波涟漪对象
var dustObj; //漂浮物对象
var canWidth;
var canHeight;
var btnFlag;

var btnX;
var btnY;

var babyTailCnt;
var babyTailTimer;
var btnshadowBlur;
var lastTime;
var deltaTime;
var bgPic = new Image();
var coverPic = new Image();
var startButton = new Image();

var playFlag; //游戏开始开关；

function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	can1 = document.getElementById("canvas1");
	can2 = document.getElementById("canvas2");
	ctx1 = can1.getContext("2d");
	ctx2 = can2.getContext("2d");
	
	can1.addEventListener("mousemove",onMouseMove,false);//位canvas1 添加监听事件
	can1.addEventListener("mousedown",onMouseDown,false);//位canvas1 添加监听事件
	bgPic.src = "./src/background.jpg";
	coverPic.src = "./src/cover.png";
	startButton.src = "./src/play.png";
	
	playFlag = false; //游戏未开始；
	btnshadowBlur = 5;
	btnFlag = false; //判断鼠标是否移到开始按钮区域
	
	canWidth = can1.width;
	canHeight = can1.height;
	
	mx = canWidth*0.5;
	my = canHeight*0.5;
	btnX = canWidth*0.5-40;
	btnY = canHeight*0.5+75
	//mumX = mx;
	//mumY = my;
	
	aneObj = new aneObj();
	aneObj.init();
	
	fruitObj = new fruitObj();
	fruitObj.init();
	
	mumObj = new mumObj();
	mumObj.init();
	
	babyObj = new babyObj();
	babyObj.init();
	
	dataObj = new dataObj();
	dataObj.init();
	
	waveObj = new waveObj();
	waveObj.init();
	
	dustObj = new dustObj();
	dustObj.init();
	
	audioObj = new audioObj();
	audioObj.init();
}

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime>40) deltaTime = 40;
	if(!playFlag){
		drawCover();
		drawStartButton(btnX,btnY);
	}else{
		if(!dataObj.gameover){
			audioObj.loadbgMusic();
		}
		drawBackground();
		aneObj.draw();
		fruitObj.Monitor();
		//绘制果实 
		fruitObj.draw();
		//绘制大鱼
		ctx1.clearRect(0,0,canWidth,canHeight);
		mumObj.draw();
		
		babyObj.draw();
		
		dataObj.draw();
		
		waveObj.draw();
		
		dustObj.draw();
		
		momFruitsCollision();
		momBabyCollision();
	}
	
	
	
}

function onMouseMove(e){
	
	var evt=e||window.event;
	if(evt.offSetX || evt.layerX){
		mx = evt.offsetX == undefined ? evt.pageX : evt.offsetX;
		my = evt.offsetY == undefined ? evt.pageY : evt.offsetY;
		onMouseOverBtn(mx,my);
		
		if(!dataObj.gameover){
			mumX = mx;
			mumY = my;
		}
		
		
		//onMouseOverRetry(mx,my);
	}	
	
}

function BlurImg(x)
{
	btnshadowBlur = 20;
}

function normalImg(x)
{
	btnshadowBlur = 5;
}

function onMouseOverBtn(x,y){
	if((x>btnX && x < btnX + startButton.width) && (y>btnY && y < btnY + startButton.height)){
		if(!btnFlag && !playFlag){
			BlurImg(startButton);
			audioObj.MumEatPlay();
			btnFlag = true;
		}
	}else{
		normalImg(startButton);
		btnFlag = false;
	}
}

function onMouseDown(){
	if((mx>btnX && mx < btnX + startButton.width) && (my>btnY && my < btnY + startButton.height)){
		playFlag = true; //鼠标按下，游戏开始；
	}
}

