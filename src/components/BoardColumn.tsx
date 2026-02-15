import { Column } from "@/lib/types";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Task } from "@/lib/types";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  label: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function BoardColumn({ column, label, tasks, onEdit, onDelete }: Props) {
  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="font-semibold text-sm text-foreground">{label}</h3>
        <span className="text-xs text-muted-foreground bg-muted rounded-full px-2 py-0.5">{tasks.length}</span>
      </div>
      <Droppable droppableId={column}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-2 min-h-[200px] rounded-lg p-2 transition-colors ${
              snapshot.isDraggingOver ? "bg-accent/60" : "bg-muted/40"
            }`}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(prov) => (
                  <div ref={prov.innerRef} {...prov.draggableProps} {...prov.dragHandleProps}>
                    <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
