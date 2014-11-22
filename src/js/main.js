window.onload = function () {
    'use strict';

    var game
      , ns = window['phaser-template'];

    game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-template-game');
    game.state.add('boot', ns.Boot);
    game.state.add('preloader', ns.Preloader);
    game.state.add('menu', ns.Menu);
    game.state.add('game', ns.Game);

    game.state.start('boot');
};
