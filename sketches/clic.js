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
}
var time = 248;
var colorsLight = ['red','green'];
var state = 0;
var flag = false;
var walk = false;
var col = 0;
var first = false;
var colors=["#FFCEC4","#E28EFA"];
var t = 0;
function draw() {
  background(colors[col])
  if (t > 10)
    if(mouseIsPressed)
      col= (col+1)%2,t=0;
  t++;
  textAlign(CENTER);
  textSize(30);
  fill(0,0,0);
  text("Veamos que pasa si haces clic aqui",width/2,height/2);
}
var flagDie = false;

Keydown = function()
{
		if(keyIsDown(68))
		{
      col = col+1;
      col = col%2;
      t=0;
    }

		return false;

}
