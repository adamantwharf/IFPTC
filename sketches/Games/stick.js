var Stick = function ()
{
	var stick = [];  
	var top = [];  
	var donut;
	var donuts =  [new Group(), new Group(), new Group()];
	var colors = ["YELLOW","ORANGE","RED","PINK","PURPLE","BLUE"]
	var selected = -1;
	var sizeSelected = 0;
	var comesFrom = -1;
	var GameOver = true;
	var colp = loadImage("images/win.png");
	var imClick = loadImage("images/click.png");
	var NUMBER_OF_DONUTS = 0;	
	var song, sWin, sTake;
	this.setup= function ()
	{	
		//console.log (INF);
		
		background(200,50,100);
		song = loadSound('Sounds/Stick/theme.mp3');
		song.setVolume(0.2);
		sWin = loadSound('Sounds/Stick/win.wav');
		sTake = loadSound('Sounds/Stick/take.wav');
		win = createSprite ( width/2,height/2,10,10);
		win.addImage(imClick);
		drawSprite(win);

	};
	finish = function()
	{
		updateSprites(false);
		for ( var i = 0 ; i < 3 ; i ++  )
		{
			donuts[i].removeSprites();
		}
  		//Count=0;
  		
	}

	mousePressed = function() {
		console.log("click");
		if(GameOver)
		{
			GameOver = false;
				win.remove();		
			if(NUMBER_OF_DONUTS < 6)
				NUMBER_OF_DONUTS ++;
			initGame(NUMBER_OF_DONUTS);
		}

  		
	}

var win ;
	draw = function ()
	{
		background(200,50,100);
		if (!song.isPlaying() && !GameOver )
			song.play();
		if(donuts[2].length == NUMBER_OF_DONUTS  && NUMBER_OF_DONUTS > 0)
       	{
       		
       		if ( GameOver == false)
       			finish();
       		GameOver = true;
       		if (song.isPlaying())
       			song.stop()
       		sWin.play();
       		win = createSprite ( width/2,height/2,10,10);
			win.addImage(colp);
			drawSprite(win);
			
       		
		}
		//console.log(selected);
		for ( var i = 0 ; i < 3 ; i ++ )
			takeOne(i);		
		if (selected != -1 )
		{
			donuts[comesFrom][selected].position.y = 300;
			for ( var i = 0 ; i < 3 ; i ++ )
				grabOne(i)
		}
		
		drawSprites();
	}

	initGame = function (n)
	{
		

		updateSprites(true);
		if (song.isPlaying())
			song.stop();
		song.play();
		selected = -1;
		sizeSelected = 0;
	 	comesFrom = -1;
		GameOver= false;
		donuts =  [new Group(), new Group(), new Group()];
		for ( var i = top.length ; i < 3 ; i ++  )
		{
			stick.push( createSprite(width*(i+1)/4, 500 , 20, 300));
			top.push(createSprite(width*(i+1)/4, 340 , 20, 20));
			top[i].shapeColor = "BLACK";
			stick[i].shapeColor = "WHITE";
			stick[i].mouseActive = true;
			top[i].mouseActive = true;
		}
		for(var i =0 ; i< n ; i ++)
		{

			donut = createSprite(width /4 ,600-(i*40+20), 150 - ( i * 20 ),40);
			donut.shapeColor = colors[i];
			donuts[0].add(donut);
			donuts[0][i].mouseActive= true;
		}

		drawSprites();

	};
	grabOne = function (n)
	{
		if (top[n].mouseIsPressed)
			{

		//		console.log("yeah" + donuts1[donuts1.length-1].width ) ;
				if (donuts[n].length == 0 || donuts[n][donuts[n].length-1].width > sizeSelected )
				{
					donuts[n].add (createSprite(width * (n+1) /4 ,600-(donuts[n].length*40+20), sizeSelected,40));
					donuts[n][donuts[n].length-1].shapeColor = donuts[comesFrom][selected].shapeColor;
					donuts[n][donuts[n].length-1].mouseActive = true;
					donuts[comesFrom][selected].remove();
					selected = -1;
				}
				else if ( donuts[n][donuts[n].length-1].width == sizeSelected)
				{
					donuts[n][donuts[n].length-1].position.y =600-((donuts[n].length-1)*40+20)
					selected = -1;
				}
				sTake.play();
			}
	}


	takeOne = function(n)
	{

		if ( donuts[n].length > 0)
		{
			console.log(selected);
			if ( donuts[n][donuts[n].length-1].mouseIsPressed && selected == -1) 
			{	
				sTake.play();
				selected = donuts[n].length-1;
				sizeSelected = donuts[n][selected].width;
			//donuts1[donuts1.length-1].remove();
				comesFrom = n;			
			}
		}
	}

}

Stick.prototype = new sketch;

