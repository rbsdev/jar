var Life = require('./life.js'),
    Power;

Power = {
  amount: 100,

  initialize: function(game) {
    this.phaser = game.phaser;

    this.layer = this.phaser.add.group();
    this.size = this.phaser.world.height / 30 >> 0;

    this.layer.x = Life.layer.width + (this.size * 3);
    this.layer.y = this.size;

    this.text = {
      amount: new window.Phaser.Text(this.phaser, 0, 0, '100%', {
        fill: 'rgb(245, 242, 214)', // rgb(50, 47, 53)
        font: 'italic ' + this.size + 'px "Source Sans Pro"'
      }),

      title: new window.Phaser.Text(this.phaser, 0, 0, 'FUEL', {
        fill: 'rgb(245, 242, 214)',
        font: 'italic ' + this.size + 'px "Source Sans Pro"'
      })
    };

    this.text.amount.x = this.text.title.width + 15;

    this.layer.add(this.text.amount);
    this.layer.add(this.text.title);

    return this;
  },

  decrease: function(amount) {
    this.amount = Math.max(0, this.amount - amount);
    this.render();

    if (this.amount === 0) {
      Life.decrease(100);
    }

    return this;
  },

  render: function() {
    this.text.amount.text = (this.amount >> 0) + '%';

    return this;
  },

  reset: function() {
    this.amount = 100;
    this.render();

    return this;
  },
};

module.exports = Power;
