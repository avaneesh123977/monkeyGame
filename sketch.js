
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY = 1
var END = 0
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  monkey_stop = loadAnimation("sprite_0.png")
 
}



function setup() {
 createCanvas(500, 500); 
 monkey=createSprite (80, 315, 20, 20);
 monkey.addAnimation("moving" , monkey_running);
 monkey.addAnimation("stop" , monkey_stop);
 monkey.scale=0.1
  
 ground = createSprite(400, 350, 900, 10);
 ground.velocityX =-4;
 ground.x = ground.width/2;
 fruitGroup = createGroup();
 obstacleGroup = createGroup();
 score = 0
}


function draw() {
  background(255);
  
  text("score = "+score,400, 50);
  if(gameState===PLAY){
     
     if(ground.x<0){
        ground.x = ground.width/2
     }
  
     if(keyDown("space") && monkey.y >= 100) {
        monkey.velocityY = -12
     }
     monkey.velocityY = monkey.velocityY+0.8;
     spawnBanana();
     if(fruitGroup.isTouching(monkey)){
        score = score+1;
        fruitGroup.destroyEach();
     }
    spawnObstacle();
    if(obstacleGroup.isTouching (monkey)){
       gameState = END
    }
  }
  else if (gameState===END){
      ground.velocityX = 0;
      monkey.velocityY = 0;
      fruitGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      fruitGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
      monkey.changeAnimation("stop" , monkey_stop);
  }
  
  
  monkey.collide(ground);
  drawSprites();
  
}





function spawnBanana(){
   if (frameCount% 60 === 0){
       var banana = createSprite(500, 120, 40, 10)
       banana.y = Math.round(random(150, 300));
       banana.addImage(bananaImage);
       banana.scale = 0.1
       banana.velocityX = -3
     
       banana.lifetime = 200;
     
       banana.depth = monkey.depth;
       monkey.depth = monkey.depth + 1;
       fruitGroup.add(banana);
   }
   
} 

function spawnObstacle(){
   if (frameCount% 120 === 0){
       var obstacle = createSprite(500, 340, 40, 10)
       obstacle.addImage(obstacleImage);
       obstacle.scale = 0.1
       obstacle.velocityX = -3
     
       obstacle.lifetime = 200;
     
       
       obstacleGroup.add(obstacle);
   }
   
} 