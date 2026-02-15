import { Task, Priority } from "./types";

export function filterTasks(
  tasks: Task[],
  search: string,
  priorityFilter: Priority | "All"
): Task[] {
  return tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === "All" || t.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });
}

export function sortByDueDate(tasks: Task[], ascending: boolean): Task[] {
  return [...tasks].sort((a, b) => {
    if (!a.dueDate && !b.dueDate) return 0;
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    return ascending ? diff : -diff;
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}
