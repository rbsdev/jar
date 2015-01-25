var World = {
  initialize: function(game) {
    this.phaser = game.phaser;
    this.elements = this.phaser.add.group();
    this.elements.enableBody = true;

    // add roof
    this.roof = this.phaser.add.sprite(0, 0, null, 0, this.elements);
    this.roof.width = this.phaser.stage.width;
    this.roof.height = 110;
    this.roof.body.immovable = true;

    // add floor
    this.floor = this.phaser.add.sprite(0, this.phaser.stage.height - 110, null, 0, this.elements);
    this.floor.width = this.phaser.stage.width;
    this.floor.height = 110;
    this.floor.body.immovable = true;

    // wip - add meteor
    // add - rocks

    return this;
  }
};

module.exports = World;