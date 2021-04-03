var play = 1 ;
var END = 0 ;
var gameState = play;

var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(windowHeight,windowWidth);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY=4;  



//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
  
//gameover=createSprite(200,200);
//gameover.addImage("end", endImg);
//gameover.scale=3;  
  

}

function draw() {

  background(0);
  
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

  
    if (gameState === play ) { 
      path.velocityY = 4;
      boy.x = World.mouseX;
      if(path.y > 400 ){
    path.y = height/2; }
      
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+100;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+100;
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;
      
    }
      
      else if (swordGroup.isTouching(boy)) { 
   gameState=END;
   } 
    } 
   if (gameState===END){
     swordGroup.destroyEach();
     boy.addAnimation("SahilRunning",endImg);
     boy.scale=0.5;
     path.velocityY=0;
     boy.x=200;
     boy.y=200;
     cashG.destroyEach(0);
     diamondsG.destroyEach(0);
     jwelleryG.destroyEach(0);
     swordGroup.destroyEach(0);
   } 
     
     

  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,50) ;

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50,350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = (3+treasureCollection/300);
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50,350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = (3+treasureCollection/300);
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50,350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = (3+treasureCollection/300);
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50,350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = (3+treasureCollection/200);
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}