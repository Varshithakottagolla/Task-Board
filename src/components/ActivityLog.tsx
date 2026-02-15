import { useBoard } from "@/context/BoardContext";
import { format } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusCircle, Pencil, ArrowRight, Trash2 } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
  created: <PlusCircle className="h-3.5 w-3.5 text-green-600" />,
  edited: <Pencil className="h-3.5 w-3.5 text-blue-600" />,
  moved: <ArrowRight className="h-3.5 w-3.5 text-orange-500" />,
  deleted: <Trash2 className="h-3.5 w-3.5 text-destructive" />,
};

export default function ActivityLog() {
  const { log } = useBoard();

  if (log.length === 0) {
    return <p className="text-xs text-muted-foreground text-center py-6">No activity yet.</p>;
  }

  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-1 pr-3">
        {log.map((entry) => (
          <div key={entry.id} className="flex items-start gap-2 rounded-md p-2 text-xs hover:bg-muted/50">
            <div className="mt-0.5">{icons[entry.action]}</div>
            <div className="flex-1 min-w-0">
              <span className="capitalize font-medium">{entry.action}</span>{" "}
              <span className="text-foreground truncate">&ldquo;{entry.taskTitle}&rdquo;</span>
              <div className="text-muted-foreground mt-0.5">{format(new Date(entry.timestamp), "MMM d, h:mm a")}</div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
