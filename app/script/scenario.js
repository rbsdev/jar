var Scenario = {
  initialize: function(phaser) {
    var scaleX = phaser.stage.width / 2560;
    var scaleY = phaser.stage.height / 1440;

    this.layer3 = phaser.add.tileSprite(0, 0, phaser.stage.width, phaser.stage.height, 'layer03');
    this.layer2 = phaser.add.tileSprite(0, 0, phaser.stage.width, phaser.stage.height, 'layer02');
    this.layer1 = phaser.add.tileSprite(0, 0, phaser.stage.width, phaser.stage.height, 'layer01');

    this.layer3.anchor.set(0, 0);
    this.layer2.anchor.set(0, 0);
    this.layer1.anchor.set(0, 0);

    this.layer3.tileScale.x = scaleX;
    this.layer2.tileScale.x = scaleX;
    this.layer1.tileScale.x = scaleX;

    this.layer3.tileScale.y = scaleY;
    this.layer2.tileScale.y = scaleY;
    this.layer1.tileScale.y = scaleY;

    return this;
  },

  render: function() {
    this.layer3.tilePosition.x -= 0.5;
    this.layer2.tilePosition.x -= 1;
    this.layer1.tilePosition.x -= 10;
  }
};

module.exports = Scenario;