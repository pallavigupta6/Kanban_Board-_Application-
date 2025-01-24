import React from 'react';
import { DndContext, DragEndEvent, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext } from '@dnd-kit/sortable';
import { Plus, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useBoardStore } from '../store/boardStore';
import Column from '../components/Coloumn';
import TaskCard from '../components/TaskCard';
import AddColumnDialog from '../components/AddColoumnDialog';
import AddTaskDialog from '../components/AddTaskDialog';

export default function Board() {
  const { signOut } = useAuthStore();
  const { columns, tasks, fetchBoard, moveTask } = useBoardStore();
  const [activeTask, setActiveTask] = React.useState<string | null>(null);
  const [isAddColumnOpen, setIsAddColumnOpen] = React.useState(false);
  const [isAddTaskOpen, setIsAddTaskOpen] = React.useState(false);
  const [selectedColumnId, setSelectedColumnId] = React.useState<string>('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  React.useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const activeTaskId = active.id as string;
    const overColumnId = over.id as string;

    moveTask(activeTaskId, overColumnId);
    setActiveTask(null);
  };

  const handleAddTask = (columnId: string) => {
    setSelectedColumnId(columnId);
    setIsAddTaskOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Kanban Board</h1>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsAddColumnOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Column
          </button>
        </div>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-4">
            <SortableContext items={columns.map(col => col.id)}>
              {columns.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks.filter((task) => task.column_id === column.id)}
                  onAddTask={() => handleAddTask(column.id)}
                />
              ))}
            </SortableContext>
          </div>

          <DragOverlay>
            {activeTask && (
              <TaskCard
                task={tasks.find((task) => task.id === activeTask)!}
                overlay
              />
            )}
          </DragOverlay>
        </DndContext>
      </main>

      <AddColumnDialog
        open={isAddColumnOpen}
        onClose={() => setIsAddColumnOpen(false)}
      />

      <AddTaskDialog
        open={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
        columnId={selectedColumnId}
      />
    </div>
  );
}