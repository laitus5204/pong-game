# Pong Game

A classic Pong game built with vanilla HTML, CSS, and JavaScript. Play against a computer-controlled opponent in this retro-style arcade game.

## Features

- 🎮 **Player vs Computer AI**: Challenge yourself against an intelligent computer opponent
- 🖱️ **Dual Control Methods**: Control your paddle with your mouse position OR arrow keys (Up/Down)
- ⚽ **Realistic Physics**: Ball bounces off walls and paddles with physics-based spin
- 📊 **Live Scoreboard**: Real-time score tracking for both player and computer
- ⏸️ **Pause/Resume**: Press SPACE to pause and resume the game anytime
- 🎨 **Modern UI**: Neon green retro aesthetic with smooth animations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## How to Play

1. **Start the Game**: Press the SPACE key to start playing
2. **Move Your Paddle**: 
   - Use your **mouse** position to move the left paddle up and down, OR
   - Use **Arrow Keys (Up/Down)** to move the left paddle
3. **Score Points**: Hit the ball back to the computer. If the computer misses, you score a point!
4. **Game Mechanics**:
   - Ball bounces off top and bottom walls
   - Ball bounces off paddles with spin based on where it hits
   - Score increases when opponent fails to return the ball
   - Computer AI tracks the ball and tries to defend
5. **Pause**: Press SPACE again to pause and resume the game

## Game Rules

- The left paddle is controlled by the player
- The right paddle is controlled by the computer AI
- Ball bounces off top and bottom walls automatically
- If the ball passes the left edge, computer scores
- If the ball passes the right edge, player scores
- Ball speed and direction change based on paddle collisions

## Installation

### Option 1: Clone the Repository
```bash
git clone https://github.com/laitus5204/pong-game.git
cd pong-game
```

### Option 2: Download Files
Simply download the three files (index.html, styles.css, script.js) and place them in the same folder.

## Running the Game

1. Open `index.html` in your web browser
2. Press SPACE to start
3. Move your paddle and enjoy!

No server or installation required - it runs entirely in your browser!

## File Structure

```
pong-game/
├── index.html      # Game HTML structure
├── styles.css      # Game styling and layout
├── script.js       # Game logic and physics
└── README.md       # This file
```

## Technical Details

### Canvas Size
- Width: 800px
- Height: 400px

### Game Objects
- **Paddles**: 10px wide × 80px tall
- **Ball**: 8px radius circular object
- **Speed**: 
  - Player paddle: 6px per frame
  - Computer paddle: 5px per frame
  - Ball: 5px per frame (initial speed)

### Collision Detection
- Rectangular collision detection for paddles
- Circular collision detection for ball
- Boundary checking for top/bottom walls
- Spin physics based on paddle hit location

## Browser Compatibility

Works on all modern browsers that support:
- HTML5 Canvas
- ES6 JavaScript
- CSS3 (Flexbox, Gradients, Shadows)

## Tips for Playing

- 🏓 **Aim for edges**: Hit the ball near the edges of your paddle for more extreme angles
- ⏰ **Anticipate**: Watch where the ball is heading and position your paddle ahead of time
- ⚡ **Speed up gameplay**: Each paddle hit can increase the ball's spin, making it faster
- 🤖 **AI weakness**: The computer AI has a slight reaction delay - use this to your advantage!

## Future Enhancements

Potential features for future versions:
- Difficulty levels (Easy, Medium, Hard)
- Two-player mode (Player vs Player)
- Sound effects and background music
- Particle effects on collisions
- Score history and high scores
- Game speed adjustment
- Ball speed acceleration over time

## License

Free to use and modify for personal or educational purposes.

## Author

Created by laitus5204

---

**Enjoy the game!** 🎮
