var Scenario = {
  initialize: function(game) {
    this.phaser = game.phaser;
    this.layer3 = this.phaser.add.tileSprite(0, 0, this.phaser.stage.width, this.phaser.stage.height, 'layer03');
    this.layer2 = this.phaser.add.tileSprite(0, 0, this.phaser.stage.width, this.phaser.stage.height, 'layer02');
    this.layer1 = this.phaser.add.tileSprite(0, 0, this.phaser.stage.width, this.phaser.stage.height, 'layer01');

    this.layer3.anchor.set(0, 0);
    this.layer2.anchor.set(0, 0);
    this.layer1.anchor.set(0, 0);

    this.scaleX = this.phaser.stage.width / 2560;
    this.scaleY = this.phaser.stage.height / 1440;

    this.layer3.tileScale.x = this.scaleX;
    this.layer2.tileScale.x = this.scaleX;
    this.layer1.tileScale.x = this.scaleX;

    this.layer3.tileScale.y = this.scaleY;
    this.layer2.tileScale.y = this.scaleY;
    this.layer1.tileScale.y = this.scaleY;

    return this;
  },

  render: function() {
    this.layer3.tilePosition.x -= 0.5;
    this.layer2.tilePosition.x -= 1;
    this.layer1.tilePosition.x -= 10;
  }
};

module.exports = Scenario;