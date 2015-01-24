
var Player = {
  initialize: function(life, power, name) {
    this.setAttr('attrs', {
      name: name,
      life: life,
      power: power,
      time: 0
    }).resetPlayer();

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
