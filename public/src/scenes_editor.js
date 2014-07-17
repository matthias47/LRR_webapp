var map_comp = [
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '................................',
    '', // nicht entfernen!
    ''   // nicht entfernen!   
];

//var map_comp = new Array();

var currentTile;

var moving = ('KeyDown', function(e) {
        if (e.key == Crafty.keys.LEFT_ARROW) {
            this.x = this.x - 24;
        }
        else if (e.key == Crafty.keys.RIGHT_ARROW) {
            this.x = this.x + 24;
        }
        else if (e.key == Crafty.keys.UP_ARROW) {
            this.y = this.y - 24;
        }
        else if (e.key == Crafty.keys.DOWN_ARROW) {
            this.y = this.y + 24;
        }
    });

Crafty.scene('Editor', function() {

    $(document).keypress(function(e) {
        if (e.which == 49 || e.which == 97) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Stone').at(10, 10);

            currentTile.bind('KeyDown', moving);
           
        }
        else if (e.which == 50 || e.which == 98) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Ladder').at(10, 10);
            
            currentTile.bind('KeyDown', moving);
        }
        else if (e.which == 51 || e.which == 99) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Pole').at(10, 10);
            
            currentTile.bind('KeyDown', moving);
        }
        else if (e.which == 52 || e.which == 100) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Treasure').at(10, 10);
            
            currentTile.bind('KeyDown', moving);
        }
        else if (e.which == 13) {
            
            //map_comp[currentTile.y / 24][ currentTile.x / 24] = currentTile.id;
        
            currentTile.unbind('KeyDown', moving);
            console.log(currentTile.x /24);
            map_comp[currentTile.y /24] = map_comp[currentTile.y /24].substring(1,currentTile.x / 24) + currentTile.id + map_comp[currentTile.y /24].substring(currentTile.x / 24, map_comp[currentTile.y /24].length - 1);
            
            for (var y = 0; y < Game.map_grid.height; y++) {
                           
                for (var x = 0; x < Game.map_grid.width; x++) {
                    
                    

                    console.log('in for' + ' ' + map_comp);

                    if (map_comp[y][x] == 'W') {
                        Crafty.e('Stone').at(x + 1, y);
                        }
                    if (map_comp[y][x] == 'C') {
                        //Crafty.e('Concrete').at(x+1, y+1);					
                    }
                    if (map_comp[y][x] == 'H') {
                        Crafty.e('Ladder').at(x + 1, y);
                        
                    }
                    if (map_comp[y][x] == '-') {
                        Crafty.e('Pole').at(x + 1, y);
                       
                    }
                    if (map_comp[y][x] == 'T') {
                        Crafty.e('Treasure').at(x + 1, y);
                        
                    }
                    if (map_comp[y][x] == 'P') {
                        //Crafty.e('PlayerCharacter').at(x+1, y+1);  
                    }
                    if (map_comp[y][x] == 'E') {
                        //Crafty.e('Enemy').at(x+1, y+1);   
                    }
                }
            }
        }
    });
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function() {

    // Load our sprite map image
    Crafty.load(['assets/assets-yellow.png', 'assets/Gitter-03.png'], function() {

        Crafty.sprite(24, 'assets/assets-yellow.png', {
            spr_treasure: [0, 0],
            spr_stone: [1, 0],
            spr_ladder: [0, 1],
            spr_pole: [1, 1]
        });

        Crafty.background('url(assets/Gitter-03.png)');

        Crafty.e('2D, DOM, Text')
                .text("Press Key To Start!")
                .attr({x: 0, y: Game.height() / 2 - 24, w: Game.width()})
                .css({"text-align": "center"})
                .textFont({size: '15px', weight: 'bold'})
                .textColor("#FFFFFF");
    });

    this.start_game = function() {
        Crafty.scene('Editor');
    }; //verbessurung
    this.bind('KeyDown', this.start_game);
},
        function() {
            this.unbind('KeyDown', this.start_game);
        }

);
