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

var map_entity = new Array;

for(i = 0; i<24; i++)
{
    map_entity[i] = new Array();
}

//map_entity = map_comp;



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

    var currentTile;
    var currentEntity;
    var y;
    var x;

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

            currentTile = Crafty.e('SolidStone').at(10, 10);
       
            currentTile.bind('KeyDown', moving);

        }
        else if (e.which == 51 || e.which == 99) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Ladder').at(10, 10);

            currentTile.bind('KeyDown', moving);
        }
        else if (e.which == 52 || e.which == 100) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Pole').at(10, 10);

            currentTile.bind('KeyDown', moving);
        }
        else if (e.which == 53 || e.which == 101) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Treasure').at(10, 10);

            currentTile.bind('KeyDown', moving);
        }
        else if (e.which == 54 || e.which == 102) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('PlayerCharacter').at(10, 10);

            currentTile.bind('KeyDown', moving);
        }
        else if (e.which == 55 || e.which == 103) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Enemy').at(10, 10);

            currentTile.bind('KeyDown', moving);

        }
        else if (e.which == 56 || e.which == 104) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Final_Ladder').at(10, 10);

            currentTile.bind('KeyDown', moving);

        }
        else if (e.which == 57 || e.which == 105) {
            if (currentTile != undefined)
            {
                currentTile.destroy();
            }

            currentTile = Crafty.e('Ausgang').at(10, 10);

            currentTile.bind('KeyDown', moving);

        }
        else if (e.which == 48 || e.which == 96) {
            if (currentTile != undefined)
            {
                currentTile.destroy();

            }
            currentTile = Crafty.e('Cursor').at(10, 10);

            currentTile.bind('KeyDown', moving);

        }

        else if (e.which == 13) {

            
            map_comp[currentTile.y / 24][ currentTile.x / 24] = currentTile.id;
           

            currentTile.unbind('KeyDown', moving);


            map_comp[currentTile.y / 24] = map_comp[currentTile.y / 24].substring(0, currentTile.x / 24) + currentTile.id + map_comp[currentTile.y / 24].substring((currentTile.x / 24) + 1, map_comp[currentTile.y / 24].length);

            for (var y = 0; y < Game.map_grid.height; y++) {

                for (var x = 0; x < Game.map_grid.width; x++) {

                    if (map_comp[y][x] == 'W') {
                        /*  if (currentEntity != undefined)
                         {
                         currentEntity.destroy();
                         }*/
                        if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        currentEntity = Crafty.e('Stone').at(x, y);
                        map_entity[y][x] = currentEntity;
                    }
                    if (map_comp[y][x] == 'S') {
                        /* if (currentEntity != undefined)
                         {
                         currentEntity.destroy();
                         }*/
                         if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        currentEntity = Crafty.e('SolidStone').at(x, y);
                        map_entity[y][x] = currentEntity;
                    }

                    if (map_comp[y][x] == 'H') {
                        /*if (currentEntity != undefined)
                         {
                         currentEntity.destroy();
                         }*/
                        if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        currentEntity = Crafty.e('Ladder').at(x, y);
                        map_entity[y][x] = currentEntity;

                    }
                    if (map_comp[y][x] == '-') {
                        /*if (currentEntity != undefined)
                         {
                         currentEntity.destroy();
                         }*/
                       if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        currentEntity = Crafty.e('Pole').at(x, y);
                        map_entity[y][x] = currentEntity;

                    }
                    if (map_comp[y][x] == 'T') {
                        /*if (currentEntity != undefined)
                         {
                         currentEntity.destroy();
                         }*/
                        if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        currentEntity = Crafty.e('Treasure').at(x, y);
                        map_entity[y][x] = currentEntity;

                    }
                    if (map_comp[y][x] == 'P') {
                        /*if (currentEntity != undefined)
                         {
                         currentEntity.destroy();
                         }*/
                        if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        currentEntity = Crafty.e('PlayerCharacter').at(x, y);
                        map_entity[y][x] = currentEntity;
                    }
                    if (map_comp[y][x] == 'E') {
                        /*if (currentEntity != undefined)
                         {
                         currentEntity.destroy();
                         }*/
                        if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        currentEntity = Crafty.e('Enemy').at(x, y);
                        map_entity[y][x] = currentEntity;
                    }
                    
                    if (map_comp[y][x] == 'h') {
                        /*if (currentEntity != undefined)
                         {
                         currentEntity.destroy();
                         }*/
                        if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        currentEntity = Crafty.e('Final_Ladder').at(x, y);
                        map_entity[y][x] = currentEntity;
                    }
                    
                    if (map_comp[y][x] == 'X') {
                        /*if (currentEntity != undefined)
                         {
                         currentEntity.destroy();
                         }*/
                        if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        currentEntity = Crafty.e('Ausgang').at(x, y);
                        map_entity[y][x] = currentEntity;
                    }

                    if (map_comp[y][x] == 'C') {
                        /*if (currentEntity != undefined)
                        {
                            currentEntity.destroy();
                        }*/
                        if (map_entity[y][x]) {
                            console.log("isch bin drin");
                            map_entity[y][x].destroy();
                        }
                        map_entity[y][x] = currentEntity;
                        

                    }

                }
            }
        } console.log(map_comp);
    });
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function() {

    // Load our sprite map image
    Crafty.load(['assets/assets-yellow.png', 'assets/Gitter-03.png', 'assets/cursor.png', 'assets/steine.png'], function() {

        Crafty.sprite(24, 'assets/assets-yellow.png', {
            spr_treasure: [0, 0],
            spr_ladder: [0, 1],
            spr_pole: [1, 1],
            spr_final: [0, 2]
        });

        Crafty.sprite(24, 'assets/steine.png', {
            spr_stone: [0, 0],
            spr_solidstone: [0, 9],
            spr_ausgang: [1, 9]
        });

        Crafty.sprite(24, 'assets/enemysprite.png', {
            spr_enemy: [0, 0],
        });

        Crafty.sprite(24, 'assets/playersprite.png', {
            spr_player: [0, 0],
        });

        Crafty.sprite(24, 'assets/cursor.png', {
            spr_cursor: [0, 0],
        });
        

        Crafty.background('url(assets/Gitter-03.png)');

        var tutorial = Crafty.e('2D, DOM, Text, Image')
                .image("assets/Tutorial.png");
        tutorial.y = 1;
        tutorial.x = 1;
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
