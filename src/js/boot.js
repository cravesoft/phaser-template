'use strict';

var Boot = function () {};

module.exports = Boot;

Boot.prototype = {

    init: function () {
        // Your game can check orientated in internal loops to know if it
        // should pause or not
        this.orientated = false;

        // Unless you specifically know your game needs to support
        // multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        // Phaser will automatically pause if the browser tab the game is
        // in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        // Loading screen will have a black background
        this.stage.backgroundColor = '#000';

        if(this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(260, 480, 720, 1280);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        } else {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(260, 480, 720, 1280);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            this.scale.forceOrientation(false, true);
            this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    },

    preload: function () {
        this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
        this.game.state.start('Preloader');
    },

    enterIncorrectOrientation: function () {
        this.orientated = false;
        document.getElementById('orientation').style.display = 'block';
    },

    leaveIncorrectOrientation: function () {
        this.orientated = true;
        document.getElementById('orientation').style.display = 'none';
    }
};
