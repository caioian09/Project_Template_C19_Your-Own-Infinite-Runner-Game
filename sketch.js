var PLAY = 1;
var END = 0;
var gameState = PLAY;

var pontuacao_dinheiro;
var pontuacao;
var trex,trex_running;
var bomb, bombimg,bombG;
var cash,cashImg,cashG;
var ground,ground2;
var trex_colidded,trex_coliddedImg;
var gameOver,gameOverImg;
var invisibleground;
var invisibleground2;

function setup() {
createCanvas(600,400);


trex_running = createSprite(150,300,80,20);
trex_running.scale =  0.5
trex_running.addAnimation("running", trex);
trex_running.addAnimation("collided", trex_coliddedImg);
trex_running.changeAnimation("running",trex);  


cashG=new Group();
bombG=new Group();



ground= createSprite(300,310,80,20);
ground.x = ground.width/2;
ground.addImage(ground2);

gameOver= createSprite(300,200,80,20);
gameOver.scale = 1.5
gameOver.visible = false;
gameOver.addImage(gameOverImg);



invisibleground2 = createSprite(200,329,400,10);
invisibleground2.visible = false;

pontuacao = 0;

pontuacao_dinheiro = 0;

}
function preload() {
  trex = loadAnimation("trex1.png","trex3.png","trex4.png");
trex_coliddedImg = loadImage("trex_collided.png");
bombimg = loadImage("bomb.png");
cashImg = loadImage("cash.png");
ground2 = loadImage("ground2.png");
gameOverImg = loadImage("gameOver.png");


// grupodeobstaculos = new Group();

}

function draw(){
background(180);
text("Pontuação: "+ pontuacao_dinheiro, 500,50);

if(gameState === PLAY){
  pontuacao = pontuacao + Math.round(frameCount/60);

if(trex_running.isTouching(cashG)){
 pontuacao_dinheiro = pontuacao_dinheiro+10
 cashG.destroyEach()



}  

cashG.setVelocityXEach(ground.velocityX)

bombG.setVelocityXEach(ground.velocityX)

  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  ground.velocityX = -( 2+ 3* pontuacao/1000)
  pontuacao = pontuacao + Math.round(frameCount/60);

  if(keyDown("space")&& trex_running.y >= 225) {
    trex_running.velocityY = -11;
  }

  createBomb();
  createCash();

//  gravidade
  trex_running.velocityY = trex_running.velocityY + 0.8

// trex perde

   if(bombG.isTouching(trex_running)){
     gameState = END;   
 }


}

 else if(gameState === END){

  gameOver.visible = true;

  cashG.setLifetimeEach(-1);
  bombG.setLifetimeEach(-1);

  cashG.setVelocityXEach(0);
  bombG.setVelocityXEach(0);

  trex_running.changeAnimation("collided");
  ground.velocityX = 0;
  trex_running.velocityY = 0;
 }



// trex_running.collide(invisibleground);
trex_running.collide(invisibleground2)




drawSprites();



}


function createBomb() {
  if (frameCount % 100 == 0) {
  var bomb = createSprite(600,300,10,40);
  bomb.addImage(bombimg);
  bomb.scale=0.07;
  bomb.lifetime = 190;
  bombG.add(bomb);
} 
   
  }
// 
// 
function createCash() {
  if (frameCount % 150 == 0) {
  var cash = createSprite(500,300,10,10);
  cash.addImage(cashImg);
  cash.scale=0.07;
  cash.lifetime = 150;
  cashG.add(cash);
}   
  }



// 
// 
// 
// 