var dogS, dog, happyDog, database, foodS, foodStock;

function preload(){
  dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happy dog.png");
}

function setup() {
  createCanvas(500,500);
  dogS = createSprite(250,350,10,10);
  dogS.scale = 0.3;
  dogS.addImage(dog);
  database=firebase.database();
  foodStock=database.ref("food");
  foodStock.on("value",readStock);
}


function draw() {  
 background(46, 139, 87);
 textSize(20);
 text("Press Up Arrow To Feed The Dog",150,50);
 text("Foodstock:" + foodS, 150,70);
drawSprites();
  

}

function keyPressed(){
  if(keyDown(UP_ARROW)){
  writeStock(foodS);
  dogS.addImage(happyDog);
  }
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
   x=x-1;
  }

  database.ref('/').update({
    food:x
  })
}