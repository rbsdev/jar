var Life = require('./life.js');

var Collision = {
  initialize: function(enemies) {
    this.enemies = enemies;
    return this;
  },

  handler: function(spaceship, element) {
    var isEnemy = Collision.enemies.indexOf(element.key) !== -1;

    if (isEnemy) { 
      Life.decrease();
      return;
    }

    var isLife = element.key === 'life';
    if (isLife) Life.increase();
  }
};

module.exports = Collision;
