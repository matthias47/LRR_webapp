   
var map;

Crafty.scene('Game', function() {
    
	container = Crafty.e('TreasureContainer');

   // map = dblevel;
   /* $.getJSON("/getLevel", 'dblevel')  
      
     // var map = !{JSON.stringify(dblevel.leveldata)}    
     // map = dblevel["leveldata"];
     // console.log(dblevel[0].leveldata);
    .always(function(dblevel){
      console.log(dblevel.leveldata);

    });  */

   /* $.getJSON("/getLevel", 'dblevel', success);

    function success(dblevel){      
      map = dblevel.leveldata;
      console.log(dblevel.leveldata);
    }  */
    $.ajax({
    dataType: "json",
    url: "/getLevel",
    data: "dblevel",
    success: function(response){

    map = response.dblevel.leveldata;  
      console.log(response.dblevel);
    }
    }); 



    container.initialize();
	
    for (var y = 0; y < Game.map_grid.height; y++) {

        for (var x = 0; x < Game.map_grid.width; x++) {    

                if (x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1) {																					
                    Crafty.e('Frame').at(x, y);										
                }			
                if (map[y][x] == 'W'){
                    Crafty.e('Stone').at(x+1, y+1);					
                }
                if (map[y][x] == 'C'){
                    Crafty.e('Concrete').at(x+1, y+1);					
                }				
                if (map[y][x] == 'H'){
                    Crafty.e('Ladder').at(x+1, y+1);
                }
                if (map[y][x] == '-'){
                    Crafty.e('Pole').at(x+1, y+1);
                }                                 		                
                if (map[y][x] == 'T'){
                    Crafty.e('Treasure').at(x+1, y+1);
					       container.add();					
                }
                if (map[y][x] == 'P'){
                thePlayer  =  Crafty.e('PlayerCharacter').at(x+1, y+1);  
                }				
                if (map[y][x] == 'E'){
                    Crafty.e('Enemy').at(x+1, y+1);
                }
        } 
    }        
   
    
    this.show_ladder = this.bind('TreasureCollected', function() {   
        container.collectTreasure();
        if(container.checkTreasures() == true){
            
            for (var y = 0; y < 10; y++) {
		
                for (var x = 0; x < Game.map_grid.width; x++) {    
																		           						
                    if (map[y][x] == 'h'){
                        Crafty.e('Ladder').at(x+1, y+1);
                    }
                    if (map[y][x] == 'X'){
                        Crafty.e('Exit').at(x+1, y+1);                           					
                    }
                    
                } 
            }                  
        }             
});
this.end_postion = this.bind('EndLevel', function() { 
	   Crafty("2D").destroy();
	console.log(levelcounter++);
	   Crafty.scene('NextLevel');         
});
this.game_over = this.bind('EnemyCollison', function() { 
   
	   Crafty("2D").destroy();
	   
	   Crafty.scene('Gameover');          
});
}, function() {
  this.unbind('TreasureCollected', this.show_ladder); //ausm tut
},function() {
  this.unbind('EnemyCollison', this.game_over); //ausm tut
}, function(){
   this.unbind('GameWon', this.end_postion);
});

Crafty.scene('NextLevel', function() {
    Crafty.e("2D, DOM, Text")
          .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
          .text("You Won! Press key for the next level")
          .css({ "text-align": "center"})
          .textFont({ size: '15px', weight: 'bold' })
          .textColor("#FFFFFF");

container.initialize();		  
this.restart_game = function() {Crafty.scene('Game');}; //verbessurung
this.bind('KeyDown', this.restart_game);
}, function() {
this.unbind('KeyDown', this.restart_game);
});

Crafty.scene('Gameover', function() {
	//console.log("hello");
    Crafty.e("2D, DOM, Text")
          .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
          .text("Game Over! Press key to restart")
          .css({ "text-align": "center"})
          .textFont({ size: '15px', weight: 'bold' })
          .textColor("#FFFFFF");
 
container.reset();
this.restart_game = function() {Crafty.scene('Game');}; //verbessurung
this.bind('KeyDown', this.restart_game);
}, function() {
this.unbind('KeyDown', this.restart_game);
});


Crafty.scene('Loading', function(){

  Crafty.load(['assets/Stein_oK_72ppi.png', 'assets/Ladder.png', 'assets/Schatz_24x19_72ppi.png', 'assets/Pole.png', 'assets/playersprite.png', 'assets/enemysprite.png' ], function(){

	    Crafty.sprite(24, 'assets/playersprite.png', {
        spr_player: [0, 0],
        });
		Crafty.sprite(24, 'assets/enemysprite.png', {
        spr_enemy: [0, 0],
        });

      Crafty.e('2D, DOM, Text')
    .text("Press Key To Start!")
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css({ "text-align": "center"})
    .textFont({ size: '15px', weight: 'bold' })
    .textColor("#FFFFFF");    
    })
    
    this.start_game = function() {Crafty.scene('Game');}; //verbessurung
    this.bind('KeyDown', this.start_game);
}, function() {
this.unbind('KeyDown', this.start_game);
});
