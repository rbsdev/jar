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

    var meteor1 = this.meteors.create(3*48, 3*50, 'meteor');
    meteor1.body.moves = true;

    var meteor2 = this.meteors.create(2*48, 2*50, 'meteor');
    meteor2.body.moves = true;

    var tween = this.game.add.tween(this.meteors).to( { x: 200 }, 2000, 
                                window.Phaser.Easing.Linear.None, true, 0, 1000, true);

    tween.onLoop.add(this.descend, this);
  }
};

module.exports = MeteorGroup;