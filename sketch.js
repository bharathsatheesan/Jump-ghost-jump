var tower, towerImage;
var doorImage, door, doorsGroup;
var climber, climberImage, climbersGroup;
var ghost, ghostImage;
var invisibleBlockGroup, invisibleBlock;
var gamestate = "play";
var spookySound;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1;
  tower.y = 300;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.5;
  
  spookySound.loop();
}

function draw(){
  background("black");
  //tower.velocityY = 1;
  
  if(gamestate === "play"){
    if(tower.y > 600){
      tower.y = 300;
    }

    if(keyDown("left")){
      ghost.x = ghost.x - 3;
    }

    if(keyDown("right")){
      ghost.x = ghost.x + 3;
    }

    if(keyDown("space")){
      ghost.velocityY = -5;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
  
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gamestate = "end";
    }
  
    spawnDoors();
    drawSprites();
  }
  
  if(gamestate === "end"){
    stroke("yellow");
    textSize(30);
    text("Game Over", 230, 250)
  }
  
  
}

function spawnDoors(){
  if(frameCount%240===0){
    door = createSprite(200, -50);
    door.addImage("door", doorImage);
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 800;
    
    doorsGroup.add(door);
    
    climber = createSprite(200, 10);
    climber.addImage("climber", climberImage);
    climber.x = door.x;
    climber.velocityY = door.velocityY;
    ghost.depth = door.depth;
    ghost.depth += 1;
    climber.lifetime = door.lifetime;
    
    climbersGroup.add(climber);
    
    invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    
    invisibleBlockGroup.add(invisibleBlock);
  }
}