/*global game phaser game_state*/



game_state.story = function() {};
game_state.story.prototype = {


preload: function () {
game.load.image('sky', 'assets/sky.png');

},


create: function () {

game.add.sprite(0, 0, 'sky');


this.storyText = game.add.text(225, game.world.height / 3, 'Welcome to Paradise\n A.K.A. Hell\nyour mission is to complete\nanything and everything\nput infront of you\nPress down to begin!',{
            fill: '#ffffff'
        });
this.cursors = game.input.keyboard.createCursorKeys();
this.down.inputEnabled = true;
var gameNum = 1;
},

update: function() {
if (this.cursors.down.isDown) {
       game.state.start('main');
}


}

    
},

game.state.add('story', game_state.story);
game.state.start('story');
