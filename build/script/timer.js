var Timer = {
  initialize: function(game) {
    this.phaser = game.phaser;
    this.size = this.phaser.world.height / 30 >> 0;

    this.text = this.phaser.add.text(this.phaser.world.width - this.size, this.size, '00:00', {
      fill: 'rgb(50, 47, 53)',
      font: 'italic ' + this.size + 'px "Source Sans Pro"'
    });

    this.text.anchor.set(1, 0);

    return this;
  },

  pad: function(number) {
    var string = number.toString();

    if (string.length >= 2) {
      return string;
    }

    return '0' + string;
  },

  render: function() {
    var time = this.phaser.time.totalElapsedSeconds(),
        minutes = this.pad(time / 60 >> 0),
        seconds = this.pad(time % 60 >> 0);

    this.text.text = this.pad(minutes) + ':' + this.pad(seconds);

    return this;
  }
};

module.exports = Timer;
