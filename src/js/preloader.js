'use strict';

var Preloader = function () {};

module.exports = Preloader;

Preloader.prototype = {

    init: function () {
        this.asset = null;
        this.ready = false;
    },

    preload: function () {
        this.asset = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloader');
        this.asset.anchor.setTo(0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);
        this.load.image('player', 'assets/player.png');
    },

    create: function () {
        this.asset.cropEnabled = false;
    },

    update: function () {
        if(!!this.ready) {
            this.game.state.start('Menu');
        }
    },

    onLoadComplete: function () {
        this.ready = true;
    }
};
