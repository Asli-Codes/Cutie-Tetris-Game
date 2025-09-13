## 🛠 About the Code (Technical Overview)
---
Game Board: The playfield is represented as a 2D array, which tracks filled and empty cells in real time.

Tetrominoes: Each block shape is defined as a matrix, allowing easy manipulation and rendering on the grid.

Controls: In this initial version, the player can move pieces horizontally (left and right) via keyboard input. Rotation mechanics are intentionally left out for simplicity.

Audio System: The game runs with continuous background music. When a full row is cleared, the track temporarily switches to a celebratory tune before returning to the main loop.

Game Loop: A timer-driven loop continuously updates the state of the board, handles collisions, clears completed lines, and spawns new pieces.

--- 

<img width="1920" height="1020" alt="Ekran görüntüsü 2025-09-14 011403" src="https://github.com/user-attachments/assets/d8bc5347-f730-4a06-8acc-d17afbd729ac" />
<img width="1920" height="1020" alt="Ekran görüntüsü 2025-09-14 011206" src="https://github.com/user-attachments/assets/0a629b4d-bb6e-461b-bbae-7392fd56dda0" />
