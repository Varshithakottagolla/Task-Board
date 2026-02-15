import { describe, it, expect } from "vitest";
import { filterTasks, sortByDueDate, generateId } from "@/lib/task-utils";
import { Task } from "@/lib/types";

const makeTasks = (): Task[] => [
  { id: "1", title: "Fix bug", description: "", priority: "High", dueDate: "2025-03-01T00:00:00Z", tags: ["bug"], createdAt: "", column: "todo" },
  { id: "2", title: "Write docs", description: "", priority: "Low", dueDate: null, tags: ["docs"], createdAt: "", column: "doing" },
  { id: "3", title: "Add feature", description: "", priority: "Medium", dueDate: "2025-02-15T00:00:00Z", tags: [], createdAt: "", column: "todo" },
];

describe("filterTasks", () => {
  it("filters by search term", () => {
    const result = filterTasks(makeTasks(), "bug", "All");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Fix bug");
  });

  it("filters by priority", () => {
    const result = filterTasks(makeTasks(), "", "Low");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Write docs");
  });

  it("returns all when no filters", () => {
    expect(filterTasks(makeTasks(), "", "All")).toHaveLength(3);
  });
});

describe("sortByDueDate", () => {
  it("sorts ascending with nulls last", () => {
    const sorted = sortByDueDate(makeTasks(), true);
    expect(sorted[0].title).toBe("Add feature");
    expect(sorted[2].title).toBe("Write docs");
  });

  it("sorts descending with nulls last", () => {
    const sorted = sortByDueDate(makeTasks(), false);
    expect(sorted[0].title).toBe("Fix bug");
    expect(sorted[2].title).toBe("Write docs");
  });
});

describe("generateId", () => {
  it("generates unique ids", () => {
    const ids = new Set(Array.from({ length: 100 }, () => generateId()));
    expect(ids.size).toBe(100);
  });
});
