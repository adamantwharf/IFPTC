//  ¡¡ Experimental  Game !! 
//  ¡¡  Not finished!! 
// Instructions :  move the balloon with Arrow Keys 'UP, LEFT, RIGHT'  

var Bounce = function ()
{
	var GRAVITY = .2; 
	var bounce , floor; 
	var static = false;
	var obstacles , obstacle, obstacle2, star; 
	var colp = loadImage("images/win.png");
	var lose = loadImage("images/lose.jpg");
	var imClick = loadImage("images/click.png");
	var enem = loadAnimation ("images/Bounce/e1.png","images/Bounce/e2.png","images/Bounce/e3.png","images/Bounce/e4.png","images/Bounce/e5.png");
	var numEne = 1;
	var GameOver = false;
	var enemies;
	var win ;
	var song, sWin, sDie;
	this.setup = function()
	{
		song = loadSound('Sounds/all.mp3');
		song.setVolume(0.2);
		sWin = loadSound('Sounds/Stick/win.wav');
		sDie = loadSound('Sounds/Galaga/explosion.wav');
		win = createSprite ( width/2,height/2,10,10);
		win.addImage(imClick);
		drawSprite(win);
		

	//	initGame();
		GameOver = true;		
		//obstacles.add(obstacle);

	};
	initGame = function()
	{
		if ( GameOver )
		{
			win.remove();
			GameOver = false;
		}
		bounce = createSprite(width/2,height-30,30,30);
		bounce.draw = function(){ fill(180,100,100); ellipse(0,0,30,30) };
		bounce.maxSpeed = 10;

		obstacles = new Group();

		enemies = new Group();

		floor = createSprite(width/2,height,width,30);
		floor.shapeColor = 0;
		floor.immovable = true;
		obstacles.add(floor);
		obstacle = createSprite(width/2,height-90,40,40);
		//obstacles.add(obstacle);
		obstacle.mouseActive = true;
		obstacle2 = createSprite(width/4,height-90,40,40);
		obstacle2.mouseActive = true;
		star = createSprite(width/8,40,40,40);
		star.addImage(loadImage("images/star.png"));
		star.velocity.x = 1.5;
		
		for(var j=0; j<numEne; j++)
	  	{
	  				var a = createSprite( width/2,50 * ((j+1) *2 ) + 10, 50,50);
	  				enemies.add(a);
	  				
	  				if((j)%2 !=0)
	  					a.velocity.x = 2;
	  				else 
	  					a.velocity.x = -2;
	  				a.addAnimation("e",enem);
	  				a.animation.frameDelay = 5;
	 	 }
		
	}
	change = function (spr )
	{
		if ( spr.position.x > width || spr.position.x < 0)
				spr.velocity.x *= -1;
	}
	draw = function()
	{
		if ( !GameOver)
		{
			if ( !song.isPlaying())
				song.play();
			Keydown();
			static = false;
			//console.log(bounce.velocity.x);
			background(200,50,100);
			//bounce.bounce(floor);
			change (star);
			for ( var i = 0 ; i <enemies.length ; i ++)
				change (enemies.get(i));
			if(!static)
				bounce.velocity.y += GRAVITY;

			bounce.position.x = constrain(bounce.position.x, 0 + bounce.width/2, width- bounce.width/2);
			if ( obstacle.mouseIsPressed  && !bounce.collide(obstacle)) 
			{	
					console.log("asfsdfsd");
					obstacle.position.x=mouseX;
					obstacle.position.y=mouseY;
			}
			if ( obstacle2.mouseIsPressed  && !bounce.collide(obstacle2)) 
			{	
					console.log("asfsdfsd");
					obstacle2.position.x=mouseX;
					obstacle2.position.y=mouseY;
			}
			bounce.collide(enemies, die);
			bounce.collide(obstacles, function(){static = true; bounce.velocity.y=0; });
			bounce.collide(obstacle, function(){static = true; bounce.velocity.y=0; });
			bounce.collide(obstacle2, function(){static = true; bounce.velocity.y=0; });
			bounce.collide(star, finish);
			
		}
		drawSprites();
	};
	mousePressed = function() {
		console.log("click");
		if(GameOver)
		{

			win.remove();
			if ( song.isPlaying())
				song.stop();
			song.play();
			initGame();

		}
	}	
	finish = function()
	{
		sWin.play();
		if ( GameOver == false)
       	{
       		//updateSprites(false);
			enemies.removeSprites();
				obstacles.removeSprites();
			obstacle.remove();
			obstacle2.remove();
			star.remove();
			bounce.remove();
       	}
       	GameOver = true;
       	win = createSprite ( width/2,height/2,10,10);
		win.addImage(colp);
		drawSprite(win);
		numEne = ( numEne < 5 ? numEne + 1 : 5); 
	}
	die = function()
	{
		sDie.play();
		if ( GameOver == false)
       	{
       		//updateSprites(false);
	
			obstacles.removeSprites();
			enemies.removeSprites();
			obstacle.remove();
			obstacle2.remove();
			star.remove();
			bounce.remove();
       	}
       	GameOver = true;
       	win = createSprite ( width/2,height/2,10,10);
		win.addImage(lose);
		drawSprite(win);
	}
	Keydown = function()
	{
		if(keyIsDown(RIGHT_ARROW))
			bounce.velocity.x = 1;

		if(keyIsDown(LEFT_ARROW))
			bounce.velocity.x = -1;

		if(bounce.velocity.y == 0)
		if(keyIsDown(UP_ARROW) ){
			bounce.velocity.y = -6;
		}
		if(!keyIsDown(RIGHT_ARROW) && !keyIsDown(LEFT_ARROW))
		{
			bounce.velocity.x = 0 ;
		}

		return false;

	}


	newGame = function()
	{

	}

	


};
Bounce.prototype = new sketch;