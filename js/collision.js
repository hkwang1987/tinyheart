function momFruitsCollision(){
	if(!dataObj.gameover){
		for(var i = 0; i < fruitObj.fruitNum; i++){
			if(fruitObj.alive[i]){
				//判断距离 calculate lenth 
				var len = calLength2(fruitObj.x[i],fruitObj.y[i],mumObj.x,mumObj.y);
				if(Math.sqrt(len)<20){ //大鱼和果实距离小于20  说明发生碰撞，即吃到果实
					//console.log("eatFruit");
					audioObj.MumEatPlay();
					fruitObj.alive[i] = false;
					waveObj.born(fruitObj.x[i],fruitObj.y[i]); //产生水波涟漪效果
					if(fruitObj.fruitType[i] == "orange"){
						dataObj.fruitNum += 1;
						mumObj.blueFlag = false; //吃到黄色果实
					}else{
						dataObj.doubleNum += 1;
						mumObj.blueFlag = true; //吃到蓝色果实
					}
					var Num = dataObj.fruitNum + dataObj.doubleNum;
					if(Num==4)	audioObj.goodPlay();
					if(Num==6)	audioObj.wonderPlay();
					if(Num==9)	audioObj.amazingPlay();
					mumObj.EatEvent = true; //发生吃的动作
				}
			}
		}
	}
	
}

function momBabyCollision(){
	if((dataObj.fruitNum + dataObj.doubleNum) && !dataObj.gameover){
		var len = calLength2(babyObj.x,babyObj.y,mumObj.x,mumObj.y)
		if(Math.sqrt(len)<20){
			//console.log("FadeBaby");
			//baby recover
			waveObj.born(babyObj.x,babyObj.y); //产生水波涟漪效果
			audioObj.babyEatPlay();
			babyObj.babyBodyCnt = 0;	
			mumObj.BodyReset();
			dataObj.getScore();
			dataObj.reset();
		}	
	}
}


