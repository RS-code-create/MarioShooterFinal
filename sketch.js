var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;

var bullets = 225;

var score = 0;

var life = 3;

var gameState = "fight"


function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadImage("assets/Mario:2.png")
  shooter_shooting = loadImage("assets/Mario:3.png")

  shellImg = loadImage("assets/Shell.png")

  zombieImg = loadImage("assets/Shroob.webp")

  bgImg = loadImage("assets/bg.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.5

  edges = createEdgeSprites();

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.15
   player.bounceOff(edges)
   player.setCollider("rectangle",0,0,800,1000)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating groups for zombies and bullets
    bulletGroup = new Group()
    zombieGroup = new Group()



}

function draw() {
  background(0); 


if(gameState === "fight"){
  if(life === 3){
    heart3.visible = true
    heart2.visible = false
    heart1.visible = false
  }
  if(life === 2){
    heart3.visible = false
    heart2.visible = true
    heart1.visible = false
  }
  if(life === 1){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = true
  }
  if(life === 0){
    heart3.visible = false
    heart2.visible = false
    heart1.visible = false
    gameState = 'lost'
  }
  if(score === 2000){
    gameState = 'won'
  }


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")&&player.y>80){
  player.y = player.y-30
  console.log(player.y)
}
if(keyDown("DOWN_ARROW")&&player.y<700){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet = createSprite(displayWidth-1150,player.y-30,20,10)
  bullet.addImage(shellImg)
  bullet.scale =0.1
  bullet.velocityX = 20

  
  bulletGroup.add(bullet)
  player.depth = bullet.depth
  player.depth = player.depth+2
  player.addImage(shooter_shooting)
  bullets = bullets-1  
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

//go to gameState "bullet" when player runs out of bullets
if(bullets==0){
  gameState = "bullet"
    
}

//destroy the zombie when bullet touches it
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){     
      
   if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        score = score+10
       
        } 
  
  }
}

//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life = life-1
       } 
 
 }
}

//calling the function to spawn zombies
enemy();
}

drawSprites();
textSize(20)
  fill("black")
text("Bullets = " + bullets,displayWidth-235,displayHeight/2-350)
text("Score = " + score,displayWidth-235,displayHeight/2-330)

//destroy zombie and player and display a message in gameState "lost"
if(gameState == "lost"){
  
  textSize(100)
  fill("red")
  text("You Lost ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie and player and display a message in gameState "won"
else if(gameState == "won"){
 
  textSize(100)
  fill("yellow")
  text("You Won ",400,400)
  zombieGroup.destroyEach();
  player.destroy();

}

//destroy zombie, player and bullets and display a message in gameState "bullet"
else if(gameState == "bullet"){
 
  textSize(50)
  fill("yellow")
  text("You ran out of bullets!!!",470,410)
  zombieGroup.destroyEach();
  player.destroy();
  bulletGroup.destroyEach();

}

}


//creating function to spawn zombies
function enemy(){
  if(frameCount%50===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(500,1100),random(100,500),40,40)

    zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.setCollider("rectangle",0,0,600,500)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
