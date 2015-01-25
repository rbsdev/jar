var Meteor = function () {
  
};

Meteor.prototype = {
  initialize: function (game) {
    this.game = game;
    this.rotationSpeed = 0.01 - 0.02 * Math.random();
  },

  createSprite: function () {
    this.sprite = this.game.add.sprite(221, 213, 'meteor');
    // element.physicsBodyType = window.Phaser.Physics.ARCADE;
    this.sprite.rotation = 0;

    this.game.physics.enable(this.sprite, window.Phaser.Physics.ARCADE);
    // sprite.anchor.set(0,0);
    return this.sprite;
  },

  setPosition: function (x, y) {
    this.sprite.position.x = x;
    this.sprite.y = y;
  },

  setAnchor: function (x, y) {
    this.sprite.anchor.set(x, y);
  },

  update: function () {
    this.sprite.position.x -= 2;
    this.sprite.rotation -= this.rotationSpeed;
  }
};

module.exports = Meteor;
