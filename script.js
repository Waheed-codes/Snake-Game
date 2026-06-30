const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score-display");
const highScoreDisplay = document.getElementById("high-score-display");
const gridSize = 20; // matches repeat(20, 1fr) in your CSS
//Snake formation
let snake = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
];
//Snake Food
let food = { x: 4, y: 4 };
let score = 0;
let highScore = Number(sessionStorage.getItem("highScore")) || 0;  //tries to read the saved value.Number(sessionStorage)
// converts the stored text into number 
let speed = 200; // milliseconds between each snake movement.
let speedBoostApplied = false; // ensures the score-50 boost only fires once
function draw() {
    board.innerHTML = ""; //redraws the board from scratch 
    //Draws snake on screen
    snake.forEach(segment => {
        const cell = document.createElement("div"); //creates an empty block
        cell.style.gridColumnStart = segment.x; // moves the block to columnX
        cell.style.gridRowStart = segment.y; // moves the block to rowY
        cell.classList.add("snake");  // gives a class attribute to snake
        board.appendChild(cell);  //adds the block on board.
    });
    //Draws Food
    const foodElement = document.createElement("div");
    foodElement.style.gridColumnStart = food.x;
    foodElement.style.gridRowStart = food.y;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}
// TO make snake movement faster.
let gameInterval = null;
function increaseSpeed() {
    if (speed > 50) {
        speed -= 10;  // as the speed decrease the movement of snake increases.
        clearInterval(gameInterval); // clears the previous snake speed.
        gameInterval = setInterval(moveSnake, speed); //start new speed movement.
    }
}
// To update score
function updateScore() {
    score += 5;  // updates score after snake eats the food
    scoreDisplay.textContent = "Score: " + score;
    // TO store high score
    if (score > highScore) {
        highScore = score;
        sessionStorage.setItem("highScore", highScore);
    }
    // One-time extra speed boost once score crosses 50
    if (score >= 50 && !speedBoostApplied) {
        speedBoostApplied = true; // Activates speedBoast 
        speed = Math.max(50, speed - 50); // redueces speed by 50 but not below 50.
        clearInterval(gameInterval);// clears the previous speed
        gameInterval = setInterval(moveSnake, speed); //starts new speed movement.
    }
}
//To create a gameover action.
let gameStarted = false;
function gameOver() {
    clearInterval(gameInterval);
    sessionStorage.setItem("finalScore", score);
    window.location.href="gameover.html"
}
// To control snake movement and direction.
let dx = 0;
let dy = -1; // moving up, away from the body.
function moveSnake() {
    //Creates a new head after moving forward.
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    // Wall collision detection
    if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
        gameOver();
        return;
    }
    // Self collision detection.
    //.some is used to check every segment one by one. If segment of x i.e 
    const hitSelf = snake.some(segment => segment.x === head.x && segment.y === head.y);
    if (hitSelf) {
        gameOver();
        return;
    }
    snake.unshift(head); //add head
    //generate food.
    // if the co-ordinates of both food and head matches then it is visualized as snake eating food.
    if (head.x === food.x && head.y === food.y) {
        // generating food
        food = {
            x: Math.floor(Math.random() * gridSize) + 1,  //Math.random creates random numbers and then it is multiplied with grid size.
            y: Math.floor(Math.random() * gridSize) + 1     //+1 is used to create food between the grid size, without 1 the food can go outside the grid.
        };
        updateScore();
        increaseSpeed();
    } else {
        snake.pop();  //remove tail
    }
    draw();
}
//Snake movement when keyboard buttons are pressed.
document.addEventListener("keydown", (e) => {   //e is event object
    const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
    // Checks if the arrow key is pressed.
    if (!arrowKeys.includes(e.key)) {
        return;
    }
    //starts the game 
    if (gameStarted == false) {
        gameStarted = true;
        gameInterval = setInterval(moveSnake, speed); //snake starts moving.
    }
    if (e.key === "ArrowUp" && dy !== 1) //Arrow up key.
    { dx = 0; dy = -1; }
    if (e.key === "ArrowDown" && dy !== -1) // Arrrow down key
    { dx = 0; dy = 1; }
    if (e.key === "ArrowLeft" && dx !== 1) // arrow left key 
    { dx = -1; dy = 0; }
    if (e.key === "ArrowRight" && dx !== -1) //arrow right key
    { dx = 1; dy = 0; }
});
draw();