# Hintro Task Board

A functional Task Board application built as part of a frontend engineering evaluation.

This project focuses on clean frontend architecture, structured state management, usability, and reliable client-side persistence without any backend.

---

## 🌐 Live Demo

Deployed Application: **[Add your deployed URL here]**

---

## 🚀 Features

### 🔐 Authentication

- Static login credentials  
  - Email: `intern@demo.com`  
  - Password: `intern123`
- Remember Me functionality using localStorage
- Protected routes
- Logout functionality
- Proper validation and error handling

---

### 📋 Task Board

- Fixed columns: Todo, Doing, Done
- Create, edit, and delete tasks
- Drag & drop across columns
- Search by title
- Filter by priority
- Sort by due date (empty values appear last)
- Activity log tracking:
  - Task created
  - Task edited
  - Task moved
  - Task deleted

---

### 💾 Persistence & Reliability

- Board state persists across refresh
- Safe localStorage parsing with fallback handling
- Reset Board option with confirmation dialog
- Handles empty or missing storage safely

---

## 🏗 Tech Stack


This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
---

## 🧠 Architecture Overview

### State Management

State is managed using the React Context API to centralize board logic and authentication state.  
This approach avoids prop drilling and ensures consistent state updates across components.

### Persistence Strategy

All board data is stored in localStorage.  
Storage interactions are handled safely with proper parsing and fallback logic to prevent crashes due to corrupted or missing data.

### Component Structure

The UI is organized into reusable components:

- BoardColumn  
- TaskCard  
- TaskModal  
- Toolbar  
- ActivityLog  

This structure ensures separation of concerns and maintainability.

---

## 🧪 Tests

Basic tests validate:

- Login validation logic
- Task creation behavior
- Task movement updates state correctly

---

## ⚙️ Setup Instructions

Clone the repository:

```bash
git clone <YOUR_REPOSITORY_URL>
cd hintro-task-board
```sh
npm install
Run development server

npm run dev
