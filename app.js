
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , hbs = require('hbs')
  , mongoose = require('mongoose')
  , uuid = require('node-uuid')
    random = require('mongoose-random');


var app = express();
var levelEngine = require('./defaultbackground'); //returns default background for created Levels

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', hbs.__express)
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());  
});

mongoose.connect('mongodb://localhost/LodeDb');

//-------------------------MONGOOSE-SCHEMATA---------------------------------------------

var PlayerSchema = new mongoose.Schema({

    name: String,
    cookieID: String,

}), Player = mongoose.model('Player', PlayerSchema);

var LevelSchema = new mongoose.Schema({

  levelname: String,
  createdBy: String,      //author of the leveleditor
  rating: Number,
  leveldata: {
    levelmap: [],
    levelbg: [],
    level_tr_bg: []
  },
  bestrun: {
      player: String, 
      time: Number,   
  }

});
var Level = mongoose.model('Level', LevelSchema); 


var PlayerTimeSchema = new mongoose.Schema({

  playerID: String,
  levelname: String,
  time: Number,

}), PlayerTime = mongoose.model('PlayerTime', PlayerTimeSchema); 

var RatingSchema = new mongoose.Schema({

  playerID: String,
  levelname: String,
  allowRate: Boolean,

}), Rating = mongoose.model('Rating', RatingSchema);

//---------------------------------------AJAX-GET----------------------------------

app.get('/getLevel', function(req, res){

   Level.find({/*levelname: "Third", rating: 2*//*Math.floor((Math.random() * 4) + 1)*/}, function(err, dblevels){ //bei datenbankabfrage ein zufallszahl, die der ÌD entspricht verwenden, um bei neuladen zufälliges level zuerhalten
        
        //dblevel = dblevels[Math.floor((Math.random() * 4) + 0)];  //workaround for random level
        dblevel = dblevels[0]; //shitfix


     if(dblevel.leveldata.levelbg == "undefined" || dblevel.leveldata.level_tr_bg == "undefined"){ //if it is a level created by the editor load the default background

          dblevel.leveldata.levelbg = levelEngine.getBackground();   
          dblevel.leveldata.level_tr_bg = levelEngine.getTransparent();


      Rating.findOne({playerID: req.headers.cookie, levelname: dblevel.levelname}, function(err, rating){   //if player has already rated, do not display rating button

        res.send({dblevel: dblevel, rating: rating})

      });
    }
    else{
      console.log("No need to load default background");
      Rating.findOne({playerID: req.headers.cookie, levelname: dblevel.levelname}, function(err, rating){   //if player has already rated, do not display rating button

        res.send({dblevel: dblevel, rating: rating})

      });
    }
  }); 
});

app.post('/getSpecificLevel', function(req, res){

    console.log(req.body.levelID);
    var level_ID = req.body.levelID;
    var level_ID_edit = level_ID.replace("/play", "");    //delete the slash, so levelID matches the levelID in the database

   Level.findOne({_id: level_ID_edit}, function(err, dblevel){ 
        
      
     if(dblevel.leveldata.levelbg == "undefined" || dblevel.leveldata.level_tr_bg == "undefined"){  //if it is a level created by the editor load the default background

          dblevel.leveldata.levelbg = levelEngine.getBackground();   
          dblevel.leveldata.level_tr_bg = levelEngine.getTransparent();


      Rating.findOne({playerID: req.headers.cookie, levelname: dblevel.levelname}, function(err, rating){   //if player has already rated, do not display rating button

        res.send({dblevel: dblevel, rating: rating})

      });
    }
    else{
      console.log("No need to load default background");
      Rating.findOne({playerID: req.headers.cookie, levelname: dblevel.levelname}, function(err, rating){   //if player has already rated, do not display rating button

        res.send({dblevel: dblevel, rating: rating})

      });
    }
  }); 
});

app.get('/getLevelListing', function(req, res){  //get list of all levels and ther rating - gets displayed on homeoage

   Level.find({})
     .limit(5)
     .sort('-rating').exec(function(err, dblevels){
      res.send({dblevels: dblevels})

  }); 
});

app.get('/getCreatedLevel', function(req, res){  //get list of all levels and ther rating

  if(req.headers.cookie != undefined){

  Player.findOne({cookieID: req.headers.cookie}, function(err, player){

   Level.find({createdBy: player.name})
     .sort('-rating').exec(function(err, dblevels){
      res.send({dblevels: dblevels})
    });
  });
  }else{

    res.send("No levels yet!");
  } 
});

app.get('/getLevelRanking', function(req, res){  //get list of all levels and ther rating

   Level.find({})
     .limit(10)
     .sort('-rating').exec(function(err, dblevel){
      res.send({dblevel: dblevel})

  }); 
});

//---------------------------------------AJAX-POST----------------------------------
//save time of player and set besttime in level
 
