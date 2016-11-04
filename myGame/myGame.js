/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {}


game_state.main = function() {};
game_state.main.prototype = {


  preload: function() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('bullet', 'assets/Bullet.png');
    game.load.spritesheet('New Piskel', 'assets/New Piskel.png', 32, 32);
  },


  create: function() {
    this.score = 0;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    game.add.sprite(0, 0, 'star');
    game.add.sprite(0, 0, 'bullet');
    this.platforms = game.add.group();
    this.platforms.enableBody = true;
    var ground = this.platforms.create(0, game.world.height - 64, 'ground')
    ground.scale.setTo(.2, 2);
    ground.body.immovable = true;
    var ledge = this.platforms.create(100, 400, 'ground');
    ledge.body.immovable = true;
     var ground = this.platforms.create(0, game.world.height - 64, 'ground')
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;
    
   var ledge = this.platforms.create(100, 300, 'ground');
    ledge.body.immovable = true;
    ledge.width = 100;
    this.player = game.add.sprite(32, game.world.height - 150, 'New Piskel')
    game.physics.arcade.enable(this.player);
    this.player.body.bounce.y = .2;
    this.player.body.gravity.y = 400;
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('left', [3, 4], 10, true);
    this.player.animations.add('right', [1, 2], 10, true);
    
    this.cursors = game.input.keyboard.createCursorKeys();
    
    this.stars = game.add.group();
    this.stars.enableBody = true;
    for (var i = 0; i < 12; i++) {
      var star = this.stars.create(i * 70, 0, 'star');
      star.body.gravity.y = 300;
      star.body.bounce.y = .5 + Math.random() * 0.2;
    }
    this.bullet = game.add.sprite(32, game.world.height - 150, 'bullet');
    this.bullet.enableBody = true;
    for (var i = 0; i < 12; i++) {
      var bullet = this.Bullet.create(i * 70, 0, 'bullet');
      bullet.body.gravity.y = 300;
      bullet.body.bounce.y = 0 + Math.random() * 0.2;
    }
   this.scoreText = game.add.text(16,16, 'Score: ' + this.score);
  },


  update: function() {
    game.physics.arcade.collide(this.player, this.platforms);
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = -150;
      this.player.animations.play('left')
    }

    else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = 150;
      this.player.animations.play('right')
    }

    else {
      this.player.animations.play('stop');
      this.player.frame = 0;
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {

      this.player.body.velocity.y = -350;
    }
    game.physics.arcade.collide(this.stars, this.platforms);
    
    game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

  },
  collectStar: function(player, star) {
    this.score += 10;
    this.scoreText.text = 'Score: ' + this.score;
    star.kill();
  }


}
game.state.add('main', game_state.main);
game.state.start('main');
