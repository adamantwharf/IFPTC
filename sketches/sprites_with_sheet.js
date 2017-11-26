//Creating sprite using sprite sheets for animation
var mouse_moved = false;
var touch_started = false;
var explode_sprite_sheet;
var player_sprite_sheet;
var tile_sprite_sheet;
var explode_sprite;
var player_walk;
var player_stand;
var player_sprite;
var tile_frames;
var explode_animation;
var tLight;

// Normally you would put this in a .json file, but I'm putting it here
// for example purposes
var player_frames = [
  {"name":"player_walk01", "frame":{"x":0, "y": 0, "width": 70, "height": 94}},
  {"name":"player_walk02", "frame":{"x":71, "y": 0, "width": 70, "height": 94}},
  {"name":"player_walk03", "frame":{"x":142, "y": 0, "width": 70, "height": 94}},
  {"name":"player_walk04", "frame":{"x":0, "y": 95, "width": 70, "height": 94}},
  {"name":"player_walk05", "frame":{"x":71, "y": 95, "width": 70, "height": 94}},
  {"name":"player_walk06", "frame":{"x":142, "y": 95, "width": 70, "height": 94}},
  {"name":"player_walk07", "frame":{"x":213, "y": 0, "width": 70, "height": 94}},
  {"name":"player_walk08", "frame":{"x":284, "y": 0, "width": 70, "height": 94}},
  {"name":"player_walk09", "frame":{"x":213, "y": 95, "width": 70, "height": 94}},
  {"name":"player_walk10", "frame":{"x":355, "y": 0, "width": 70, "height": 94}},
  {"name":"player_walk11", "frame":{"x":284, "y": 95, "width": 70, "height": 94}}
];
var crash;
var winS;
function preload() {
  //
  //  There are two different ways to load a SpriteSheet
  //     1. Given width, height that will be used for every frame and the
  //        number of frames to cycle through. The sprite sheet must have a
  //        uniform grid with consistent rows and columns.
  //     2. Given an array of frame objects that define the position and
  //        dimensions of each frame.  This is Flexible because you can use
  //        sprite sheets that don't have uniform rows and columns.
  //
  //    Below demonstrates both methods:

  song = loadSound('Sounds/FunLoop.mp3');
  winS = loadSound('Sounds/TaDa.mp3');
  crash = loadSound('Sounds/crash.wav');
  // Load the json for the tiles sprite sheet
  tile_frames = loadJSON('assets/tiles.json');

  // Load the explode sprite sheet using frame width, height and number of frames
  explode_sprite_sheet = loadSpriteSheet('assets/explode_sprite_sheet.png', 171, 158, 11);

  // Load player sprite sheet from frames array
  player_sprite_sheet = loadSpriteSheet('assets/player_spritesheet.png', player_frames);

  // Load tiles sprite sheet from frames array
  tile_sprite_sheet = loadSpriteSheet('assets/tiles_spritesheet.png', tile_frames);

  // Exploding star animation
  explode_animation = loadAnimation(explode_sprite_sheet);

  // Player walk animation passing in a SpriteSheet
  player_walk = loadAnimation(player_sprite_sheet);

  // An animation with a single frame for standing
  player_stand = loadAnimation(new SpriteSheet('assets/player_spritesheet.png',
    [{"name":"player_stand", "frame":{"x":284, "y": 95, "width": 70, "height": 94}}]));
}
var finish = false;
var song;
var initGame = false;
function setup() {
  createCanvas(800, 400);
  song.setVolume(0.4);

  // Create the exploding star sprite and add it's animation
  explode_sprite = createSprite(width / 2, 100, 171, 158);
  explode_sprite.addAnimation('explode', explode_animation);



  // Create the Player sprite and add it's animations
  player_sprite = createSprite(60, 284);
  player_sprite.addAnimation('stand', player_stand);
  player_sprite.addAnimation('walk', player_walk);
  player_sprite.setCollider('rectangle',0,0,60,70);

  tLight = createSprite(735,155,70,70);
  tLight.addImage('red',loadImage("assets/red.png"));
  tLight.addImage('green',loadImage("assets/green.png"));
}
var time = 248;
var colorsLight = ['red','green'];
var state = 0;
var flag = false;
var walk = false;
var col = 0;
var first = false

