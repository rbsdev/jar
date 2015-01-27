// var Timer = require('./timer.js');

var Player = {
  initialize: function(game, name) {
    this.setAttr('attrs', {
      name: name
    }).resetPlayer();

    this.game = game;

    return this;
  },

  name: function() {
    return this.name;
  },

  life: function() {
    return this.life;
  },

  time: function() {
    return this.time;
  },

  power: function() {
    return this.life;
  },

  increase: function(attr, value) {
    this[attr] = (this[attr] + value);
    return this[attr];
  },

  dead: function() {
    // var tween = this.game.phaser.add.tween(Timer.text);

    this.game.phaser.paused = true;

    // tween.to({
    //   x: this.phaser.world.width >> 1,
    //   y: this.phaser.world.height >> 1
    // }, 1000);

    // tween.start();
  },

  decrease: function(attr, value) {
    this[attr] = (this[attr] - value);
    return this[attr];
  },

  setAttr: function(attr, value) {
    this[attr] = value;
    return this;
  },

  resetPlayer: function() {
    this.setAttr('name', this.attrs.name);
    this.setAttr('life', this.attrs.life);
    this.setAttr('power', this.attrs.power);
    this.setAttr('time', this.attrs.time);
    return this;
  }
};

module.exports = Player;
