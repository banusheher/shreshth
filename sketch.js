var man, manI;
var coin, coinI;
var obs1, obs1I;
var obs2I;
var obs3I;
var bk, bkI;
var gameOver,gameOverI;
var reset, resetI;
var invisible;
var coinsGroup;
var obsGroup;
var collide;

var points;
var score;
var highscore;

// Game States for running game.
var PLAY = 1;
var END = 0;
var gameState=1;

function preload(){
  manI = loadAnimation("running8.png","running7.png","running6.png","running5.png","running4.png","running3.png","running2.png","running1.png");
  
  bkI = loadImage("bk1.jpg");

  obs1I = loadImage("rock.png");
  obs2I = loadImage("cactus.png");
  obs3I = loadImage("fence.png");

  coinI = loadImage("coin.png");

gameOverI = loadImage("GameOver.png");

resetI = loadImage("Restart.png");

collide = loadAnimation("running7.png","running7.png")

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  
  bk = createSprite(width+3200,height/2-150,width,height);
 bk.addImage(bkI);
  bk.scale=1.3;
  bk.velocityX=-10;
  
  man = createSprite(0+150,height/2+200,20,20);
  man.debug = true;
  man.setCollider("rectangle",-200,0,700,1300);
  man.scale=0.15;
  man.addAnimation("moving",manI);
  man.addAnimation("stoping",collide);

  invisible = createSprite(man.x,man.y+100,width,10);
  invisible.visible=false;

  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverI); 
  gameOver.visible=false;

  reset = createSprite(width/2,height/2-200);
  reset.addImage(resetI);
  reset.scale=0.5;
  reset.visible=false;

  score = 0;
  highscore = 0;
  points = 0;

  coinsGroup = createGroup();
  obsGroup = createGroup();
}

function draw(){
  background("white");

  
  
  if(gameState===1){

   man.changeAnimation("moving",manI);

    score = score + Math.round(getFrameRate()/60);

    if(highscore<=score){
      highscore=highscore+ Math.round(getFrameRate()/60);
    }
  

  if(bk.x<-2000){
    bk.x=width+3200;
  }

  if(touches.length>0||keyDown("space")&&man.y>=490.5){
  man.velocityY=-15;
  touches = [];
 }
  man.velocityY=man.velocityY+0.5;

  if(man.isTouching(coinsGroup)){
   points = points+2;
   coinsGroup.destroyEach();
  }

  if(man.isTouching(obsGroup)){
    gameState=0;
  }
  
}
else if(gameState===0){

  man.changeAnimation("stoping",collide);

  gameOver.visible=true;
  reset.visible=true;

  obsGroup.setLifetimeEach(-1);
  coinsGroup.setLifetimeEach(-1);

  obsGroup.setVelocityXEach(0);
  coinsGroup.setVelocityXEach(0);
  bk.velocityX=0;

  man.velocityY=0;

}
  man.collide(invisible);

  obstacles();
  coins();
  drawSprites();
  
  stroke("yellow");
  strokeWeight(3);
  textSize(20);
  text("COINS "+points,0+30,0+30);

  stroke("red")
  text("Score "+score,width/2,0+30);
  text("HighScore "+score, width/2+200,0+30);
  
  console.log();
}

function obstacles(){
  if(frameCount%100===0){
   obs1 = createSprite(width+60,height/2+200,30,40);
   obs1.debug=true;
   obs1.scale=0.9;
   obs1.velocityX=-10;
   obs1.lifetime=150;

   rand = Math.round(random(1,3));

   if(rand==1){
     obs1.addImage(obs1I);
     obs1.scale=2;
     obs1.y=height/2+150;
   }
   else if(rand==2){
    obs1.addImage(obs3I);
    obs1.scale=1.3;
   }
   else if(rand==3){
    obs1.addImage(obs2I);
   }
   obsGroup.add(obs1);
  }
}

function coins(){
  if(frameCount%100===0){
  coin = createSprite(width+50,height/2,20,20);
  coin.addImage(coinI);
  coin.scale=0.1;
  coin.velocityX=-10;

  coin.lifetime=150;

  coinsGroup.add(coin);
 }
}


