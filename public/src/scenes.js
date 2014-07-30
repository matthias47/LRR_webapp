
var map = [];
map = new Array();
var levelname;
var playertime = "zero";
var newHTML;
var map_bg = [];
var map_transparent_bg = [];
var map_comp = new Array();
var treasures = 0;
var currentLevel = [];
var dblevel_save;
var dbbg_save;
var dbbgtp_save;


function assginCurrentLevel(mapArray, backgroundArray, backgroundTransparentArray) {
    for (i = 0; i < 24; i++)
    {
        currentLevel[i] = mapArray[i];
        map_bg[i] = backgroundArray[i];
        map_transparent_bg[i] = backgroundTransparentArray[i];
    }
    console.log("in assgin current");
}


function levelLoaded (dblevel) {

dblevel_save = dblevel.dblevel.leveldata.levelmap;
dbbg_save = dblevel.dblevel.leveldata.levelbg;
dbbgtp_save = dblevel.dblevel.leveldata.level_tr_bg;


  /*map = dblevel.dblevel.leveldata.levelmap; 
  map_bg = dblevel.dblevel.leveldata.levelbg; 
  map_transparent_bg = dblevel.dblevel.leveldata.level_tr_bg; */


  if(dblevel.rating != null || document.cookie == ""){
    $('button').hide();
  }

    levelname = dblevel.dblevel.levelname;
    rating = dblevel.dblevel.rating;
    createdBy = dblevel.dblevel.createdBy;
    //document.getElementById("levelrating").innerHTML="Likes: " + rating;
    document.getElementById("leveldescription").innerHTML="Level: " + levelname + " created by: " + createdBy + " Likes: " + rating;
   // document.getElementById("createdBy").innerHTML="created by: " + createdBy;
    $.post("/getHighscore", {levelname: levelname}, printScore);

 /*   Crafty.e('2D, DOM, Text')
    .text("Press Key To Start!")
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css({ "text-align": "center"})
    .textFont({ size: '15px', weight: 'bold' })
    .textColor("#FFFFFF");
    
    this.start_game = function() {Crafty.scene('Game');}; //verbessurung
    this.bind('KeyDown', this.start_game); */
}


/*$(document).keypress(function(e){  //restart level 
  if(e.which == 13){    //enter taste
    Crafty.scene('Loading');
  }
    if(e.which == 34){
    Crafty.scene('Gameover');
  }
})  */

    function playThisLevel(i){

       // alert(play_level.dblevels[i].levelname);

       level_select = true; 

        dblevel_save = play_level.dblevels[i].leveldata.levelmap; 
        dbbg_save = play_level.dblevels[i].leveldata.levelbg; 
        dbbgtp_save= play_level.dblevels[i].leveldata.level_tr_bg; 


        levelname = play_level.dblevels[i].levelname;
        rating = play_level.dblevels[i].rating;
        createdBy = play_level.dblevels[i].createdBy;
        document.getElementById("leveldescription").innerHTML="Level: " + levelname + " created by: " + createdBy + " Likes: " + rating;

        $.post("/getHighscore", {levelname: levelname}, printScore);

        Crafty.scene('Loading');
    }
