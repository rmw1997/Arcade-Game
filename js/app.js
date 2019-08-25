// Global Variables
const canvas_width = 505;
const canvas_height = 606;
let counter = 0; //to count how many time the player reach the water

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    //loud the player image
    this.sprite = 'images/enemy-bug.png';
    //Enemy location
    this.x=x;
    this.y=y;
    //the speed for which the enemy is moved
    this.speed=speed;
    //enemy dimensions
    this.height=83;
    this.width=101;
};

// Update the enemy's position, required method for game
Enemy.prototype.update = function(dt) {

    if(this.x > canvas_width){ //if the enemy x-axis is greater than the canvas weidth 505
        this.x = -50; //return the enemy back to he start of the screen
        this.speed=(Math.random()*200)+200 // to change the enemy speed whenever it crosses the screen
    }
    else
        this.x = this.x + this.speed * dt;  // Distance = speed * time

    this.checkCollision(); //check the collision in every execution of update function
};

//Handle the collision between enemy and player
Enemy.prototype.checkCollision = function(){
    //Source : https://stackoverflow.com/questions/13916966/adding-collision-detection-to-images-drawn-on-canvas
    if (player.x < this.x + (this.width - 30) &&
        player.x + (player.width - 30) > this.x &&
        player.y < this.y + (this.height - 30) &&
        player.y + (player.height - 30) > this.y) {
        //return the player back to the starting position
        player.resetPosititon();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Our player class 
var Player = function(x,y){
    //loud the player image
    this.sprite='images/char-boy.png';
    //player location on the canvas
    this.x=x;
    this.y=y;
    //player dimensions
    this.height=83;
    this.width=101;
    //function to return the player back to its start position
    this.resetPosititon = function(){
        this.x=200;
        this.y=400;
    };
};


// Draw the player on the screen, required method for game
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Move the player depending on the pressed key
// Check if the player move off screen
// Check if the player reach the water or not
Player.prototype.handleInput = function(allowedKey){    
    if(allowedKey=='left' && this.x > 0){
        this.x = this.x - this.width;
    }
    if(allowedKey=='up' && this.y > 0){
        this.y = this.y - this.height;
    }
    if(allowedKey=='right' && this.x < 400){
        this.x = this.x + this.width;
    }
    if(allowedKey=='down' && this.y < 400){
        this.y = this.y + this.height
    }
    if(this.y < 0){
        this.reachWater(); // Call this function everytime that player reach the water
    }
};

// When the player reach the water, reset his position
// If the player reach the water 3 times, he win the game and show a pop-up message
Player.prototype.reachWater = function(){
        setTimeout(()=>this.resetPosititon(),300); 
        counter++;
        if(counter==3) 
        {
            setTimeout( function(){
                let msg = confirm("Congratulations!\nDo you want to play again?");
                return msg ? location.reload() : window.close(); 
            },1500); 
        }
};
 


// Place a 3 enemies in allEnemies array with initial speed equals to 200
const allEnemies = [ 
    new Enemy(0,65,200) ,
    new Enemy(0,144,200) ,
    new Enemy(0,228,200) ];

// Place the player object in a variable called player
const player = new Player(200,400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
