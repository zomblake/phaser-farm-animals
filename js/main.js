//this game will have only 1 state
var GameState = {
  //load the game assets before the game starts
  preload: function() {
    this.game.load.image('background', 'assets/images/background.png');
    this.game.load.image('arrow', 'assets/images/arrow.png');
    this.game.load.image('chicken', 'assets/images/chicken.png');
    this.game.load.image('horse', 'assets/images/horse.png');
    this.game.load.image('pig', 'assets/images/pig.png');
    this.game.load.image('sheep', 'assets/images/sheep3.png');
    
  },
  //executed after everything is loaded
  create: function() {
    
    //scaling options
    //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    
    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    //create a sprite for the background
    this.background = this.game.add.sprite(0, 0, 'background')
    
    //group for animals
    var animalData = [
      {key: 'chicken', text: 'CHICKEN'},
      {key: 'horse', text: 'HORSE'},
      {key: 'pig', text: 'PIG'},
      {key: 'sheep', text: 'SHEEP'}
    ];
    
    this.animals = this.game.add.group();

    var self = this;
    var animal;

    animalData.forEach(function(element){
      animal = self.animals.create(-1000, self.game.world.centerY, element.key);

      animal.customParams = {text: element.text};
      animal.anchor.setTo(0.5);

      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.events.onInputDown.add(self.animateAnimal, self);
    });

    //stores current animal
    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);

    //left arrow
    this.leftArrow = this.game.add.sprite(60, this.game.world.centerY, 'arrow');
    this.leftArrow.anchor.setTo(0.5);
    this.leftArrow.scale.x = -1;
    this.leftArrow.customParams = {direction: -1};

    //left arrow user input
    this.leftArrow.inputEnabled = true;
    this.leftArrow.input.pixelPerfectClick = true;
    this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

    //right arrow
    this.rightArrow = this.game.add.sprite(580, this.game.world.centerY, 'arrow');
    this.rightArrow.anchor.setTo(0.5);
    this.rightArrow.customParams = {direction: 1};

    //right arrow user input
    this.rightArrow.inputEnabled = true;
    this.rightArrow.input.pixelPerfectClick = true;
    this.rightArrow.events.onInputDown.add(this.switchAnimal, this);    

  },
  //this is executed multiple times per second
  update: function() {
  },
  //play animal animation
  animateAnimal: function(sprite, event) {
    console.log('animate..');
  },
  //switch animal
  switchAnimal: function(sprite, event) {
    var newAnimal, endX;
    
    //get direction of arrow
    if (sprite.customParams.direction > 0) {
      newAnimal = this.animals.next();
      endX = 640 + this.currentAnimal.width / 2;
    } else {
      newAnimal = this.animals.previous();
      endX = -this.currentAnimal.width / 2;
    }

    this.currentAnimal.x  = endX;

    newAnimal.x = game.world.centerX;
    this.currentAnimal = newAnimal;
  }
  

};

//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');