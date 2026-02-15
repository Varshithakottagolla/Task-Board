

## Task Board Application

### 1. Static Login Flow
- Login page with email/password fields (hardcoded: `intern@demo.com` / `intern123`)
- Error messages for invalid credentials
- "Remember me" checkbox that persists login state via localStorage
- Logout button in the app header
- Protected routes — redirects unauthenticated users to login

### 2. Task Board (Main View)
- Three fixed columns: **Todo**, **Doing**, **Done**
- Each task card displays: title, priority badge, due date, and tags
- **Drag & drop** tasks between columns
- Toolbar with:
  - Search bar (filter by title)
  - Priority filter dropdown (Low / Medium / High)
  - Sort by due date toggle (empty dates sorted last)
- "Reset Board" button with a confirmation dialog

### 3. Task Management
- **Create task** via a modal form with fields: Title (required), Description, Priority (Low/Medium/High), Due Date (date picker), Tags (comma-separated input)
- CreatedAt auto-set on creation
- **Edit task** — same modal, pre-filled with existing data
- **Delete task** with confirmation
- All data persisted to localStorage

### 4. Activity Log
- A sidebar/panel showing recent actions: created, edited, moved, deleted
- Each entry shows the action type, task title, and timestamp
- Persisted in localStorage alongside board state

### 5. Testing
- At least 3 tests covering: login validation logic, task creation/filtering, and utility functions

### 6. Design & UX
- Clean, minimal design using the existing shadcn/ui components
- Responsive layout
- Light color scheme with priority-colored badges

