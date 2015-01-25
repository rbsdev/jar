var MeteorGroup = function(game, amount) {
  this.amount = amount;
  this.game = game;
  this.meteor = null;
};

MeteorGroup.prototype = {
  descend: function() {
    this.meteors.y += 10;
  },

  create: function() {
    this.meteors = this.game.add.group();
    this.meteors.enableBody = true;
    this.meteors.physicsBodyType = window.Phaser.Physics.ARCADE;

    for (var i=0; i < this.amount; i++) {
      this.meteors.create(i*48, i*50, 'meteor').body.moves = true;
    }

    var tween = this.game.add.tween(this.meteors).to( { x: 1000 }, 2000, 
                                window.Phaser.Easing.Linear.None, true, 1000, 1000, true);

    this.meteors.x = 300;

    tween.onLoop.add(this.descend, this);

    return this.meteors;
  }
};

module.exports = MeteorGroup;