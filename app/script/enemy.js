var Enemy = function () {
  
};

Enemy.prototype = {
  initialize: function(game) {
    this.phaser = game.phaser;
    
    this.element = this.phaser.add.sprite(114, 48, 'enemy');
    this.phaser.physics.arcade.enable(this.element);
    
    this.element.body.immovable = false;

    this.setAnimations();

    this.element.animations.play('normal');

    return this;
  },

  setPosition: function (x, y) {
    this.element.position.x = x;
    this.element.position.y = y;
  },

  setAnimations: function () {
    this.element.animations.add('normal', [0, 1], 15, true, true);
  },

  render: function() {
    this.element.position.x -= 5;

    return this;
  }
};

module.exports = Enemy;