app.post('/saveTime', function(req, res){
  
  Player.findOne({cookieID: req.headers.cookie}, function(err, players){ //get cookieID from client, check the name for that ID

    new PlayerTime({      

        playerID: players.name,
        time: req.body.time,
        levelname: req.body.levelname

    }).save(function(err, time){
      if(err) res.json(err);
    });
    res.send("done"); //ajax response
  });

  PlayerTime.findOne({levelname: req.body.levelname})
  .limit(1)
  .sort('time').exec(function(err, playertime){

     if(playertime != null){

      Level.findOne({levelname: req.body.levelname}, function(err, dblevel){

        dblevel.bestrun.player = playertime.playerID;
        dblevel.bestrun.time = playertime.time;

        dblevel.save(function(err){
          if(err) res.json(err);
          });

       // console.log(dblevel); 
      });
    }
  });
});

app.post('/rateLevel', function(req, res){

  Rating.findOne({playerID: req.headers.cookie, levelname: req.body.levelname}, function(err, Rating){   //lookup if player has already rated

    if(Rating == null){ //if not rated yet, he is allowed to

      console.log(req.body.levelname);

      Level.findOne({levelname: req.body.levelname}, function(err, dblevel){ //get cookieID from client, check the name for that ID

          dblevel.rating++;  //update Rating value +1
          dblevel.save(function(err){
          if(err) res.json(err);
          });
      })
    createDoc(); 
    }
  });
 function createDoc(){ 
  new Rating({

    playerID: req.headers.cookie,
    levelname: req.body.levelname,
    allowRate: false

    }).save(function(err){
      if(err) res.json(err);
    });
  }

  res.send("Thanks for Rating!")
});  

app.post('/getHighScore', function(req, res){  //request for a specific level

   PlayerTime.find({levelname: req.body.levelname})
    .limit(10)
    .sort('time').exec(function(err, highscores){
    res.send({highscores: highscores})

  }); 
});

app.post('/getOverallBesttimes', function(req, res){  //request for the best player in every level //query not right yet

  Level.find({}, function(err, dblevel){

    res.send({dblevel: dblevel});

  })

});

//------------------------------SET-COOKIE--------------------------------------------
app.post('/setPlayer', function(req, res){

  var uuid4 = uuid.v4();
  res.cookie('', uuid4, {});

  if(req.body.name == ""){

    req.body.name = "unknown";
  }

  new Player({    //save cookieID and playername

    name: req.body.name,
    cookieID: uuid4

  }).save(function(err, name){

    res.send({name: name.name});
  });

});
//-----------------------------NEW-LEVEL------------------------------------------------
app.post('/saveLevel', function(req, res){
  Player.findOne({cookieID: req.headers.cookie}, function(err, player){

   // console.log(req.body.levelname);
  //  console.log(req.body.leveldata);
    
      new Level({    

      levelname: req.body.levelname,
      createdBy: player.name, 
      rating: 0,
      leveldata: {
          levelmap: req.body.leveldata,
          levelbg: "undefined",
          level_tr_bg: "undefined",
      },
      bestrun: {
        player: "---",
        time: undefined,
      }

    }).save(function(err, docs){
      if(err) res.json(err);
       res.send('<form action="/leveleditor" id="refreshlist" method="GET"><button>Refresh your List!</button></form>');  // am besten link zur home mit dem level funzt ed 
    });
    /*Level.findOne({levelname: req.body.levelname}, function(err, dblevel){

      console.log(dblevel);
      if(dblevel != null){

      res.send('<a href="/play'+ dblevel._id + '">Done! Wanna play it?</a>'); 
      }
      else{ res.send("still processing")}
    });  */
  });


});
//---------------------------------------------------------------------------------------

app.get('/highscore', function(req, res){ 
            res.render('highscore', {title: 'Number One Players'}) 
});

app.get('/', function(req, res){

  if(req.headers.cookie != undefined){    //if cookie is set, return homepage and name of player
    Player.findOne({cookieID: req.headers.cookie}, function(err, players){ 

      Level.findOne({rating: 4}, function(err, dblevel){ 
        //console.log(dblevel);

          //res.send({dblevel: dblevel});
          res.render('index', {
          title: 'Lode Runner Reloaded', playername: players.name});
      });
    });
  }
  else{
  res.render('index', {title: 'Lode Runner Reloaded'});  //normal homepage render without cookie
  }
});

app.get('/levelranking', function(req, res){
          res.render('levelranking',  {
          title: 'Level Ranking'         
  });  
});

 app.get('/play:levelname', function(req, res){

  if(req.headers.cookie != undefined){    //if cookie is set, return homepage and name of player

    Player.findOne({cookieID: req.headers.cookie}, function(err, players){
  //bei datenbankabfrage ein zufallszahl, die der ÌD entspricht verwenden, um bei neuladen zufälliges level zuerhalten        
         // console.log(dblevel._id);
          res.render('index', {title: 'Lode Runner Reloaded',  playername: players.name}) //passt noch nicht
    });
  }
  else{
  res.render('index', {title: 'Lode Runner Reloaded'});  //normal homepage render without cookie
  }
 
}); 
app.get('/leveleditor', function(req, res){
          res.render('leveleditor',  {
          title: 'Create your own Level!'         
  });  
});  

app.get('/about', function(req, res){
          res.render('about');         
});

app.listen(3000);


