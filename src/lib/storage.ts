import { Task, ActivityEntry } from "./types";

const TASKS_KEY = "taskboard_tasks";
const LOG_KEY = "taskboard_log";
const AUTH_KEY = "taskboard_auth";

export function loadTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

export function loadLog(): ActivityEntry[] {
  try {
    const raw = localStorage.getItem(LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLog(log: ActivityEntry[]) {
  localStorage.setItem(LOG_KEY, JSON.stringify(log));
}

export function loadAuth(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "true";
  } catch {
    return false;
  }
}

export function saveAuth(val: boolean) {
  if (val) localStorage.setItem(AUTH_KEY, "true");
  else localStorage.removeItem(AUTH_KEY);
}

export function clearBoard() {
  localStorage.removeItem(TASKS_KEY);
  localStorage.removeItem(LOG_KEY);
}
