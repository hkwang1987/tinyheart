function drawBackground(){
	ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
}

function drawCover(){
	ctx2.drawImage(coverPic,0,0,canWidth,canHeight);
	//console.log("coverPic");
}

function drawStartButton(px,py){
	ctx2.save();
	ctx2.shadowBlur = btnshadowBlur;
	ctx2.shadowColor = "white";
	ctx2.drawImage(startButton,px,py,startButton.width,startButton.height);
	ctx2.restore();
}