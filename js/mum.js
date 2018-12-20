var mumObj = function(){
	this.x;
	this.y;
	this.angle; // 大鱼旋转的角度
	this.bigEye = [];
	this.bigTail = [];
	this.bigSwim = [];
	this.bigEat = [];
	this.bigSwimBlue = [];
	this.bigEatBlue = [];
	this.bigBody = new Image();
	
	this.bigTailTimer;
	this.bigTailcnt;
	
	this.bigEyeCnt;
	this.bigEyeTimer;
	this.bigEyeInterval;
	this.bigEatTimer;
	
}
mumObj.prototype.blueFlag = false;
mumObj.prototype.totalEatFruit = 0;
mumObj.prototype.EatEvent = false;
mumObj.prototype.init = function(){
	this.x = canWidth*0.5;
	this.y = canHeight*0.5;
	this.angle = 0;
	this.bigEye.src = "./src/bigEye0.png";
	this.bigBody.src = "./src/big.png";
	this.bigTail.src = "./src/bigTail0.png";
	
	this.bigTailTimer = 0;
	this.bigTailCnt = 0;
	this.bigEyeCnt = 0;
	this.bigEyeTimer = 0;
	this.bigEyeInterval = 1000; //1000毫秒
	this.bigEatTimer = 0;
	
	this.mx =0;
	this.my =0;
	
	//加载大鱼尾巴资源
	for (var i = 0; i < 8; i++){
		this.bigTail[i] = new Image();
		this.bigTail[i].src = "./src/bigTail" + i +".png";
	}
	
	//加载大鱼眼睛资源
	for (var i = 0; i<2; i++){
		this.bigEye[i] = new Image();
		this.bigEye[i].src = "./src/bigEye" + i + ".png";
	}
	
	for (var i = 0;i<8;i++){
		this.bigEat[i] = new Image();
		this.bigEat[i].src = "./src/bigEat" + i +".png";
	}
	
	for (var i = 0;i<8;i++){
		this.bigSwim[i] = new Image();
		this.bigSwim[i].src = "./src/bigSwim" + i +".png";
	}
	
	for (var i = 0;i<8;i++){
		this.bigEatBlue[i] = new Image();
		this.bigEatBlue[i].src = "./src/bigEatBlue" + i +".png";
	}
	
	for (var i = 0;i<8;i++){
		this.bigSwimBlue[i] = new Image();
		this.bigSwimBlue[i].src = "./src/bigSwimBlue" + i +".png";
	}
}
mumObj.prototype.BodyColor = 0;
mumObj.prototype.EatMonitor = function(){
	if(this.EatEvent){ //检测发生了吃的动作
		if(this.blueFlag){
			this.bigBody = this.bigEatBlue[this.BodyColor];
		}
		else {
			this.bigBody = this.bigEat[this.BodyColor];
		}
		this.bigEatTimer += deltaTime; //吃动作的计时器，根据帧刷新速率计时//吃的动作维持150毫秒
		if(this.bigEatTimer > 150){ //吃的动作结束，身体颜色变深一级
			this.BodyColor++; //吃了几个果实，果实越多，身体颜色越深，一一对应
			if(this.BodyColor>7) this.BodyColor=7; //每次吃完以后 身体颜色要变化一次，达到最深颜色终止变化
			this.bigEatTimer = 0;
			this.EatEvent = false;
			if(this.blueFlag){	
				this.bigBody = this.bigSwimBlue[this.BodyColor];
			}
			else{
				this.bigBody = this.bigSwim[this.BodyColor];
			}
		}		
	}else{
		if(this.blueFlag){	
			this.bigBody = this.bigSwimBlue[this.BodyColor];
		}
		else{
			this.bigBody = this.bigSwim[this.BodyColor];
		}
	}
	
}

mumObj.prototype.BodyReset = function(){
	this.BodyColor = 0;
}

mumObj.prototype.draw = function(){
	
	//aim 基准坐标，cur 当前坐标，ratio 百分比
	
	this.x = lerpDistance(mumX, this.x, 0.99);  //使this.x坐标按比例趋近于mx (每帧趋近90%)
	this.y = lerpDistance(mumY, this.y, 0.99); //同上
	//delta angle;
	//Math.atan2(y,x); 
	var deltaY = mumY - this.y;
	var deltaX = mumX - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;  //-PI,PI 之前的值
	this.angle = lerpAngle(beta,this.angle,0.6);
	//this.angle = lerpAngle(this.angle,beta,0.9);
	
	
	//大鱼尾巴摆动控制
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer > 20){
		this.bigTailCnt = (this.bigTailCnt+1) % 8;
		this.bigTailTimer = 0;
	}
	
	//大鱼眨眼控制
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer > this.bigEyeInterval){
		this.bigEyeCnt = (this.bigEyeCnt+1) % 2;
		this.bigEyeTimer = this.bigEyeTimer % this.bigEyeInterval;
		this.bigEyeTimer = 0;
	}
	if(this.bigEyeCnt==0){
		this.bigEyeInterval = Math.random() * 2000 + 2000 //[2000,4000 ms)
	}else{
		this.bigEyeInterval = 100;
	}
	this.EatMonitor(); //持续监测大鱼吃的动作
	ctx1.save();
	ctx1.translate(this.x,this.y); //将画布坐标基准定义到 x 和 y 
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.bigTail[this.bigTailCnt],-this.bigTail[this.bigTailCnt].width*0.5+29,-this.bigTail[this.bigTailCnt].height*0.5);
	ctx1.drawImage(this.bigBody,-this.bigBody.width*0.5,-this.bigBody.height*0.5);
	ctx1.drawImage(this.bigEye[this.bigEyeCnt],-this.bigEye[this.bigEyeCnt].width*0.5,-this.bigEye[this.bigEyeCnt].height*0.5);
	ctx1.restore();
}