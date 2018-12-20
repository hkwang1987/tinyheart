var waveObj = function(){
	this.x = [];
	this.y = [];
	this.r = [];
	this.alive = [];
	this.waveNum;
}

waveObj.prototype.init = function(){
	for(var i = 0; i< 20;i++){
		this.x[i] = Math.random()* 100 + canWidth * 0.5;
		this.y[i] = Math.random()* 200 + canHeight *0.5;
		this.r[i] = 10;
		this.waveNum = 10;
		this.alive[i] = false;
	}
}

waveObj.prototype.born = function(x,y){
	for(var i = 0; i< this.waveNum;i++){
		if(!this.alive[i]){
			this.alive[i] = true;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}
	}
}

waveObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 1.5;
	ctx1.shadowBlur = 5;
	ctx1.shadowColor = "white";
	for(var i = 0; i< this.waveNum;i++){
		if(this.alive[i]){
			this.r[i] = (this.r[i] + deltaTime * 0.02);
			var alpha = 1 - this.r[i] / 50;
			if(this.r[i] > 50){
				this.r[i] = 0;
				this.alive[i] = false;
				break;
			}
			ctx1.beginPath();
			ctx1.strokeStyle = "rgba(255,255,255," + alpha+")";
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,2*Math.PI);
			ctx1.stroke();
		}
	}
	ctx1.restore();
}