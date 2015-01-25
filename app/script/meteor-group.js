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
    var i;

    // this.game.physics.enable(element, window.Phaser.Physics.ARCADE);
    // element.anchor.setTo(1.5, 0);
    // element.anchor.set(0,0);

    // this.meteors = this.game.add.group();
    // this.meteors.enableBody = true;
    // this.meteors.physicsBodyType = window.Phaser.Physics.ARCADE;

    for (i = 0; i < this.amount; i++) {
      // this.meteors.create(i*48, i*50, 'meteor').body.moves = true;
      this.instantiateElement();
    }

    // var tween = this.game.add.tween(this.meteors).to( { x: 400 }, 2000, 
    //                             window.Phaser.Easing.Linear.None, true, 0, 1000, true);

    // tween.onLoop.add(this.descend, this);

    // return this.meteors;
  },

  instantiateElement: function () {
    var meteor = new Meteor();
    var x = window.innerWidth + Math.random() * (window.innerWidth * 0.5);
    var y = 130 + Math.random() * (window.innerHeight * 0.5);

    meteor.initialize(this.game);
    meteor.createSprite();
    meteor.setAnchor(0.5, 0.5);
    meteor.setPosition(x, y);

    this.add(meteor);

    return meteor;
  },

  add: function (meteor) {
    this.collection.push(meteor);
  },

  remove: function (meteor) {
    var index = this.collection.indexOf(meteor);
    this.collection.splice(index, 1);
  },

  afterUpdate: function (meteor) {
    var xLimit = 0 - meteor.sprite.width;

    if (meteor.sprite.position.x < xLimit) {
      meteor.sprite.kill();
      this.remove(meteor);
    }
  },

  update: function () {
    var that = this;

    this.collection.forEach(function (meteor) {
      meteor.update();
      that.afterUpdate(meteor);
    });
  }
};

module.exports = MeteorGroup;