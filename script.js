const bird = document.getElementById('bird');
const pipeContainer = document.getElementById('pipe-container');
let gravity = 0.2;
let velocity = 0;
let position = 250;
let gameOn = true;
let pipes = [];
let pipeInterval;

document.addEventListener('keydown', flap);

function flap(event) {
    if (event.keyCode === 32) {
        velocity = -5; // Increase this value to adjust jump height
    }
}

// function createPipe() {
//     const pipe = document.createElement('div');
//     pipe.classList.add('pipe');
//     pipe.style.left = '400px'; // Start pipe from the right side
//     pipe.style.bottom = '0';
//     pipeContainer.appendChild(pipe);
//     pipes.push(pipe);
// }


// function createPipe() {
//     const pipe = document.createElement('div');
//     pipe.classList.add('pipe');
    
//     // Generate random height for the top pipe
//     const topPipeHeight = Math.floor(Math.random() * 200) + 100; // Adjust min and max heights as needed
//     pipe.style.height = `${topPipeHeight}px`;

//     // Create bottom pipe
//     const bottomPipe = document.createElement('div');
//     bottomPipe.classList.add('pipe');
//     const bottomPipeHeight = 600 - topPipeHeight - 200; // Adjust the gap between pipes as needed
//     bottomPipe.style.height = `${bottomPipeHeight}px`;

//     pipe.appendChild(bottomPipe);
    
//     pipe.style.left = '400px'; // Start pipe from the right side
//     pipeContainer.appendChild(pipe);
//     pipes.push(pipe);
// }

// function createPipe() {
//     const pipeGap = 200; // Define the gap between the top and bottom pipes
//     const pipeWidth = 60; // Define the width of the pipes

//     // Generate random height for the top pipe
//     const topPipeHeight = Math.floor(Math.random() * (400 - pipeGap)) + 50; // Adjust min and max heights as needed

//     // Create top pipe
//     const topPipe = document.createElement('div');
//     topPipe.classList.add('pipe');
//     topPipe.style.height = `${topPipeHeight}px`;
//     topPipe.style.left = '400px'; // Start pipe from the right side
//     topPipe.style.bottom = `${topPipeHeight + pipeGap}px`;
//     pipeContainer.appendChild(topPipe);
//     pipes.push(topPipe);

//     // Create bottom pipe
//     const bottomPipeHeight = 600 - topPipeHeight - pipeGap;
//     const bottomPipe = document.createElement('div');
//     bottomPipe.classList.add('pipe');
//     bottomPipe.style.height = `${bottomPipeHeight}px`;
//     bottomPipe.style.left = '400px'; // Start pipe from the right side
//     pipeContainer.appendChild(bottomPipe);
//     pipes.push(bottomPipe);
// }

function createPipe() {
    const pipeGap = 200; // Define the gap between the top and bottom pipes
    const pipeWidth = 60; // Define the width of the pipes
    const pipeTopHeight = Math.floor(Math.random() * (400 - pipeGap - 100)) + 50; // Adjust min and max heights as needed
    const pipeBottomHeight = 600 - pipeTopHeight - pipeGap;
    
    const topPipe = document.createElement('div');
    topPipe.classList.add('pipe');
    topPipe.style.height = `${pipeTopHeight}px`;
    topPipe.style.left = '400px';
    topPipe.style.bottom = `${pipeBottomHeight + pipeGap}px`;
    pipeContainer.appendChild(topPipe);
    pipes.push(topPipe);

    const bottomPipe = document.createElement('div');
    bottomPipe.classList.add('pipe');
    bottomPipe.style.height = `${pipeBottomHeight}px`;
    bottomPipe.style.left = '400px';
    pipeContainer.appendChild(bottomPipe);
    pipes.push(bottomPipe);
}



// function movePipes() {
//     pipes.forEach(pipe => {
//         let pipeLeft = parseInt(pipe.style.left);
//         pipe.style.left = (pipeLeft - 2) + 'px'; // Adjust pipe speed here

//         // Check if pipe is out of the screen, remove it
//         if (pipeLeft < -60) {
//             pipe.remove();
//             pipes.shift();
//         }

//         // Check for collision with pipes
//         if (pipeLeft > 50 && pipeLeft < 90 && checkCollision(bird, pipe)) {
//             endGame();
//         }
//     });
// }

let score = 0;

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.innerText = `Score: ${score}`;
}

function movePipes() {
    pipes.forEach(pipe => {
        let pipeLeft = parseInt(pipe.style.left);
        pipe.style.left = (pipeLeft - 2) + 'px'; // Adjust pipe speed here

        // Check if pipe is out of the screen, remove it
        if (pipeLeft < -60) {
            pipe.remove();
            pipes.shift();
        }

        // Check for collision with pipes
        if (pipeLeft > 50 && pipeLeft < 90 && checkCollision(bird, pipe)) {
            endGame();
        }

        // Check for passing through the gap between pipes
        if (pipeLeft === 50 && pipe.id !== 'scored') {
            score++;
            updateScore();
            pipe.id = 'scored'; // Mark the pipe as scored to avoid duplicate scoring
        }
    });
}



function checkCollision(bird, pipe) {
    const birdRect = bird.getBoundingClientRect();
    const pipeRect = pipe.getBoundingClientRect();

    return (
        birdRect.bottom > pipeRect.top &&
        birdRect.top < pipeRect.bottom &&
        birdRect.right > pipeRect.left &&
        birdRect.left < pipeRect.right
    );
}

// function movePipes() {
//     pipes.forEach(pipe => {
//         let pipeLeft = parseInt(pipe.style.left);
//         pipe.style.left = (pipeLeft - 2) + 'px'; // Adjust pipe speed here
//         if (pipeLeft < -60) {
//             pipe.remove();
//             pipes.shift();
//         }
//         if (pipeLeft > 50 && pipeLeft < 90 && checkCollision(bird, pipe)) {
//             endGame();
//         }
//     });
// }

function gameLoop() {
    if (!gameOn) return;

    velocity += gravity;
    position += velocity;
    bird.style.top = position + 'px';

    movePipes();

    if (position > 560 || position < 0) {
        endGame();
    }

    requestAnimationFrame(gameLoop);
}

function endGame() {
    gameOn = false;
    clearInterval(pipeInterval);
    alert(`Game over! Your score is: ${score}. Refresh the page to play again.`);
}


pipeInterval = setInterval(createPipe, 1500); // Adjust pipe creation interval here

// Display an initial alert before starting the game
alert("Get ready! The game will start shortly.");

// Start the game loop after the alert
gameLoop();

