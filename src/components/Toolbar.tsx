import { Priority } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Search } from "lucide-react";

interface Props {
  search: string;
  onSearchChange: (v: string) => void;
  priorityFilter: Priority | "All";
  onPriorityChange: (v: Priority | "All") => void;
  sortAsc: boolean | null;
  onToggleSort: () => void;
}

export default function Toolbar({ search, onSearchChange, priorityFilter, onPriorityChange, sortAsc, onToggleSort }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative flex-1 min-w-[180px] max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search tasks…" value={search} onChange={(e) => onSearchChange(e.target.value)} className="pl-9" />
      </div>
      <Select value={priorityFilter} onValueChange={(v) => onPriorityChange(v as Priority | "All")}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All priorities</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="sm" onClick={onToggleSort} className="gap-1.5">
        <ArrowUpDown className="h-3.5 w-3.5" />
        {sortAsc === null ? "Sort by date" : sortAsc ? "Earliest first" : "Latest first"}
      </Button>
    </div>
  );
}
