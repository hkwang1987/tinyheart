var dustObj = function(){
	this.x = [];
	this.y = [];
	this.pic = [];
	this.picID = [];
	this.l = []; //漂浮物大小；
	this.alpha = 0;
	this.amp = [];
}
dustObj.prototype.dustNum = 30; //漂浮物个数

dustObj.prototype.init = function(){
	for(var i = 0; i< this.dustNum;i++){
		this.x[i] = Math.random()* canWidth;
		this.y[i] =Math.random() * (canHeight-100);
		this.picID[i] = Math.floor(Math.random() * 7);
		this.l[i] = Math.random()* 10 + 10;
		if(this.l[i]>20){
			this.l[i]>20;
		}
		this.amp[i] = Math.random() * 20 +20; //摆动幅度调整
	}
	
	for(var i = 0; i < 7; i++){
		this.pic[i] = new Image();
		this.pic[i].src = "./src/dust" + i +".png";
	}
}

dustObj.prototype.draw = function(){
	
	this.alpha += deltaTime * 0.0005;
	var temp = Math.sin(this.alpha);
	ctx1.save();
	for(var i = 0; i< this.dustNum;i++){
		ctx1.drawImage(this.pic[this.picID[i]],this.x[i] + temp * this.amp[i],this.y[i],this.l[i],this.l[i]);
	}
	ctx1.restore();
}