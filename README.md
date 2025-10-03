# Emergent Life - Watch life unfold, one cell at a time.

**Emergent Life** is a simple, interactive clone of John Conway’s famous **Game of Life** built with **Bootstrap, HTML Canvas, and vanilla JavaScript**.  
It simulates cellular automata where simple rules lead to surprisingly complex and beautiful patterns.

---

## 🎮 Features

- **Interactive Grid**
  - Click cells to toggle them alive/dead.
  - Randomize button to populate the grid quickly.
- **Controls**
  - Start / Pause simulation
  - Reset grid
  - Adjust simulation speed (50–1000 ms per generation)
  - Change grid size (20x20, 40x40, 60x60, 80x80)
- **Turn Counter**
  - Displays the number of generations evolved.
- **Responsive UI**
  - Styled with Bootstrap for a clean and simple layout.
- **Starter Patterns**
  - Load famous patterns from a dropdown:
    - **Glider** – the classic moving spaceship.
    - **Pulsar** – a large period-3 oscillator.
    - **Gosper Glider Gun** – produces an endless stream of gliders.

---

## 📜 Rules of Conway’s Game of Life

The simulation is governed by four simple rules applied to each cell:

1. **Underpopulation:** A live cell with fewer than 2 neighbors dies.  
2. **Survival:** A live cell with 2 or 3 neighbors survives.  
3. **Overpopulation:** A live cell with more than 3 neighbors dies.  
4. **Reproduction:** A dead cell with exactly 3 neighbors becomes alive.  

From these rules, complex and emergent patterns evolve over time.

---

## 🚀 Getting Started

### 1. Clone or Download
```bash
git clone https://github.com/your-username/emergent-life.git
cd emergent-life
````

### 2. Run Locally

Just open the `index.html` file in your browser. No build tools or servers required.

---

## 🛠️ Technologies Used

* [Bootstrap 5](https://getbootstrap.com/) – For responsive layout and styling.
* **HTML Canvas** – For drawing the grid and cell states.
* **Vanilla JavaScript** – For game logic and interactivity.

---

## ✨ Future Improvements

* Ability to save & load custom patterns.
* Step-through mode for analyzing one generation at a time.
* Pattern library with thumbnails and descriptions.
* Export grid state as JSON or image.

---

## 📖 License

This project is open source under the [MIT License](LICENSE).
