import React, { createContext, useContext, useState, useCallback } from "react";
import { Task, Column, ActivityEntry, ActionType } from "@/lib/types";
import { loadTasks, saveTasks, loadLog, saveLog, clearBoard } from "@/lib/storage";
import { generateId } from "@/lib/task-utils";

interface BoardCtx {
  tasks: Task[];
  log: ActivityEntry[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "column">) => void;
  editTask: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, to: Column) => void;
  resetBoard: () => void;
}

const BoardContext = createContext<BoardCtx | null>(null);

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [log, setLog] = useState<ActivityEntry[]>(loadLog);

  const pushLog = useCallback((action: ActionType, taskTitle: string) => {
    setLog((prev) => {
      const entry: ActivityEntry = { id: generateId(), action, taskTitle, timestamp: new Date().toISOString() };
      const next = [entry, ...prev].slice(0, 50);
      saveLog(next);
      return next;
    });
  }, []);

  const persist = (next: Task[]) => { setTasks(next); saveTasks(next); };

  const addTask: BoardCtx["addTask"] = useCallback((data) => {
    const task: Task = { ...data, id: generateId(), createdAt: new Date().toISOString(), column: "todo" };
    setTasks((prev) => { const next = [...prev, task]; saveTasks(next); return next; });
    pushLog("created", data.title);
  }, [pushLog]);

  const editTask: BoardCtx["editTask"] = useCallback((id, updates) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, ...updates } : t));
      saveTasks(next);
      const task = next.find((t) => t.id === id);
      if (task) pushLog("edited", task.title);
      return next;
    });
  }, [pushLog]);

  const deleteTask: BoardCtx["deleteTask"] = useCallback((id) => {
    setTasks((prev) => {
      const task = prev.find((t) => t.id === id);
      const next = prev.filter((t) => t.id !== id);
      saveTasks(next);
      if (task) pushLog("deleted", task.title);
      return next;
    });
  }, [pushLog]);

  const moveTask: BoardCtx["moveTask"] = useCallback((id, to) => {
    setTasks((prev) => {
      const next = prev.map((t) => (t.id === id ? { ...t, column: to } : t));
      saveTasks(next);
      const task = next.find((t) => t.id === id);
      if (task) pushLog("moved", task.title);
      return next;
    });
  }, [pushLog]);

  const resetBoard = useCallback(() => {
    clearBoard();
    setTasks([]);
    setLog([]);
  }, []);

  return (
    <BoardContext.Provider value={{ tasks, log, addTask, editTask, deleteTask, moveTask, resetBoard }}>
      {children}
    </BoardContext.Provider>
  );
}

export function useBoard() {
  const ctx = useContext(BoardContext);
  if (!ctx) throw new Error("useBoard must be inside BoardProvider");
  return ctx;
}
