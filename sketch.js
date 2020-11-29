//Create variables here
var food, foodStock; 
var dog;
var dogImg, dogHappyImg ;
var database ;
var lastFed, fedTime;
var feedButton, addFoodButton;
var foodObj;
var getFoodStock


function preload()
{
  dogHappyImg = loadImage("images/dogImg1.png");
  dogImg = loadImage("images/dogImg.png");
	//load images here
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(450,250,50,50);
  dog.scale =0.135;
  
  dog.addImage(dogImg);
  foodStock = database.ref('Food');
  foodStock.on("value", getFoodStock);

  //foodObj = Food(150,150,50,50);

  feedButton = createButton("Feed Drago");
  feedButton.position(670,95);
  feedButton.mousePressed(feedDog);

  addFoodButton=createButton("Add Food");
  addFoodButton.position(770,95);
  addFoodButton.mousePressed(addFoods);

}


function draw() {  
  background(49,139,87);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });


  drawSprites();
  textSize(18);
  fill("red");
  text("Note: Press Up Arrow to feed Drago milk",120,480);
  textSize(16);
  fill("white");
  text("Food Remaining : " + food,120,100)
  //add styles here

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed :" + lastFed%12 + "PM", 250,30);
  } else if (lastFed==0){
    text("Last Feed :  12 AM", 350,30);
  } else{
    text("Last Feed :" + lastFed + " AM", 350,30);
  }

}

function feedDog(){
  dog.addImage(dogHappyImg);

  foodObj.update(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()

  })
}

function addFoods(){
  food++;
  database.ref('/').update({
    Food: food
  })
}

function getFoodStock(data){
  food=data.val();
}