//----------------------------------------------------------------
Crafty.scene('Game', function() {


     console.log(map);

assginCurrentLevel( dblevel_save, dbbg_save
     , dbbgtp_save
     
    );
map = currentLevel;



  treasures = 0;

  /*   Crafty.e('2D, DOM, Text') //Display Levelname
    .text(function(){
      return levelname + rating;
    })
    .attr({ x: 30, y: 30, w: Game.width() })
    .css({ "text-align": "left"})
    .textFont({ size: '15px', weight: 'bold' })
    .textColor("#FFFFFF");   */

    for (var y = 0; y < Game.map_grid.height; y++) {
        map_comp[y] = new Array();
        for (var x = 0; x < Game.map_grid.width; x++) {    
                
                /*if (map_bg[y][x] == 'N' && map[y][x] == '.'){
                    Crafty.e('Nothing_BG').at(x+1, y+1);
                    console.log("Nothing BG");
                }*/
                
                if (x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1) {                                          
                    map_comp[y][x] = Crafty.e('Frame').at(x, y);                    
                }     
                if (map[y][x] == 'W'){
                    map_comp[y][x] = Crafty.e('Stone').at(x+1, y+1);
                    //console.log("Entity: " + map_comp[y][x].toString());
                }
                if (map[y][x] == 'S') {
                  map_comp[y][x] = Crafty.e('Stone').at(x + 1, y + 1);
                  map_comp[y][x].setSolid();

                  var stringContainer = map[y];
                  //console.log(stringContainer);
                  stringContainer = setCharAt(stringContainer, x, 'W');
                  map[y] = stringContainer;
                  //console.log("Entity: " + map_comp[y][x].toString());
                }
                if (map[y][x] == 'C'){
                    map_comp[y][x] = Crafty.e('Concrete').at(x+1, y+1);         
                }       
                if (map[y][x] == 'H'){
                    map_comp[y][x] = Crafty.e('Ladder').at(x+1, y+1);
                }
                if (map[y][x] == '-'){
                    map_comp[y][x] = Crafty.e('Pole').at(x+1, y+1);
                }                                                     
                if (map[y][x] == 'T') {
                    map_comp[y][x] = Crafty.e('Treasure').at(x + 1, y + 1);
                    var stringContainer = map[y];
                    //console.log(stringContainer);
                    stringContainer = setCharAt(stringContainer, x, '.');
                    map[y] = stringContainer;
                    //container.add();  
                    treasures++;
                }
                if (map[y][x] == 'P') {
                    thePlayer = Crafty.e('PlayerCharacter').at(x + 1, y + 1);
                    var stringContainer = map[y];
                    //console.log(stringContainer);
                    stringContainer = setCharAt(stringContainer, x, '.');
                    map[y] = stringContainer;
                }     
                if (map[y][x] == 'E') {
                    Crafty.e('Enemy').at(x + 1, y + 1);
                    var stringContainer = map[y];
                    //console.log(stringContainer);
                    stringContainer = setCharAt(stringContainer, x, '.');
                    map[y] = stringContainer;
                }

                if (map_bg[y][x] == 'q'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(0,0);
                }
                
                if (map_bg[y][x] == 'w'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(1,0);
                }
                
                if (map_bg[y][x] == 'e'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(2,0);
                }
                
                if (map_transparent_bg[y][x] == 'r'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    Crafty.e('Torch_BG').at(x+1, y+1);
                    tmp_bg.sprite(3,0);
                }
                
                if (map_transparent_bg[y][x] == 't'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(4,0);
                }
                
                if (map_transparent_bg[y][x] == 'z'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(5,0);
                }
                
                if (map_bg[y][x] == 'u'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(6,0);
                }
                
                if (map_bg[y][x] == 'i'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(7,0);
                }
                
                if (map_bg[y][x] == 'o'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(8,0);
                }
                
                if (map_bg[y][x] == 'p'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(9,0);
                }
                
                if (map_bg[y][x] == 'a'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(0,1);
                }
                
                if (map_bg[y][x] == 's'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(1,1);
                }
                
                if (map_bg[y][x] == 'd'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(2,1);
                }
                
                if (map_transparent_bg[y][x] == 'f'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(3,1);
                }
                
                if (map_transparent_bg[y][x] == 'g'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(4,1);
                }
                
                if (map_transparent_bg[y][x] == 'h'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(5,1);
                }
        
                if (map_bg[y][x] == 'j'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(6,1);
                }
                
                if (map_bg[y][x] == 'k'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(7,1);
                }
                
                if (map_bg[y][x] == 'l'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(8,1);
                }
                
                if (map_bg[y][x] == '#'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(9,1);
                }
                
                if (map_bg[y][x] == 'y'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(0,2);
                }
                
                if (map_bg[y][x] == 'x'){
                   var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(1,2);
                }
                
                if (map_bg[y][x] == 'c'){
                   var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(2,2);
                }
                
                if (map_transparent_bg[y][x] == 'v'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(3,2);
                }
                if (map_transparent_bg[y][x] == 'b'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(4,2);
                }
                
                if (map_transparent_bg[y][x] == 'n'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(5,2);
                }
                
                if (map_bg[y][x] == 'm'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(6,2);
                }
                
                
                if (map_bg[y][x] == ','){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(7,2);
                }
                
                if (map_bg[y][x] == '.'){
                    var tmp_bg = Crafty.e('BG').at(x+1, y+1);
                    tmp_bg.sprite(8,2);
                }
                
                if (map_transparent_bg[y][x] == '-'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(9,2);
                }
                if (map_transparent_bg[y][x] == 'Q'){
                    Crafty.e('Waterfall1_BG').at(x+1, y+1);
                }
                          
                if (map_bg[y][x] == 'W'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(4,3);
                }
                
                if (map_transparent_bg[y][x] == 'E'){
                    
                    Crafty.e('Torch_BG').at(x+1, y+1);
                }
                
                if (map_transparent_bg[y][x] == 'A'){
                    Crafty.e('Waterfall2_BG').at(x+1, y+1);
                }
                
                if (map_transparent_bg[y][x] == 'S'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(4,4);
                }
                
                if (map_transparent_bg[y][x] == 'D'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(6,4);
                }
                
                if (map_transparent_bg[y][x] == 'F'){
                   var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(7,4);
                }
                
                if (map_transparent_bg[y][x] == 'G'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(8,4);
                }
                
                if (map_transparent_bg[y][x] == 'Y'){
                    Crafty.e('Waterfall3_BG').at(x+1, y+1);
                }

                if (map_transparent_bg[y][x] == 'X'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(4,5);
                }
                
                if (map_transparent_bg[y][x] == 'C'){
                    var tmp_bg = Crafty.e('BG_Front').at(x+1, y+1);
                    tmp_bg.sprite(6,5);
                }  
        } 
    }

    map[22] = treasures.toString();               
   

var starttime = Date.now()  //start timing after everything is set up
  

this.end_postion = function() { 
   Crafty("2D").destroy();

   console.log("saveTime")
   var endtime = Date.now();

   playertime = (endtime-starttime)/1000;
   console.log(playertime);

   if(document.cookie != "" && playertime != "zero"){ //send time only when cookie is set and playertime is not zero
      $.post("/saveTime", { time: playertime, name: document.cookie, levelname: levelname});   //save that time from that player
    }

   Crafty.scene('NextLevel');         
};
this.bind('EndLevel', this.end_postion);

this.game_over =  function() { 
   
	   Crafty("2D").destroy();
    
	   Crafty.scene('Gameover');          
};
this.bind('EnemyCollison', this.game_over);
}, function() {
  this.unbind('EnemyCollison', this.game_over); //ausm tut
  this.unbind('EndLevel', this.end_postion);
});


