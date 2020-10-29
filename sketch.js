var gameState = "play";

var ghost, door, climber, tower, ouch;

var ghostImage, doorImage, climberImage, towerImage;

var climberGroup, doorGroup, ouchGroup;

function preload() {
 
 towerImage = loadImage("tower.png");
 
 ghostImage = loadImage("ghost-standing.png");
 
 doorImage = loadImage("door.png");
 
 climberImage = loadImage("climber.png");
}

function setup() {
  createCanvas(600,600);

  doorGroup = new Group();
  climberGroup = new Group();
  ouchGroup = new Group();

  tower = createSprite(300,300,20,20);
  tower.addImage(towerImage);
  tower.velocityY = 5;

  ghost = createSprite(300,300,20,20);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;

}

function draw() {
 background("black");
 
 if (gameState === "play") {
 
 if(tower.y > 600){
 tower.y = 300;
 }
 
 ghost.velocityY = 2;
 
 if (keyDown("space")) {
 ghost.velocityY = -4;
 }
 if(keyDown("right")){
 ghost.x = ghost.x + 6;
 }
 if(keyDown("left")){
 ghost.x = ghost.x - 6;
 }
 
 if (ghost.isTouching(climberGroup)){
    ghost.velocityY = 0;
    }
 
 platform();
 
 if(ghost.isTouching(ouchGroup) || ghost.y > 600) {
  
  gameState = "end";
 }
 
  drawSprites();
 }

  if(gameState === "end") {
  fill("white")
  stroke("white")
  textSize(20)
  text("Game Over", 300, 300);
  }
 
}


function platform() {

    if(frameCount % 200 === 0) {
    
    var location = Math.round(random(150,550));
    
    door = createSprite(location,0,20,20);
    door.addImage(doorImage);
    door.velocityY = 3;
    door.lifeTime = 200;
    doorGroup.add(door);
    
    climber = createSprite(location,60,20,20);
    climber.addImage(climberImage);
    climber.velocityY = 3;
    climber.lifeTime = 200;
    climberGroup.add(climber);
    
    ouch = createSprite(location,65,climber.width,2);
    ouch.velocityY = 3;
    ouch.lifeTime = 200;
    ouch.debug = true;
    ouchGroup.add(ouch);
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
}
}