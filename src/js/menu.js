(function() {
    'use strict';

    function Menu() {
    }

    Menu.prototype = {

        create: function () {
            var text = 'Title\n\nClick to start'
              , style = { font: '40px Arial', fill: '#ffffff', align: 'center' }
              , t = this.add.text(this.game.world.centerX, this.game.world.centerY, text, style);
            t.anchor.set(0.5, 0.5);

            this.input.onDown.add(this.onDown, this);
        },

        update: function () {

        },

        onDown: function () {
            this.game.state.start('game');
        }
    };

    window['phaser-template'] = window['phaser-template'] || {};
    window['phaser-template'].Menu = Menu;

}());
