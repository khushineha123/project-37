 var player , player_running;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var score = 0;
var ground,backgr,backImage;

function preload(){
  
  
 player_running =loadImage("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png",
 "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(450,400);
  
  backgr = createSprite(0,0,450,400);
  backgr.addImage(backImage);
  //backgr.velocityX = -8;
  backgr.x = backgr.width/2;
  backgr.scale = 1.3;
  player = createSprite(100,340,20,50);
  player.addAnimation("running",player_running);
  player.scale = 0.1;

  ground = createSprite(400,350,900,10);
  ground.velocityX = -8;
  ground.x = ground.width/2;
  ground.visible = false;
  console.log(ground.x)
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  
}


function draw() {
background(0);
  player.velocityX=2;
  if(backgr.x < 100 ){
  backgr.x = backgr.width/2;
  }
  if(ground.x < 0 ){
  ground.x = ground.width/2;
}
player.collide(ground);
food();
obstacles();
  
if(keyDown("Space")&& player.y >= 100) {
     player.velocityY = -12;
   }
  
player.velocityY = player.velocityY + 0.8
  
  if(bananaGroup.isTouching(player)){
       bananaGroup.destroyEach();
       score = score + 1;
     }
  
  if(obstacleGroup.isTouching(player)){
    player.velocityY = 0;
    ground.velocityX = 0;
   obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    survivalTime =Math.ceil(frameCount/frameRate(0));
  }
 


 stroke("black");
textSize(20);
  fill("black");
  text("Score: "+score,300,50);
  
stroke("black");
textSize(20);
  fill("black");
  survivalTime =Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime,50,50);
camera.position.x=player.x

drawSprites();
}
function food(){
  if(frameCount % 80 === 0 ){
  banana = createSprite(350,100,10,10);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  //banana.velocityX = -4;
  camera.position.x=banana.x
  bananaGroup.add(banana);
  banana.lifetime = 100;
    }
}
function obstacles(){
  if(frameCount % 300 === 0){
  obstacle = createSprite(200,330,10,10);
  obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
 // obstacle.velocityX = -6;
 camera.position.x=obstacleGroup.x
  obstacleGroup.add(obstacle);
  obstacle.lifetime = 150;
  }
}

