'use strict';

var i18n = require('i18next-client')
  , game = new Phaser.Game(720, 1280, Phaser.AUTO, 'game');
game.state.add('Boot',  require('./boot'));
game.state.add('Preloader', require('./preloader'));
game.state.add('Menu', require('./menu'));
game.state.add('Game', require('./game'));

var lang = (navigator.language.split('-')[0]);

i18n.init({
    lng: lang,
    lngWhitelist: ['en', 'fr'],
    ns: { namespaces: ['ns.common', 'ns.special'], defaultNs: 'ns.special'},
    load: 'current',
    getAsync: true,
    useLocalStorage: false,
    useCookie: false,
    fallbackLng: 'en',
    debug: true
}).done( function() {
    game.state.start('Boot');
});