function draw() {
  clear();
  if(initGame)
  {
    if (!finish)
    {

      background('#81F7D8');
      Keydown();
      if(walk)
  		{
        player_sprite.changeAnimation('walk');
        // flip horizontally
        player_sprite.mirrorX(1);
        // move right
        player_sprite.velocity.x = 6;
        time = 0;
      }
      if ( player_sprite.position.x >= 740)
        win();
      time ++ ;
      if(time == 250)
      {
        state = (state+1)%2;
        tLight.changeImage(colorsLight[state]);
        time = 0;
        if (!first)
        {
          first = true;
          time = 190;
        }

      }
      if (state == 1)
      {
          car.remove();
          car1.remove();
          flag = false;
      }
      else {
          if(!flag)
          {
            car = createSprite(180,300,70,70);
            car.addImage('redCar',loadImage("assets/car2.png"));
            car.addImage('purpleCar',loadImage("assets/car2.png"));
            car.changeImage('purpleCar');
            car.setCollider('rectangle',0,0,80,70);
            car1 = createSprite(670,300,70,70);
            car1.addImage('redCar',loadImage("assets/car1.png"));
            car1.addImage('purpleCar',loadImage("assets/car1.png"));
            car1.changeImage('redCar');
            car1.setCollider('rectangle',0,0,80,70);
            car1.mirrorX(1);
            flag = true;
          }
          player_sprite.collide(car,die);
          player_sprite.collide(car1,die);
          if ( car.position.x > 660 )
          {
              car.mirrorX(1);
              car.changeImage('redCar');
              car.velocity.x = -10;
              car1.mirrorX(-1);
              car1.changeImage('purpleCar');
              car1.velocity.x = 10;
          }
          if (car.position.x <210)
          {
            car.mirrorX(-1);
            car.velocity.x = 10;
            car.changeImage('purpleCar');
            car1.mirrorX(1);
            car1.changeImage('redCar');
            car1.velocity.x = -10;
          }
      }
      // Draw the ground tiles
      for (var x = 0; x < 840; x += 70) {
        if (x >= 140 && x < 700)
          tile_sprite_sheet.drawFrame('castleMid.png', x, 330);
        else
          tile_sprite_sheet.drawFrame('grassMid.png', x, 330);
      }

      // Draw the sign tiles

      tile_sprite_sheet.drawFrame('ropeVertical.png', 700, 260);
      tile_sprite_sheet.drawFrame('ropeAttached.png', 700, 190);
      tile_sprite_sheet.drawFrame('signRight.png', 0, 260);

      //draw the sprite
        //if debug is set to true bounding boxes, centers and depths are visualized
      player_sprite.debug = mouseIsPressed;
      car.debug = mouseIsPressed;
      explode_sprite.debug =  mouseIsPressed;
    }
    else {


      if(!flagDie)
        background('#81F7D8');
      else {
        var back = ['#ff0000','#ff0000','#ff0000','#DF0101','#DF0101','#DF0101','#610B0B','#610B0B','#610B0B'];
        background(back[col]);
        col ++;
        col %= 9;
      }

    }
  }
  else {
    background('#81F7D8');
    textAlign(CENTER);
  	textSize(50);
  	fill(0,0,0);
  	text("Click Para empezar",width/2,height/2);
    if(mouseIsPressed)
    {
        initGame = true;
        song.loop();
    }
  }
  drawSprites();
}
var flagDie = false;
die = function()
{
//  console.log("asfdsaf");
  song.stop();
  crash.play();
  car.remove();
  car1.remove();
  player_sprite.remove()
  tLight.remove();
  explode_sprite.remove();
  finish  = true;
  flagDie = true;
  //tile_sprite_sheet.removeFrames()

}
win = function()
{
  var  win = createSprite ( width/2,height/2,10,10);
  win.addImage(loadImage("assets/win.png"));
  drawSprite(win);
  car.remove();
  car1.remove();
  tLight.remove();
  player_sprite.remove()
  finish  = true;
  winS.play();
  explode_sprite.remove();
  song.stop();
  //tile_sprite_sheet.removeFrames()

}
Keydown = function()
{
		if(keyIsDown(68))
		{
      walk = true;
    }

		return false;

}
