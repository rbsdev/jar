var Meteor = require('./meteor.js');

var MeteorGroup = function(game, amount) {
  this.amount = amount;
  this.game = game;
  this.meteor = null;
  this.collection = [];
};

MeteorGroup.prototype = {
  descend: function() {
    this.meteors.y += 10;
  },

  create: function() {
    var meteor, i;

    // this.game.physics.enable(element, window.Phaser.Physics.ARCADE);
    // element.anchor.setTo(1.5, 0);
    // element.anchor.set(0,0);

    // this.meteors = this.game.add.group();
    // this.meteors.enableBody = true;
    // this.meteors.physicsBodyType = window.Phaser.Physics.ARCADE;

    for (i = 0; i < this.amount; i++) {
      // this.meteors.create(i*48, i*50, 'meteor').body.moves = true;
      meteor = new Meteor();
      meteor.initialize(this.game);
      meteor.createSprite();
      meteor.moveTo(Math.random() * -2, 0);

      this.add(meteor.sprite);
    }

    // var tween = this.game.add.tween(this.meteors).to( { x: 400 }, 2000, 
    //                             window.Phaser.Easing.Linear.None, true, 0, 1000, true);

    // tween.onLoop.add(this.descend, this);

    // return this.meteors;
    return meteor;
  },

  add: function (meteor) {
    this.collection.push(meteor);
  }
};

module.exports = MeteorGroup;