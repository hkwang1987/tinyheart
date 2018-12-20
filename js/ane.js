var aneObj = function()
{
	this.x = [];
	this.length= [];
	//startpoint   ctrlpoint endpoint  二次贝塞尔曲线的三个点，起始点，控制点，结束点，
	this.startX = [];
	this.startY = [];
	this.ctrlX = [];
	this.ctrlY = [];
	this.headX = [];
	this.headY = [];
	this.amp = [];
	this.alpha = 0;
}

aneObj.prototype.aneNum = 50;
aneObj.prototype.init = function(){
	for(var i = 0; i<this.aneNum; i++){
		this.x[i] = i * 16 + Math.random()*20;
		this.length[i] = 170 + Math.random() * 50;
		//初始化二次贝塞尔曲线的三个点坐标
		this.startX[i] = this.x[i];
		this.startY[i] = canWidth;
		this.ctrlX[i] = this.startX[i];
		this.ctrlY[i] = canHeight - 100;
		this.headX[i] = this.x[i]; //利用正弦函数，实现左右摆动
		this.headY[i] = canHeight - this.length[i];
		this.amp[i] = Math.random() * 50 +20; //摆动幅度调整
	}
}

aneObj.prototype.draw = function(){
	
	this.alpha += deltaTime * 0.0005;
	var l = Math.sin(this.alpha);
	ctx2.save();
	ctx2.globalAlpha=0.6;
	ctx2.lineWidth=20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";
	for(var i = 0;i<this.aneNum;i++){ 
		//beginPath moveTo,lineTo,stoke,stokestyle,linewidth,linecap,globalALph
		this.headX[i] = this.x[i] + l * this.amp[i];
		ctx2.beginPath();
		ctx2.moveTo(this.startX[i],this.startY[i]);
		ctx2.quadraticCurveTo(this.ctrlX[i],this.ctrlY[i],this.headX[i],this.headY[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}