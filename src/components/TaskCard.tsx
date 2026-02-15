import { Task } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Props {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const priorityColor: Record<string, string> = {
  High: "bg-destructive text-destructive-foreground",
  Medium: "bg-orange-500 text-white",
  Low: "bg-green-600 text-white",
};

export default function TaskCard({ task, onEdit, onDelete }: Props) {
  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm space-y-2">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-medium text-sm leading-tight text-card-foreground">{task.title}</h4>
        <Badge className={`shrink-0 text-[10px] px-1.5 py-0 ${priorityColor[task.priority]}`}>{task.priority}</Badge>
      </div>

      {task.dueDate && (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {format(new Date(task.dueDate), "MMM d, yyyy")}
        </div>
      )}

      {task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">{tag}</Badge>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-1">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(task)}>
          <Pencil className="h-3.5 w-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onDelete(task)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
