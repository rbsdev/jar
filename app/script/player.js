var Player = function(life, power) {
  this.setAttr('attrs', {
    life  : life,
    power : power,
    time  : 0
  }).resetPlayer();
};

Player.prototype = {
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

  decrease: function(attr, value) {
    this[attr] = (this[attr] - value);
    return this[attr];
  },

  setAttr: function(attr, value) {
    this[attr] = value;
    return this;
  },

  resetPlayer: function() {
    this.setAttr('life', this.attrs.life);
    this.setAttr('power', this.attrs.life);
    this.setAttr('time', this.attrs.time);
    return this;
  }
};

module.exports = Player;
