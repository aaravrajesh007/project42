const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;
var engine,world,man,t1,t2,t3,t4;
var drops=[];
var thunderCreatedFrame=0;
var rand;
var maxDrops=100;
var thunder;



function preload(){
    t1=loadImage("images/thunderbolt/1.png");
    t2=loadImage("images/thunderbolt/2.png");
    t3=loadImage("images/thunderbolt/3.png");
    t4=loadImage("images/thunderbolt/4.png");

    backgroundimg = loadImage("images/bg.jpg")

    wman = loadAnimation("images/WM/walking_8.png","images/WM/walking_7.png","images/WM/walking_6.png","images/WM/walking_5.png","images/WM/walking_4.png","images/WM/walking_3.png","images/WM/walking_2.png","images/WM/walking_1.png",)
}

function setup(){
   createCanvas(800,800)
    engine=Engine.create();
    world=engine.world;
    
    bd=createSprite(400,400);
    bd.addImage(backgroundimg);
    bd.velocityX=-3;
  

    man = createSprite(100,600);
    man.addAnimation("walk",wman);
    man.scale=0.5;
    
   umbrella = new Umbrella(200,500,60,100);
   if(frameCount % 150 === 0){

    for(var i=0; i<maxDrops; i++){
        drops.push(new Drops(random(0,800), random(0,800)));
    }

}

}

function draw(){
    background(255);
    bd.display();
    Engine.update(engine);

    
    if(bd.x<0)
  {
      bd.x=bd.width/2;
  }

    man.x=umbrella.body.position.x;
    
    //creating thunder
    rand = Math.round(random(1,4));
    if(frameCount%80===0){
        thunderCreatedFrame=frameCount;
        thunder = createSprite(random(100,700), random(60,80), 100, 100);
        switch(rand){
            case 1: thunder.addImage(t1);
            break;
            case 2: thunder.addImage(t2);
            break; 
            case 3: thunder.addImage(t3);
            break;
            case 4: thunder.addImage(t4);
            break;
            default: break;
        }
        thunder.scale = random(0.5,0.7)
        thunder.display();
    }

    if(thunderCreatedFrame + 10 ===frameCount && thunder){
        thunder.destroy();
    }

    for(var i = 0; i<maxDrops; i++){
        drops[i].showDrop();
        drops[i].update() 
       }
       man.display();
    }   

