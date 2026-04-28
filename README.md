
# Smart Library Navigator 📚

A full-stack application to search for books and navigate through a library using pathfinding algorithms.

## Features
- **Book Search**: Search by title or filter by category.
- **Smart Navigation**: Calculates the shortest path from the entrance to the book location.
- **Pathfinding Algorithms**: Choose between **A***, **BFS**, and **DFS**.
- **Visual Map**: Interactive SVG-based map showing racks, obstacles, and the calculated path.
- **Modern UI**: Dark mode, glassmorphism, and responsive design.

## Tech Stack
- **Frontend**: React, Vite, Axios, Lucide React
- **Backend**: Node.js, Express, PostgreSQL
- **Algorithms**: Custom implementation of A*, BFS, and DFS

## Setup Instructions

### 1. Database Setup
Ensure you have PostgreSQL installed and running.
1. Create a database named `smart_library`.
2. Run the SQL commands in `server/schema.sql` to create the `books` table and seed it with data.

### 2. Backend Configuration
1. Go to the `server` directory.
2. Update the `.env` file with your PostgreSQL credentials.
3. Start the server:
   ```bash
   npm run dev
   # or
   node index.js
   ```

### 3. Frontend Configuration
1. Go to the `client` directory.
2. Start the development server:
   ```bash
   npm run dev
   ```

## Folder Structure
- `server/`: Express backend with pathfinding logic and DB connection.
- `client/`: React frontend with components and visualization.
- `client/src/components/`: Reusable UI components (BookCard, MapView).
- `client/src/App.css`: Custom premium design styles.

## Algorithms
- **A***: Distance-aware search (Heuristic: Manhattan Distance).
- **BFS**: Breadth-First Search for shortest path on unweighted grids.
- **DFS**: Depth-First Search for exploration.
