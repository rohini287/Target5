const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var scoreX=0
var scoreY=0;
var shot
var target1,target2,target3,target4
var missileSprite
var score=0;
var heart_image
var heartGroup
var counter=3
var hr,mn,sec
var gamestate=0
var state="OnBoard"
var popSound
var star 
var star_img
var str,str1,str2
function preload(){
  bg=loadImage("images/bg.jpeg");
  heart_image=loadImage("images/heart.png");
  popSound=loadSound("cute_water_bubble.mp3")
  star_img=loadImage("images/Star.png")
}



function setup() {
  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  dart=new Dart(600,300,80);
  missile=new Missile(1000,200,100,70);

  sling=new constraint({x:1000,y:200},missile.body);
   str="Welcome to the game of target!"
   str2="Bored? Then this game will help you get out of boredom."
   str3="The rules of the game is simple, just drag the missile"

  heart1=createSprite(20,50,60,40)
  heart2=createSprite(60,50,60,40)
  heart3=createSprite(100,50,60,40);
  heart1.addImage(heart_image)
  heart2.addImage(heart_image)
  heart3.addImage(heart_image)
  heart1.scale=0.1
  heart2.scale=0.1
  heart3.scale=0.1

  heartGroup=createGroup()
  sec=60
  button=createButton("Start")
  button.position(40,270);
  button.size(90,40)
  button.style('background-color','yellow')
   
  rule1=createElement();
  rule1.position(40,350)
  rule1.html(str)
  rule1.style('background-color','red')

  rule2=createElement();
  rule2.position(40,370)
  rule2.html(str2)
  rule2.style('background-color','red')

  rule3=createElement();
  rule3.position(40,390)
  rule3.html(str3)
  rule3.style('background-color','red')

 

}

function draw() {
 
  background(bg);
  //hr=hour();
  //mn=minute();
 

  textSize(20);
  fill("white") 
  stroke("yellow") 
  text(sec,40,100)
  if (counter===2){
    heart3.destroy();
  }
  if (counter===1){
    heart2.destroy()
  }
  if (counter===0){
    heart1.destroy();
  }
  button.mousePressed(()=>{
    if (gamestate===2){
      location.reload();
      
    }
    gamestate=1;
     
  })
  if (frameCount %15===0){
    if (gamestate===1){
      sec--
      spawnHeart();
      if (sec===0){
        
          counter--
          sec=60;
        if (counter===0){
          gamestate=2
        }
      }
    }
  if (gamestate===2){
    textSize(25);
    fill("orange")
    text("GAME OVER!",600,20);
    sec=0;
    heartGroup.destroyEach();
  }
  }
 

 
  Engine.update(engine);
  dart.display();
  fill("White");
  textSize(25);
  text ("score:"+score,1000,100);
  missile.display();
  if (shot){
    shot.display();
  }

  
  drawSprites();


 
 
}

function mouseDragged(){
  if (gamestate===1){
    Matter.Body.setPosition(missile.body,{x:mouseX,y:mouseY})
    state="Dragged";

  }
  
 
}

function mouseReleased(){
  if (gamestate===1 && state==="Dragged"){
    
    sling.fly()
    shot=new Shot(missile.body,{x:random(420,770),y:random(100,500)});
   
    Matter.Body.setPosition(missile.body,{x:scoreX,y:scoreY});
   
    var posX=shot.pointB.x
    var posY=shot.pointB.y
    var hitPoint=createSprite(posX,posY,20,20);

    if (posX>590 && posX<610 && posY>285 && posY<315){
      score=score+ 100
    }
    else  if (posX>540 && posX<660 && posY>220 && posY<370){
      score=score+50
    }
    else  if (posX>490&& posX<700 && posY>180 && posY<410){
      score=score+25
    }
    
   else  if (posX>420&& posX<770 && posY>100 && posY<500){
      score=score+5
    }
    for (var i=0;i<heartGroup.length;i++){
      if (heartGroup.get(i).isTouching(hitPoint)){
         popSound.play();
         star=createSprite(hitPoint.x,hitPoint.y,10,10);
         star.addImage(star_img);
         star.velocityY=-3;
         star.lifetime=50
         hitPoint.lifetime=50;
       
      }
      hitPoint.destroy();
    }
   
  }
   
};


function keyPressed(){
  if (keyCode===32){
    if (gamestate===1){
      sling.bodyB=null
      Matter.Body.setPosition(missile.body,{x:1000,y:200})
   
      shot.fly()
      sling.attach(missile.body);
    }
  
  }
}



function spawnHeart(){
  if (frameCount %60===0){
    heart=createSprite(random(400,750),random(150,450),20,20);
    heart.addImage(heart_image);
    heart.lifetime=60
    heart.scale=0.1
    heartGroup.add(heart)
  }
  
}
