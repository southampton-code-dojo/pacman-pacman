//////////////////////////////////////////////////////
// Group members: Zi Wang (ziw), Bingying Xia(bxia) //
//////////////////////////////////////////////////////

function Pacman(xCord, yCord, direction){
	this.x = xCord;
	this.y = yCord;
	this.dir = direction;
	this.nextDir = undefined; //the direction to turn at next available turning point
	this.radius = PACMAN_RADIUS;
	this.mouthOpen = true;
}


Pacman.prototype.draw = function(color) {
	if (color == undefined){
		ctx.fillStyle = PACMAN_COLOR;
	}
	else{
		ctx.fillStyle = color;
	}
	ctx.beginPath();

	if (!this.mouthOpen){
		switch(this.dir){
			case UP:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*11/18, 2*Math.PI-Math.PI*7/18, true);
			break;

			case DOWN:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*29/18, 2*Math.PI-Math.PI*25/18, true);
			break;

			case LEFT:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*10/9, 2*Math.PI-Math.PI*8/9, true);
			break;

			case RIGHT:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI/9, 2*Math.PI-Math.PI*17/9, true);
			break;

			default:
			break;
		}
	}
	else {
		switch(this.dir){
			case UP:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*7/9, 2*Math.PI-Math.PI*2/9, true);
			break;

			case DOWN:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*16/9, 2*Math.PI-Math.PI*11/9, true);
			break;

			case LEFT:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*23/18, 2*Math.PI-Math.PI*13/18, true);
			break;

			case RIGHT:
			ctx.arc(this.x, this.y, this.radius, 2*Math.PI-Math.PI*5/18, 2*Math.PI-Math.PI*31/18, true);
			break;

			default:
			break;

		}
	}


	
	
	ctx.lineTo(this.x, this.y);
	ctx.fill();
};

//get the row index of current location
Pacman.prototype.getRow = function() {
	return getRowIndex(this.y);
};

//get the col index of current location
Pacman.prototype.getCol = function() {
	return getColIndex(this.x);
};

//return if pacman can move with current direction & tile
Pacman.prototype.canMove = function(dir) {
	return canMoveX(this.x, this.y, dir);
};

//try to turn(if necessary) and move the pacman.
Pacman.prototype.move = function() {
	if(onGridCenter(this.x, this.y) === false){
		//not on a grid center
		if(this.nextDir != undefined &&  (
			(this.dir === UP && this.nextDir === DOWN )||
			(this.dir === DOWN && this.nextDir === UP) ||
			(this.dir === LEFT && this.nextDir === RIGHT) ||
 			(this.dir === RIGHT && this.nextDir ===LEFT)
			))
		{
			this.dir = this.nextDir;
			this.nextDir = undefined;
		}

		this.moveOneStep();

		return;
	}
	else{
		//on grid center. change direction if needed
		var positions = {
			"pacman": {dir: mrPacman.dir, x: mrPacman.getCol(), y: mrPacman.getRow()},
			"red": {dir: blinky.dir, x: blinky.getCol(), y: blinky.getRow(), isDead: blinky.isDead, isWeak: blinky.isWeak, isBlinking: blinky.isBlinking},
			"cyan": {dir: inky.dir, x: inky.getCol(), y: inky.getRow(), isDead: inky.isDead, isWeak: inky.isWeak, isBlinking: inky.isBlinking},
			"orange": {dir: clyde.dir, x: clyde.getCol(), y: clyde.getRow(), isDead: clyde.isDead, isWeak: clyde.isWeak, isBlinking: clyde.isBlinking},
			"pink": {dir: pinky.dir, x: pinky.getCol(), y: pinky.getRow(), isDead: pinky.isDead, isWeak: pinky.isWeak, isBlinking: pinky.isBlinking}
		}

		var new_dir = pacmanMove(positions);

		if ([UP, DOWN, LEFT, RIGHT].indexOf(new_dir) > -1 && this.canMove(new_dir)) {
			this.dir = new_dir
		}
			
		if(this.canMove(this.dir)){
			this.moveOneStep();
		}	
	}
};

//move one step in the current direction if allowed
Pacman.prototype.moveOneStep = function() {
	var newX =0;
	var newY =0;
	if(!canMoveX(this.x, this.y, this.dir)){
		return;
	}
	switch(this.dir){

		case UP:
		newY = this.y  - speed;
		if(newY - this.radius - WALL_WIDTH > 0){
			this.y = newY;
			this.mouthOpen = ! this.mouthOpen;
		}
		break;

		case DOWN:
		newY = this.y + speed;
		if(newY + this.radius + WALL_WIDTH < CANVAS_HEIGHT) {
			this.y = newY;
			this.mouthOpen = ! this.mouthOpen;

		}
		break;


		case LEFT:
		newX = this.x - speed;
		if(newX - this.radius - WALL_WIDTH > 0 ){
			this.x = newX;
			this.mouthOpen = ! this.mouthOpen;
		}
		break;

		case RIGHT:
		newX = this.x + speed;

		if(newX + this.radius + WALL_WIDTH < CANVAS_WIDTH){
			this.x = newX;
			this.mouthOpen = ! this.mouthOpen;
		}
		break;
		
		default:
		break;
	}
};
