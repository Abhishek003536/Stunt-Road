
// --------------Third---------------
function gameStart() {

  // sound
  let audio = document.createElement('audio');
  audio.src = 'driving-in-a-car-6227.mp3'; // Replace with the path to your audio file
  audio.loop= true;
  audio.play();


  // Variables to track car position, state, and game status
  let carPositionY = 85;
  let isJumping = false;
  let isGameOver = false;

  // Store the original car position
  const originalCarPositionY = carPositionY;

  // Function to handle arrow key events
  function handleArrowKeys(event) {
    if (isGameOver) return;
    if (event.key === 'ArrowUp' && !isJumping) {
      // Move the car up (jump)
      const car = document.getElementById('CAR');
      const jumpHeight = 300; // Adjust the jump height as needed
      carPositionY = jumpHeight;
      isJumping = true;

      // Update the car's position
      car.style.bottom = carPositionY + 'px';

      // Reset the car's position after a short delay (simulate falling back down)
      setTimeout(() => {
        carPositionY = originalCarPositionY; // Reset to the original position
        car.style.bottom = carPositionY + 'px';
        isJumping = false;
      }, 1000);
    }
  }

  // Add event listener to the document to listen for arrow key events
  document.addEventListener('keydown', handleArrowKeys);

  // Function to check for collisions between car and obstacle
  function checkCollision() {
    if (isGameOver) return; // Do nothing if the game is already over
  
    const car = document.getElementById('CAR');
    const obstacle = document.querySelector('.obstacle');
  
    const carRect = car.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
  
    const carBottomY = carRect.bottom;
    const obstacleTopY = obstacleRect.top;
  
    // Define a threshold to check whether the car is above the obstacle
    const verticalThreshold = 20; // Adjust this value as needed
  
    if (
      carRect.left < obstacleRect.right &&
      carRect.right > obstacleRect.left &&
      carBottomY - verticalThreshold > obstacleTopY
    ) {
      // Collision occurred, show the Game Over pop-up
      const gameOverPopup = document.getElementById('gameOverPopup');
      gameOverPopup.style.display = 'block';
      audio.pause();
  
      // Set the game state to "Game Over"
      isGameOver = true;
    }
  }

// Call the checkCollision function periodically to check for collisions
setInterval(checkCollision, 100); // Adjust the interval as needed
}


// ---------------Second---------------
function callMe() {
  document.getElementById('start').style.display = 'none';
  document.getElementById('gameOverPopup').style.display = 'none';

  gameStart();
}


// ------------First----------------
var startbtn = document.getElementById('startbtn');
var restartbtn = document.getElementById('restartButton');

startbtn.onclick = callMe;
restartbtn.onclick = callMe;




