var audioObj = function(){
	this.MumEat;
	this.babyEat;
	this.mumEatFlag;
	this.bgMusic;
	this.gameoverFlag;
}
audioObj.prototype.init = function(){
	this.MumEat = document.getElementById("MumEat");
	this.babyEat = document.getElementById("babyEat");
	this.bgMusic = document.getElementById("bgMusic");
	this.good = document.getElementById("good");
	this.wonder = document.getElementById("wonder");
	this.amazing = document.getElementById("amazing");
	this.gameover = document.getElementById("gameover");
	this.gameoverFlag = false;
}

audioObj.prototype.MumEatPlay = function(){
	this.MumEat.currentTime=0;
	this.MumEat.play();
}

audioObj.prototype.babyEatPlay = function(){
	this.babyEat.currentTime=0;
	this.babyEat.play();
}

audioObj.prototype.loadbgMusic = function(){
	this.bgMusic.volume=0.4;
	this.bgMusic.play();
}

audioObj.prototype.stopbgMusic = function(){
	this.bgMusic.pause();
}

audioObj.prototype.goodPlay = function(){
	this.good.currentTime=0;
	this.good.volume=0.4;
	this.good.play();
}

audioObj.prototype.wonderPlay = function(){
	this.wonder.currentTime=0;
	this.wonder.volume=0.4;
	this.wonder.play();
}

audioObj.prototype.amazingPlay = function(){
	this.amazing.currentTime=0;
	this.amazing.volume=0.4;
	this.amazing.play();
}

audioObj.prototype.gameoverPlay = function(){
	//this.gameover.currentTime=0;
	if(!this.gameoverFlag){
		this.gameover.volume=0.4;
		this.gameover.play();
		this.gameoverFlag = true;
	}
}
