'use strict';

var Game = function () {};

module.exports = Game;

Game.prototype = {

    create: function () {
        this.input.onDown.add(this.processClick, this);
    },

    update: function () {
    },

    processClick: function () {
    },

    render: function () {
    },

};