//---------------------------------------------------------------------------------------------------
Crafty.scene('NextLevel', function() {


    /*    
          Crafty.e('2D, DOM, Text') //Display Levelname
          .text(function(){
            return playertime;
          })
          .attr({ x: 201, y: Game.height()/2 - 24, w: Game.width() })
          .css({ "text-align": "center"})
          .textFont({ size: '15px', weight: 'bold' })
          .textColor("008000");  */

    var bgImage = Crafty.e('2D, DOM, Text, Image')
                .image("assets/winscreen.png");
    bgImage.y = 10;
    bgImage.x =60;

    treasureCollected = 0; 


    start_newGame();


        Crafty.e("2D, DOM, Text")
          .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
          .text("You Won! Press key for the next level. Your time:")
          .css({ "text-align": "center"})
          .textFont({ size: '15px', weight: 'bold' })
          .textColor("#FFFFFF");
          console.log(playertime);


/*    $(document).keypress(function(e) {
        if (e.which == 32) {
            start_game();
        }
    });  */    
});

Crafty.scene('Gameover', function() {

  /*  Crafty.e("2D, DOM, Text")
          .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
          .text("Game Over! Press key to restart")
          .css({ "text-align": "center"})
          .textFont({ size: '15px', weight: 'bold' })
          .textColor("#FFFFFF"); */

 var bgImage = Crafty.e('2D, DOM, Text, Image')
            .image("assets/losescreen.png");
    bgImage.y = 10;
    bgImage.x =60; 

treasureCollected = 0;


          //  start_gameRestart();

});

