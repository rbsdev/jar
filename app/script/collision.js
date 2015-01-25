//var Life = require('./life.js');

var debounce = function(func, wait, immediate) {
  var timeout;

  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

var Collision = {
  initialize: function(enemies) {
    this.enemies = enemies;
    return this;
  },

  handler: function(spaceship, element) {
    var onHandler = function() {
      var isEnemy = Collision.enemies.indexOf(element.key) !== -1;

      if (isEnemy) {
        console.log('collision!');
        //Life.decrease();
      }
    };

    debounce(onHandler, 250);
  }
};

module.exports = Collision;
