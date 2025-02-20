// Create a PixiJS application
const app = new PIXI.Application({ width: 800, height: 400 });
document.body.appendChild(app.view);

// Create the player
const player = new PIXI.Graphics();
player.beginFill(0xFF0000); // Red color
player.drawRect(0, 0, 40, 40); // Player size
player.endFill();
player.x = 50; // Initial position
player.y = 360; // Ground level
app.stage.addChild(player);

// Create platforms
const platforms = [];
const platform1 = new PIXI.Graphics();
platform1.beginFill(0x8B4513); // Brown color
platform1.drawRect(0, 380, 800, 20); // Ground
platform1.endFill();
app.stage.addChild(platform1);
platforms.push(platform1);

// Game variables
let isJumping = false;
let velocityY = 0;
const gravity = 0.5;
const jumpStrength = 10;

// Game loop
app.ticker.add(() => {
    // Update player position
    if (isJumping) {
        velocityY += gravity; // Apply gravity
        player.y += velocityY; // Update player Y position

        // Check for landing on platforms
        platforms.forEach(platform => {
            if (player.x < platform.x + platform.width &&
                player.x + player.width > platform.x &&
                player.y + player.height >= platform.y &&
                player.y + player.height <= platform.y + platform.height) {
                player.y = platform.y - player.height; // Land on platform
                velocityY = 0; // Reset velocity
                isJumping = false; // Stop jumping
            }
        });

        // Reset position if player falls below the game area
        if (player.y > app.renderer.height) {
            player.y = 360; // Reset to ground level
            velocityY = 0; // Reset velocity
        }
    }
});

// Handle keyboard input
window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        player.x += 5; // Move right
    }
    if (event.key === 'ArrowLeft') {
        player.x -= 5; // Move left
    }
    if (event.key === 'ArrowUp' && !isJumping) {
        isJumping = true; // Start jumping
        velocityY = -jumpStrength; // Initial jump velocity
    }
});