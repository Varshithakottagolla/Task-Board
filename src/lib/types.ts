export type Priority = "Low" | "Medium" | "High";
export type Column = "todo" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string | null; // ISO string
  tags: string[];
  createdAt: string; // ISO string
  column: Column;
}

export type ActionType = "created" | "edited" | "moved" | "deleted";

export interface ActivityEntry {
  id: string;
  action: ActionType;
  taskTitle: string;
  timestamp: string; // ISO string
}
