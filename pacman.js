// Top left is 0, 0. Bottom right is 16, 16.

// You are given a function to implement - this should return 
// UP, DOWN, LEFT, or RIGHT (pre-defined constants).
// if anything else is returned, pacman will continue in the current direction.

// The current position and direction of Pacman and the ghosts is stored in the
// "positions" argument.
// e.g. positions.pacman.x is pacman's x position (0-16)
// positions.red.dir is red's direction (UP, DOWN, LEFT, or RIGHT)
//
// additionally, the ghosts have a "isDead", "isWeak", and "isBlinking" variable.
// when dead - a ghost will not move, and when weak - pacman can eat them
// blinking means they are currently weak but will soon not be

// CHECKING GRID LOCATIONS
// You can check the status of the grid by using the "maze" variable
// e.g. maze[y][x] will get the grid space for x, y.
//
// each Grid location has a gridType and a beanType variable.
//
// gridType tells you what walls are attached to that grid location
// (e.g., if pacman is in that position - what is the valid directions to go)
//
// The value is an int that can be compared to the following constants:
// CROSS_RD - no walls
// LEFT_ONLY, TOP_ONLY, RIGHT_ONLY, BOTTOM_ONLY

// LEFT_RIGHT, LEFT_TOP, LEFT_BOTTOM
// RIGHT_TOP, RIGHT_BOTTOM, TOP_BOTTOM
// BOTTOM_LEFT_TOP, LEFT_TOP_RIGHT, TOP_RIGHT_BOTTOM, RIGHT_BOTTOM_LEFT

// EMPTY_GRID, CLOSED_GRID
// (these last two were defined in the original code but i don't know what they do!)

// beanType will be one of three values: undefined, NORMAL_BEAN, or POWER_BEAN
// undefined means there is nothing there (either there never was or it has been collected)
// NORMAL_BEAN means the normal, point-scoring bean is there to be collected
// POWER_BEAN means that when this is collected by Pacman, ghosts begin to blink

// Other useful numbers: numRows, numCols (the size of the maze) - this is always 17x17

// Useful functions:
// canMove(x, y, direction) - returns true if you can move in the given direction from the given location

function pacmanMove(positions) {
    // Move at random
    return [UP, DOWN, LEFT, RIGHT][parseInt(Math.random()*4)];
}