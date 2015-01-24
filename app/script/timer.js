var Timer = {
  game: null,
  text: null,

  initialize: function(game) {
    var size = game.world.height / 16 >> 0;

    this.game = game;

    this.text = this.game.add.text(game.world.width - (size >> 2), 0, '00:00', {
      fill: '#FFFFFF',
      font: size + 'px Futura'
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
    var time = this.game.time.totalElapsedSeconds(),
        minutes = this.pad(time / 60 >> 0),
        seconds = this.pad(time % 60 >> 0);

    this.text.text = this.pad(minutes) + ':' + this.pad(seconds);

    return this;
  }
};

module.exports = Timer;
