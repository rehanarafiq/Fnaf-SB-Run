var bg, bgImg;
var chica, chicaImg, chicaGroup;
var monty, montyImg, montyGroup;
var coins, coinsImg, coinsGroup;
var player, playerImg;
var ground;
var score = 0;
var life = 3;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bgMusic;
var scream;


function preload() {
    bgImg = loadImage("../assets/bg3.jpg");
    chicaImg = loadImage("../assets/Chica.png");
    montyImg = loadImage("../assets/Monty.png");
    coinsImg = loadImage("../assets/coin.png");
    playerImg = loadAnimation("../assets/f1.gif","../assets/f2.gif","../assets/f3.gif","../assets/f4.gif","../assets/f5.gif","../assets/f6.gif","../assets/f7.gif","../assets/f8.gif","../assets/f9.gif","../assets/f10.gif","../assets/f11.gif");

    scream = loadSound("../assets/scream.mp3");
    bgMusic = loadSound("../assets/bgMusic2.mp3");
    obstacleGroup = new Group();
    coinsGroup = new Group();

}

function setup() {
   createCanvas(windowWidth,windowHeight);

   bg = createSprite(width / 2,height /2);
   bg.addImage("bg", bgImg);
   bg.scale = 2.5;
   bg.velocityX = -(6 + 3*score/ 100);

   player = createSprite(250,height -140, 100,100);
   player.addAnimation("running", playerImg);
   player.scale = 0.3;

   player.frameDelay = 0.5;

   ground = createSprite(width / 2, height -18, width, 10);
   ground.visible = false;
   

}

function draw() {
    background("black");
    drawSprites();
    textSize(35);
    fill("white");
    text("Fazcoins:"+score, width -250, 125);
    text("Lives:"+life, width-250, 175);

    if(gameState === PLAY){

        //bgMusic.play();
        //bgMusic.setVolume(0.5);
        //bgMusic.loop();

        if(bg.x < width / 2){
            bg.x = width /2 + 150;
        }

        if(keyDown("space")&& player.y >= (height /2 + 100)){
            player.velocityY = player.velocityY -6;
        }
        player.velocityY = player.velocityY + 0.5;
    
        player.collide(ground);

        if(coinsGroup.isTouching(player)){
            coinsGroup.destroyEach();
            score = score +5;
        }

        if(obstacleGroup.isTouching(player)){
          //  scream.play();
            //scream.setVolume(0.5);
            obstacleGroup.destroyEach();
            life = life -1;
        }

        if(life == 0){
            gameState = END;
        }

        spawnCoins();

        var x = Math.round(random(1,2));
        if(x == 1){
            spawnChicas();
        }
    
        else if(x == 2){
            spawnMontys();
        }

    }

    else if(gameState === END){
        stroke("Red");
        fill("White");

        textSize(60);
        text("Game Over",width/2 -120, height/2);
        text("Press 'r' to reset", width/2 -160, height/2 + 100);
        bg.velocityX = 0;
        player.velocityY = 0;
        obstacleGroup.setVelocityXEach(0);
        coinsGroup.setVelocityEach(0);
        player.visible = false;

        obstacleGroup.setLifetimeEach(-1);
        coinsGroup.setLifetimeEach(-1);

        if(keyDown("r")){
            reset();
        }
    }
}

function spawnChicas(){
    if(frameCount % 120 === 0){
        chica = createSprite(width - 10, height - 100);
        chica.addImage("chicken", chicaImg);
        chica.scale = 0.4;

        chica.velocityX = -(6 + 3*score/ 100);

        chica.lifetime = 300;

        chica.depth = player.depth;
        player.depth = player.depth +1;
        
        obstacleGroup.add(chica);
     
    } 
}

function spawnMontys(){
    if(frameCount % 120 === 0){
        monty = createSprite(width - 10, height - 100);
        monty.addImage("gator", montyImg);
        monty.scale = 0.4;

        monty.velocityX = -(6 + 3*score/ 100);

        monty.lifetime = 300;

        monty.depth = player.depth;
        player.depth = player.depth +1;
        
        obstacleGroup.add(monty);
     
    }
}

function spawnCoins(){
    if(frameCount % 80 === 0){
        coins = createSprite(width - 10, height / 2);
        coins.addImage("points", coinsImg);
        coins.scale = 0.15;

        coins.y = Math.round(random(height /2 - 100, height /2 + 100));

        coins.velocityX = -(6 + 3*score/ 100);

        coins.lifetime = 300;

        coins.depth = player.depth;
        player.depth = player.depth +1;
        
        coinsGroup.add(coins);
     
    }
}

function reset(){
    coinsGroup.destroyEach();
    obstacleGroup.destroyEach();
    gameState = PLAY;
    player.visible = true;
    player.x = 250;
    player.y = height -140;
    //player.velocityY = -3;
    bg.velocityX = -3;
    score = 0;
    life = 3;
}




