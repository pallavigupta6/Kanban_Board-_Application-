// import React from "react";
// import { useDroppable } from "@dnd-kit/core";
// import { SortableContext } from "@dnd-kit/sortable";
// import { MoreVertical, Plus, Trash2 } from "lucide-react";
// import { Column as ColumnType, Task as TaskType } from "../type";
// import { useBoardStore } from "../store/boardStore";
// import TaskCard from "./TaskCard";

// interface ColumnProps {
//   column: ColumnType;
//   tasks: TaskType[];
//   onAddTask: () => void;
// }

// export default function Column({ column, tasks, onAddTask }: ColumnProps) {
//   const { deleteColumn, updateColumn } = useBoardStore();
//   const [isEditing, setIsEditing] = React.useState(false);
//   const [title, setTitle] = React.useState(column.title);
//   const { setNodeRef } = useDroppable({
//     id: column.id,
//   });

//   const handleDelete = () => {
//     if (window.confirm("Are you sure you want to delete this column?")) {
//       deleteColumn(column.id);
//     }
//   };

//   const handleTitleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (title.trim()) {
//       updateColumn(column.id, title.trim());
//       setIsEditing(false);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       className="flex-shrink-0 w-80 bg-gray-50 rounded-lg shadow-sm"
//     >
//       <div className="p-3 flex items-center justify-between border-b bg-white rounded-t-lg">
//         {isEditing ? (
//           <form onSubmit={handleTitleSubmit} className="flex-1">
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full px-2 py-1 text-sm border rounded"
//               autoFocus
//               onBlur={handleTitleSubmit}
//             />
//           </form>
//         ) : (
//           <h3
//             className="font-medium text-gray-900 cursor-pointer"
//             onClick={() => setIsEditing(true)}
//           >
//             {column.title}
//           </h3>
//         )}

//         <div className="flex items-center gap-2">
//           <button
//             onClick={onAddTask}
//             className="p-1 hover:bg-gray-100 rounded"
//             title="Add task"
//           >
//             <Plus className="w-4 h-4 text-gray-500" />
//           </button>
//           <button
//             onClick={handleDelete}
//             className="p-1 hover:bg-gray-100 rounded"
//             title="Delete column"
//           >
//             <Trash2 className="w-4 h-4 text-gray-500" />
//           </button>
//           <button className="p-1 hover:bg-gray-100 rounded">
//             <MoreVertical className="w-4 h-4 text-gray-500" />
//           </button>
//         </div>
//       </div>

//       <div className="p-2 flex flex-col gap-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
//         <SortableContext items={tasks.map((task) => task.id)}>
//           {tasks.map((task) => (
//             <TaskCard key={task.id} task={task} />
//           ))}
//         </SortableContext>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { MoreVertical, Plus, Trash2 } from "lucide-react";
import { Column as ColumnType, Task as TaskType } from "../type";
import { useBoardStore } from "../store/boardStore";
import TaskCard from "./TaskCard";

interface ColumnProps {
  column: ColumnType;
  tasks: TaskType[];
  onAddTask: () => void;
}

export default function Column({ column, tasks, onAddTask }: ColumnProps) {
  const { deleteColumn, updateColumn, updateTaskTitle } = useBoardStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(column.title);
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this column?")) {
      deleteColumn(column.id);
    }
  };

  const handleTitleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      updateColumn(column.id, title.trim());
      setIsEditing(false);
    }
  };

  const handleTaskTitleUpdate = (taskId: string, newTitle: string) => {
    updateTaskTitle(taskId, newTitle);
  };

  return (
    <div
      ref={setNodeRef}
      className="flex-shrink-0 w-80 bg-gray-50 rounded-lg shadow-sm"
    >
      <div className="p-3 flex items-center justify-between border-b bg-white rounded-t-lg">
        {isEditing ? (
          <form onSubmit={handleTitleSubmit} className="flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-2 py-1 text-sm border rounded"
              autoFocus
              onBlur={handleTitleSubmit}
            />
          </form>
        ) : (
          <h3
            className="font-medium text-gray-900 cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            {column.title}
          </h3>
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={onAddTask}
            className="p-1 hover:bg-gray-100 rounded"
            title="Add task"
          >
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 hover:bg-gray-100 rounded"
            title="Delete column"
          >
            <Trash2 className="w-4 h-4 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-100 rounded">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="p-2 flex flex-col gap-2 max-h-[calc(100vh-12rem)] overflow-y-auto">
        <SortableContext items={tasks.map((task) => task.id)}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={handleTaskTitleUpdate} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
