var fruitObj = function(){
	this.alive = []; //bool  海葵状态
	this.orange = new Image();
	this.blue = new Image();
	this.x = [];
	this.y = [];
	this.l = []; //控制果实大小
	this.spd = [];
	this.fruitType = []; //字符串数组  ，标识果实类型 blue  orange
	this.aneID = [];
	
}

fruitObj.prototype.fruitNum = 30;
fruitObj.prototype.init = function(){
	for(var i = 0;i<this.fruitNum;i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.spd[i] = Math.random() * 0.015 + 0.002; //[0.003, 0.017)
		this.fruitType[i] = "";
		this.aneID[i] = 0;
	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}

fruitObj.prototype.draw = function(){
	for(var i=0;i<this.fruitNum;i++){
		//console.log("drawfruit");
		//draw
		//find an ane  grow. fly up
		if(this.alive[i]){
			var pic;
			if(this.fruitType[i] == "orange"){
				pic = this.orange;
			}else{
				pic = this.blue;
			}
			if(this.l[i]<=12){ //果实的大小
				this.l[i] += 0.002 * deltaTime; //成熟速度
				this.x[i] = aneObj.headX[this.aneID[i]];
				this.y[i] = aneObj.headY[this.aneID[i]];
			}else{
				this.y[i]-=this.spd[i]*2* deltaTime;  //漂浮速度
			}
			ctx2.drawImage(pic,this.x[i]-this.l[i] * 0.5,this.y[i]-this.l[i] * 0.5, this.l[i],this.l[i]);
			if(this.y[i] < 10){
				this.alive[i] = false;
			}
		}
		
	}
}

fruitObj.prototype.born = function(i){
		this.aneID[i] = Math.floor(Math.random() * aneObj.aneNum);
		this.l[i] = 0;
		this.alive[i] = true;
		var ran = Math.random();
		if(ran<0.2){
			this.fruitType[i] = "blue";
		}
		else{
			this.fruitType[i] = "orange";
		}
}

fruitObj.prototype.Monitor = function (){
	var fruitCnt = 0;
	for(var i = 0; i < this.fruitNum; i++){
		if(this.alive[i]){
			fruitCnt++;
		}
	}
	if(fruitCnt<15){ //果实数量
		this.sendFruit();
		return;
	}
}

fruitObj.prototype.sendFruit = function (){
	for(var i = 0; i< this.fruitNum; i++){
		if(!this.alive[i]){
			this.born(i);
			return;
		}
	}
	
}


