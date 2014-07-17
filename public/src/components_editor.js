// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
    init: function() {
        this.attr({
            w: Game.map_grid.tile.width,
            h: Game.map_grid.tile.height
        });
    },
    // Locate this entity at the given position on the grid
    at: function(x, y) {
        if (x === undefined && y === undefined) {
            return {x: this.x / Game.map_grid.tile.width, y: this.y / Game.map_grid.tile.height};
        }
        else {
            this.attr({x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height});
            return this;
        }
    }
});


// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
    init: function() {
        this.requires('2D, Canvas, Grid');
    }
});

// This is the player-controlled character
Crafty.c('Stone', {
    init: function() {
        this.requires('Actor, Multiway, Collision, spr_stone');
    },
    id: "W"
});

Crafty.c('Ladder', {
    init: function() {
        this.requires('Actor, Multiway, Collision, spr_ladder');
    },
    id: "H"
});

Crafty.c('Treasure', {
    init: function() {
        this.requires('Actor, Multiway, Collision, spr_treasure');
    },
    id: "T"
});

Crafty.c('Pole', {
    init: function() {
        this.requires('Actor, Multiway, Collision, spr_pole');
    },
    id: "-"
});


