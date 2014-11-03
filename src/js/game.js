(function() {
    'use strict';

    function Game() {
    }

    Game.prototype = {

        create: function () {
        },

        update: function () {
        },

        onInputDown: function () {
            this.game.state.start('menu');
        }

    };

    window['phaser-template'] = window['phaser-template'] || {};
    window['phaser-template'].Game = Game;

}());
