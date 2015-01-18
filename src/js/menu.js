'use strict';

var Menu = function () {};

module.exports = Menu;

var TITLE_Y = 170
  , INSTRUCTIONS_Y = 280
  , i18n = require('i18next-client');

Menu.prototype = {

    init: function () {
    },

    create: function () {
        var text = i18n.t('menu.title')
          , style = { font: '50px Arial', fill: '#ffffff', align: 'center' }
          , t = this.add.text(this.world.centerX, TITLE_Y, text, style);
        t.anchor.set(0.5);

        text = i18n.t('menu.instructions');
        style = { font: '40px Arial', fill: '#ffffff', align: 'center' };
        t = this.add.text(this.world.centerX, INSTRUCTIONS_Y, text, style);
        t.anchor.set(0.5);

        this.input.onDown.add(this.onDown, this);
    },

    update: function () {
    },

    onDown: function () {
        this.game.state.start('Game');
    }
};
