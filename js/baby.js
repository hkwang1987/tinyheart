var babyObj = function(){
	this.x;
	this.y;
	this.angle;
	this.babyEye = [];
	this.babyBody = [];
	this.babyTail = [];
	
	this.babyTailCnt; // 小鱼尾摆动图片切换
	this.babyTailTimer; //小鱼尾摆动速度控制
	this.babyTailInterval;
	
	this.babyEyeCnt;  //小鱼眨眼控制
	this.babyEyeTimer; //小鱼眨眼速度
	this.babyEyeInterval; //小鱼闭眼时间
	
	this.babyBodyCnt;
	this.babyBodyTimer;
	this.babyBodyInterval;
	
}

babyObj.prototype.init = function(){
	this.x = canWidth * 0.5 - 50;
	this.y = canHeight * 0.5 + 50;
	this.angle = 0;
	this.babyBody.src = "./src/babyFade0.png";
	
	//加载小鱼眼睛资源
	for (var i = 0; i<2; i++){
		this.babyEye[i] = new Image();
		this.babyEye[i].src = "./src/babyEye" + i + ".png";
	}
	
	//加载小鱼尾巴资源
	for (var i = 0; i<8; i++){
		this.babyTail[i] = new Image();
		this.babyTail[i].src = "./src/babyTail" + i + ".png";
	}
	
	for(var i = 0; i < 20; i++){
		this.babyBody[i] = new Image();
		this.babyBody[i].src = "./src/babyFade" + i + ".png";
	}
	
	this.babyTailCnt = 0;
	this.babyTailTimer = 0;
	this.babyTailInterval = 20;
	
	this.babyEyeCnt = 0;
	this.babyEyeTimer = 0;
	this.babyEyeInterval = 1000; //1000毫秒
	
	this.babyBodyCnt = 0;
	this.babyBodyTimer = 0;
	this.babyBodyInterval = 300;
}

babyObj.prototype.draw = function(){
	
	this.x = lerpDistance(mumObj.x, this.x, 0.99);  //使this.x坐标按比例趋近于mumObj.x (每帧趋近90%)
	this.y = lerpDistance(mumObj.y, this.y, 0.99); //同上
	
	//小鱼随妈妈角度移动
	var deltaY = mumObj.y - this.y;
	var deltaX = mumObj.x - this.x;
	var beta = Math.atan2(deltaY,deltaX) + Math.PI;  //-PI,PI 之前的值
	this.angle = lerpAngle(beta,this.angle,0.6);
	
	//小鱼尾巴摆动控制
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > this.babyTailInterval){
		this.babyTailCnt = (this.babyTailCnt+1) % 8;
		this.babyTailTimer = 0;
	}
	
	//小鱼眨眼控制
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCnt = (this.babyEyeCnt+1) % 2;
		this.babyEyeTimer = this.babyEyeTimer % this.babyEyeInterval;
		this.babyEyeTimer = 0;
	}
	if(this.babyEyeCnt==0){
		this.babyEyeInterval = Math.random() * 2000 + 2000 //[2000,4000 ms)
	}else{
		this.babyEyeInterval = 100;
	}
	
	//小鱼身体变化
	this.babyBodyTimer += deltaTime * 0.3 //随关卡数控制
	if(this.babyBodyTimer > this.babyBodyInterval){
		this.babyBodyCnt =(this.babyBodyCnt + 1);
		this.babyBodyTimer = 0;
	}
	if(this.babyBodyCnt > 19){
		this.babyBodyCnt = 19;
		dataObj.gameover = true;
		audioObj.stopbgMusic();
		audioObj.gameoverPlay();
	}
	
	
	
	ctx1.save();
	ctx1.translate(this.x,this.y); //将画布坐标基准定义到 x 和 y 
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.babyTail[this.babyTailCnt],-this.babyTail[this.babyTailCnt].width*0.5+23,-this.babyTail[this.babyTailCnt].height*0.5);
	ctx1.drawImage(this.babyBody[this.babyBodyCnt],-this.babyBody[this.babyBodyCnt].width*0.5,-this.babyBody[this.babyBodyCnt].height*0.5);
	ctx1.drawImage(this.babyEye[this.babyEyeCnt],-this.babyEye[this.babyEyeCnt].width*0.5,-this.babyEye[this.babyEyeCnt].height*0.5);
	ctx1.restore();
	
	
}





