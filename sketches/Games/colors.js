var Colors = function ()
{
	var fst_cube , color_Cube,n, cubes, drop;
	var count =0;
	var GameOver = true;
	var song = loadSound('Sounds/all.mp3');
	this.setup = function()
	{
		//createCanvas(600,600);
		colorMode(HSB, 360, 100, 100);
		//Create a group of sprites "cubes" with different colors 
		//that will be the target of the drop.
		cubes= new Group();
		fst_cube = width / 10; 
		for ( var i = 0 ; i < 5 ; i ++ )	
		{
			color_Cube = createSprite( fst_cube, 600, width/5 , 50); 
			color_Cube.shapeColor =  addColor(i); 
			fst_cube += width / 5;
			cubes.add(color_Cube);
		}	
	};
	
	addColor= function(n)
	{
	//this function gives a color according to the number in the parameter 
		var color; 
		switch(n) 
		{
        	case 0:
        		color = "yellow" ;
        		break;
        	case 1:
        		color = "green" ; 
        		break;
        	case 2: 
        		color = "blue";
        		break;
        	case 3:
        		color = "red" ;
        		break;
        	case 4:
        		color = "pink" ;
        		break;
    		default:
        	    color = 0;
		}
		return color;
	}
// 
var spriteEx ;
var sprScore ;
 	draw = function()
 	{
 		background(200,50,100);
 		drawSprites(cubes);	
 		if ( !GameOver ) // if is playing 
 		{
 			
 			drawSprites();
 			drop.velocity.y =(count > 8) ? (count/2 * 0.5)  : 2;
 		    drop.position.x = constrain(mouseX, 0, width);	
 		  	
 			
 			for ( var i = 0 ; i < 5 ; i ++ )	
				if ( drop.overlap(cubes[i]) ) // check the overlapping and send to the 
				//function that checks it 
					check(cubes[i],i,drop);
 		}
 	};
 	var arrScore = [];
 	score = function(s)
 	{

 		text (s, 200,200);
 		
 			console.log ( arrScore.length);
 			for ( var i = 0 ; i < arrScore.length; i ++)
 			{
 				arrScore[i].remove();
 			}
 			for ( var j = 0 ; j < s.length; j ++ )
 			{	
 				var imgN = loadImage("images/numbers/"+s[j]+".png");
 				if ( j == arrScore.length)
 				{
 					arrScore.push(createSprite ( 200+60*j,200,60,60));
 					arrScore[j].remove();
 				}
 				arrScore[j] = createSprite ( 50+60*j,50,60,60);
 				arrScore[j].addImage(imgN);
 			}
 		
 	}
 	NewGame = function () // starts a new game 
 	{
                
			var nColor = addColor( GetRandom() );
			var got = loadImage("images/"+nColor+".png");
 			drop = createSprite( width /2 , 0 , 20 , 20);
 			 
 			drop.shapeColor = nColor; 
            drop.addImage(got);
            drop.velocity.y = 30;
            score(count.toString());
 			

 	};
 	check = function (cube, n,drop)//evaluate if the drop overlap was with the correct cube 
 	// so, it define if continue the game, or finish it 
 	{
 		if ( drop.shapeColor == cube.shapeColor )
 		{
 			count++;
 			NewGame();
 		}	
 		else 
	    {
	   		for ( var i = 0 ; i < arrScore.length; i ++)
 			{
 				arrScore[i].remove();
 			}
	    	arrScore = [];
	    	count = 0;
 			GameOver = true;
 		}		
 	};
 	//The mouse pressed is used for stating a new game 
    mousePressed = function()
   {
  		if(GameOver)
  		{
  			if ( song.isPlaying())
  				song.stop();
  			song.play();
    		GameOver= false;
    	    NewGame();
    	}    
	}
	GetRandom = function () 
	{
    return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
    }
};
var myp5 = new p5(sketch, 'colors'); 
Colors.prototype = new sketch;