// 0 Galaga, 1 Cloud, 2 Stick, 3 Colors, 4 Bounce; 
//
//
var sketch = function()
{
	setup = function(){ //Overwrite
	
		createCanvas(600,600);
		colorMode(HSB, 360, 100, 100);
                game = new Bounce;
                game.setup();
	};

	draw = function(){ //Overwrite

	}; 


	mousePressed = function()
	{}

}

var myp5 = new p5(sketch, 'Bounce');