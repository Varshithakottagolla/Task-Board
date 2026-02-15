import { useState, useMemo } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useBoard } from "@/context/BoardContext";
import { useAuth } from "@/context/AuthContext";
import { Task, Column, Priority } from "@/lib/types";
import { filterTasks, sortByDueDate } from "@/lib/task-utils";
import BoardColumn from "@/components/BoardColumn";
import Toolbar from "@/components/Toolbar";
import TaskModal from "@/components/TaskModal";
import ActivityLog from "@/components/ActivityLog";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut, Plus, History, RotateCcw } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const COLUMNS: { id: Column; label: string }[] = [
  { id: "todo", label: "Todo" },
  { id: "doing", label: "Doing" },
  { id: "done", label: "Done" },
];

export default function Index() {
  const { tasks, addTask, editTask, deleteTask, moveTask, resetBoard } = useBoard();
  const { logout } = useAuth();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "All">("All");
  const [sortAsc, setSortAsc] = useState<boolean | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const processedTasks = useMemo(() => {
    let result = filterTasks(tasks, search, priorityFilter);
    if (sortAsc !== null) result = sortByDueDate(result, sortAsc);
    return result;
  }, [tasks, search, priorityFilter, sortAsc]);

  const columnTasks = (col: Column) => processedTasks.filter((t) => t.column === col);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const to = result.destination.droppableId as Column;
    moveTask(result.draggableId, to);
  };

  const openCreate = () => { setEditingTask(null); setModalOpen(true); };
  const openEdit = (task: Task) => { setEditingTask(task); setModalOpen(true); };

  const handleSave = (data: { title: string; description: string; priority: Priority; dueDate: string | null; tags: string[] }) => {
    if (editingTask) {
      editTask(editingTask.id, data);
    } else {
      addTask(data);
    }
  };

  const toggleSort = () => setSortAsc((prev) => (prev === null ? true : prev ? false : null));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          <h1 className="text-lg font-bold text-foreground">Task Board</h1>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <History className="h-3.5 w-3.5" /> Activity
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Activity Log</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <ActivityLog />
                </div>
              </SheetContent>
            </Sheet>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reset Board?</AlertDialogTitle>
                  <AlertDialogDescription>This will delete all tasks and activity logs. This cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={resetBoard}>Reset</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button variant="ghost" size="sm" onClick={logout} className="gap-1.5">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Toolbar
            search={search}
            onSearchChange={setSearch}
            priorityFilter={priorityFilter}
            onPriorityChange={setPriorityFilter}
            sortAsc={sortAsc}
            onToggleSort={toggleSort}
          />
          <Button onClick={openCreate} size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> New Task
          </Button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {COLUMNS.map((col) => (
              <BoardColumn key={col.id} column={col.id} label={col.label} tasks={columnTasks(col.id)} onEdit={openEdit} onDelete={setDeletingTask} />
            ))}
          </div>
        </DragDropContext>
      </main>

      {/* Task Modal */}
      {modalOpen && (
        <TaskModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          initial={editingTask}
        />
      )}

      {/* Delete confirmation */}
      <AlertDialog open={!!deletingTask} onOpenChange={(open) => !open && setDeletingTask(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task?</AlertDialogTitle>
            <AlertDialogDescription>Delete &ldquo;{deletingTask?.title}&rdquo;? This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (deletingTask) deleteTask(deletingTask.id); setDeletingTask(null); }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
