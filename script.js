// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const paddleWidth = 10;
const paddleHeight = 80;
const ballSize = 8;

let playerScore = 0;
let computerScore = 0;
let gameRunning = false;

// Player paddle
const player = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 6
};

// Computer paddle
const computer = {
    x: canvas.width - paddleWidth - 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    dy: 0,
    speed: 5
};

// Ball
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballSize,
    dx: 5,
    dy: 5,
    speed: 5
};

// Keyboard input
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;

    if (e.key === ' ') {
        e.preventDefault();
        toggleGame();
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Mouse input
document.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    
    // Move player paddle to follow mouse
    player.y = mouseY - player.height / 2;
    
    // Keep paddle in bounds
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
});

// Arrow key movement for player paddle
function updatePlayerInput() {
    if (keys['ArrowUp']) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown']) {
        player.y += player.speed;
    }

    // Keep paddle in bounds
    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
}

// Computer AI
function updateComputerAI() {
    const computerCenter = computer.y + computer.height / 2;
    const ballCenter = ball.y;
    const distance = ballCenter - computerCenter;

    // Computer tracks the ball with a slight delay for difficulty
    if (Math.abs(distance) > 35) {
        if (distance > 0) {
            computer.y += computer.speed;
        } else {
            computer.y -= computer.speed;
        }
    }

    // Keep paddle in bounds
    if (computer.y < 0) computer.y = 0;
    if (computer.y + computer.height > canvas.height) {
        computer.y = canvas.height - computer.height;
    }
}

// Ball movement
function updateBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Top and bottom wall collision
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy;
        ball.y = ball.y - ball.radius < 0 ? ball.radius : canvas.height - ball.radius;
    }

    // Paddle collision - Player
    if (
        ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height
    ) {
        ball.dx = -ball.dx;
        ball.x = player.x + player.width + ball.radius;
        
        // Add spin based on where ball hits paddle
        const collidePoint = ball.y - (player.y + player.height / 2);
        ball.dy = collidePoint * 0.1;
    }

    // Paddle collision - Computer
    if (
        ball.x + ball.radius > computer.x &&
        ball.y > computer.y &&
        ball.y < computer.y + computer.height
    ) {
        ball.dx = -ball.dx;
        ball.x = computer.x - ball.radius;
        
        // Add spin based on where ball hits paddle
        const collidePoint = ball.y - (computer.y + computer.height / 2);
        ball.dy = collidePoint * 0.1;
    }

    // Score points
    if (ball.x - ball.radius < 0) {
        computerScore++;
        resetBall();
        updateScore();
    }

    if (ball.x + ball.radius > canvas.width) {
        playerScore++;
        resetBall();
        updateScore();
    }
}

// Reset ball position and velocity
function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = (Math.random() > 0.5 ? 1 : -1) * ball.speed;
    ball.dy = (Math.random() - 0.5) * ball.speed;
}

// Update score display
function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

// Toggle game state
function toggleGame() {
    gameRunning = !gameRunning;
    const statusEl = document.getElementById('gameStatus');
    
    if (gameRunning) {
        statusEl.textContent = 'Game Running! Press SPACE to pause';
    } else {
        statusEl.textContent = 'Game Paused. Press SPACE to resume';
    }
}

// Draw functions
function drawPaddle(paddle) {
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function drawBall() {
    ctx.fillStyle = '#00ff88';
    ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();
}

function drawCenter() {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.setLineDash([10, 10]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    drawCenter();
    drawPaddle(player);
    drawPaddle(computer);
    drawBall();
}

// Game loop
function gameLoop() {
    if (gameRunning) {
        updatePlayerInput();
        updateComputerAI();
        updateBall();
    }

    draw();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();