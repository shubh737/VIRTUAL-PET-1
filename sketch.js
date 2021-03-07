var dog1,dog2,dog,database,foodStock;

function preload () {
    
    dog1 = loadImage("images/dogImg.png");
    dog2 = loadImage("images/dogImg1.png");

}

function setup () {
    
    createCanvas(500,500);
    
    dog = createSprite(250,250,10,10);
    dog.addImage(dog1);
    dog.scale = 0.2;
    
    database = firebase.database();
    
    foodStock = database.ref("Food");
    foodStock.on("value",readStock);
  
}


function draw () {  

    background(46,139,87);

    if(keyWentDown(UP_ARROW)){
        writeStock(foodStock);
        dog.addImage(dog2);
    }

    if(keyWentUp(UP_ARROW))
        dog.addImage(dog1);

    drawSprites();

    if(foodStock <= 1000000){

      textFont("Georgia");
      textSize(40);
      fill(0,0,random(0,255));
      stroke("black");
      strokeWeight(3);
      text("Food Remaining: " + foodStock,70,400);

      strokeWeight(1.5);
      textSize(25)
      fill(0,random(0,150),0);
      text("Press the up arrow to feed the dog!",60,450);
      
    }

}

function readStock (data) {
  foodStock = data.val();
}

function writeStock (x) {

  if(x <= 0){
    x = 0;
  } else {
    x = x-1;
  }

  database.ref("/").update({Food:x});

}
