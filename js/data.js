var dataObj = function(){
	this.fruitNum;
	this.doubleNum;
	this.score;
	this.gameover = false;
	this.alpha;
}

dataObj.prototype.init = function(){
	this.fruitNum = 0;
	this.doubleNum = 0;
	this.score = 0;
	this.alpha = 0;
}

dataObj.prototype.getScore = function(){
	this.score = this.score + this.fruitNum*10 + this.doubleNum*20;
}

dataObj.prototype.reset = function(){
	this.fruitNum = 0;
	this.doubleNum = 0;
}

dataObj.prototype.draw = function(){
	var w = canWidth;
	var h = canHeight;
	ctx1.fillStyle = "white";
	ctx1.font="normal bold 25px Verdana white ";
	ctx1.textAlign = "center";
	ctx1.fillText("SCORE : "+ this.score,canWidth * 0.5, canHeight-60);
	if(this.gameover){
		this.alpha += deltaTime * 0.0005;
		if(this.alpha>1) 
			this.alpha = 1;
			//play again
		ctx1.fillStyle = "rgba(255,255,255,"+ this.alpha +")";
		ctx1.fillText("GAME OVER", canWidth * 0.5, canHeight * 0.5);
	}
}

