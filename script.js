const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const paddle1 = {
  x: 10,
  y: 100,
  width: 10,
  height: 50
};

const paddle2 = {
  x: 480,
  y: 100,
  width: 10,
  height: 50
};

const ball = {
  x: 250,
  y: 150,
  radius: 5,
  dx: 5,
  dy: -5
};

let score1 = 0;
let score2 = 0;

let gameOver = false;

let fullScreen = false;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);

  ctx.fillStyle = "red";
  ctx.fillRect(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);

  // Display the score
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText(score1 + "-" + score2, 10, 30);

  // Display the game over message
  if (gameOver) {
    ctx.fillStyle = "black";
    ctx.font = "40px Arial";
    ctx.fillText("Game over!", 100, 100);
  }
}

function update() {
  // Move the ball
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Check for collisions with the paddles
  if (ball.x - ball.radius < paddle1.x + paddle1.width && ball.y - ball.radius < paddle1.y + paddle1.height && ball.y + ball.radius > paddle1.y) {
    ball.dx = -ball.dx;
  }

  if (ball.x + ball.radius > paddle2.x && ball.y - ball.radius < paddle2.y + paddle2.height && ball.y + ball.radius > paddle2.y) {
    ball.dx = -ball.dx;
  }

  // Check if the ball has hit the top or bottom of the screen
  if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
    ball.dy = -ball.dy;
  }

  // Check if the ball has gone past a paddle
  if (ball.x < 0 || ball.x > canvas.width) {
    // Game over
    gameOver = true;
  }
}

function gameloop() {
  update();
  draw();

  if (!gameOver) {
    requestAnimationFrame(gameloop);
  }
}

// Start the game
gameloop();

// Add event listeners to the paddles
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 38) {
    paddle1.y -= 10;
  } else if (e.keyCode === 40) {
    paddle1.y += 10;
  } else if (e.keyCode === 87) {
    paddle2.y -= 10;
  } else if (e.keyCode === 83) {
    paddle2.y += 10;
  }
});

// Add an event listener to the full screen button
document.getElementById("full-screen-button").addEventListener("click", function () {
  if (fullScreen) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen();
  }

  fullScreen = !fullScreen;
});


