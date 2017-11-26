
var Cloud = function ()
{
	var GRAVITY = .09; 
	var panfu, GameOver; 
	var cloud , clouds , Count =0; 
	var floor; 
	var cloimg, colp, mont, trans;
	var v; 
	this.setup = function()
	{

		colp = loadImage("images/colpatria.png");
		mont = loadImage("images/mount.png");
		clouds = new Group();
		cloimg = loadImage("images/whitecloud.png",20,20); 
		trans = loadImage("images/transmilenio.png",30,109);
		GameOver = true;
		panfu = createSprite(width/2, height/2, 30, 30); 
		panfu.shapeColor =255;
		panfu.addImage(trans);

		floor = createSprite(width/2,height,width,30);
		floor.shapeColor = 35 ;
		floor.immovable= true;
	};

	draw = function()
	{
		//console.log(clouds.length);
		background(200,50,100);
		panfu.bounce(floor);
		if(!GameOver)
		{	
			
			panfu.velocity.y += GRAVITY ; 

			if(panfu.position.y > v +height/2)
				die();
			camera.off();
			image(mont,0,200,width,height);
			image(colp,width/2,90,100,520);
			camera.on();
			textSize(30);			
			text ( Count, width-40 , v)
			//console.log("panfu" + panfu.position.y + panfu.position.x);
			panfu.position.x = constrain(mouseX, 0, width- panfu.width/2);
			panfu.overlap(clouds,removecloud);

			for(var i=0;i<clouds.length; i++){
				//console.log( " nube " + i + " " +clouds[i].position.y + " " + clouds[i].position.y );
				if(clouds[i].position.y > panfu.position.y + height/2){
					clouds[i].remove();
					cloud = createSprite( random (0,width),panfu.position.y -height ,70,30)
					cloud.addImage(cloimg);
					clouds.add(cloud);
					cloud.immovable = true;
				}
			}

			drawSprites(clouds);
		}
		
		if (v > panfu.position.y)
			v = panfu.position.y;
		
		
		camera.position.y = constrain(panfu.position.y, v, v-height/2 );
                if(GameOver)
                    text("New Game",width/2,height/2);
		drawSprite(panfu);
		cloud = createSprite( random (0,width),panfu.position.y -height,70,30)
		drawSprite(floor);
	
	};

	die = function()
	{
		updateSprites(false);
		clouds.removeSprites();
  		GameOver = true;
  		//Count=0;
  		
	}
	mousePressed = function() {
  	if(GameOver)
    	newGame();
	}

	newGame = function()
	{
		Count=0;
		panfu.position.x= width/2;
		panfu.position.y=height/2;
		GameOver = false;
		v= height/2;
		updateSprites(true);
		panfu.velocity.y = 0;
		//Creates a group of 3-4 cloud for the game 
		for(var i =0 ; i<random(3,4) ; i ++){
		cloud = createSprite(random(0,width),random(0,height-30), 70,30)
		cloud.addImage(cloimg);
		clouds.add(cloud);
		cloud.immovable = true; 
		}

	}
	removecloud = function(pan,cloud)
	{
		cloud.remove();
		// this give the panfu a special velocity for the jump after the collision 
		panfu.velocity.y= -8;
		// and create a new one after removing the one of the collition
		cloud = createSprite( random (0,width),panfu.position.y -height,70,30)
			cloud.addImage(cloimg);
			clouds.add(cloud);
			cloud.immovable = true;
		//this is used for counting the score	
		Count++;

	}
	


};
Cloud.prototype = new sketch;