//-----------------------------------------------------------------------------------------------------
Crafty.scene('Loading', function(){

  var pathname = window.location.pathname;  //url for specific level  
  

  if(level_select == false){ // if level got selected from levellist do not load another random level

    if(pathname == "/"){

      $.ajax({        //ajax request for leveldata
        dataType: "json",
        url: "/getLevel",
        data: "dblevel",
        success: levelLoaded,
        context: this
      });   
    }  
   
   if(pathname != "/"){  //pfusch

      $.ajax({        //ajax request for leveldata
        type: "POST",
        dataType: "json",
        url: "/getSpecificLevel",
        data:
              {
                levelID: pathname
              },
        success: levelLoaded,
        context: this
      });  
    } 
  }

/*    Crafty.e('2D, DOM, Text')
    .text("Press Key To Start!")
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .css({ "text-align": "center"})
    .textFont({ size: '15px', weight: 'bold' })
    .textColor("#FFFFFF"); */
    



  Crafty.load(['assets/Stein_oK_72ppi.png', 'assets/Ladder.png', 'assets/Schatz_24x19_72ppi.png', 'assets/Pole.png', 'assets/playersprite.png', 
      'assets/enemysprite.png',  'assets/bg.png', 'assets/steine.png' ], function(){

      Crafty.sprite(24, 'assets/playersprite.png', {
        spr_player: [0, 0],
      });
      Crafty.sprite(24, 'assets/enemysprite.png', {
        spr_enemy: [0, 0],
      });
      Crafty.sprite(24, 'assets/assets-yellow.png', {
        spr_treasure: [0, 0], spr_stone:[1,0], spr_ladder:[0,1], spr_pole:[1,1]
      });        
      Crafty.sprite (24, 'assets/steine.png', {
        spr_stone_normal:[0,0]
      });        
      Crafty.sprite(24, 'assets/bg.png', {
        spr_bg: [0,0],
        spr_eye: [6,0], spr_nothing: [7,0], spr_hoe: [8,0], spr_bowl:[9,0],
        spr_torch1: [0,6], spr_torch2: [1,6], spr_torch3: [2,6], spr_torch4: [3,6]
      });

    var bgImage = Crafty.e('2D, DOM, Text, Image')
            .image("assets/startscreen.png");
    bgImage.y = 10;
    bgImage.x =60; 

    });


    $(document).unbind("keypress.key32");

   
});

 $(document).keypress(function(e) {

        if (e.which == 78 || e.which == 110) {
            
            start_newGame();
        }
        if (e.which == 32) {
            start_gameRestart();
            e.preventDefault();
            window.addEventListener('keydown',dSpace,true);
        }
        void 0;

    });


function start_newGame() {

    Crafty.scene('Loading');
 

    console.log("aufrufLoading");

}
function start_gameRestart() {
   

        console.log("aufrufGamestart");

    Crafty.scene('Game');

}

function setCharAt(str, index, chr) {
    if (index > str.length - 1)
        return str;
    return str.substr(0, index) + chr + str.substr(index + 1);
}