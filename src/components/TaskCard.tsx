// import React from 'react';
// import { useDraggable } from '@dnd-kit/core';
// import { CSS } from '@dnd-kit/utilities';
// import { format } from 'date-fns';
// import { Calendar, User } from 'lucide-react';
// import { Task } from '../types';
// import { useBoardStore } from '../store/boardStore';

// interface TaskCardProps {
//   task: Task;
//   overlay?: boolean;
// }

// export default function TaskCard({ task, overlay }: TaskCardProps) {
//   const { attributes, listeners, setNodeRef, transform } = useDraggable({
//     id: task.id,
//   });
//   const { deleteTask } = useBoardStore();
//   const style = transform ? {
//     transform: CSS.Translate.toString(transform),
//   } : undefined;

//   const handleDelete = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (window.confirm('Are you sure you want to delete this task?')) {
//       deleteTask(task.id);
//     }
//   };

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className={`
//         bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-move
//         ${overlay ? 'shadow-lg' : 'hover:shadow-md transition-shadow'}
//       `}
//     >
//       <div className="flex justify-between items-start mb-2">
//         <h4 className="font-medium text-gray-900">{task.title}</h4>
//         {!overlay && (
//           <button
//             onClick={handleDelete}
//             className="text-gray-400 hover:text-red-500"
//           >
//             ×
//           </button>
//         )}
//       </div>
      
//       {task.description && (
//         <p className="text-sm text-gray-600 mb-3">{task.description}</p>
//       )}
      
//       <div className="flex items-center justify-between text-sm text-gray-500">
//         {task.due_date && (
//           <div className="flex items-center gap-1">
//             <Calendar className="w-4 h-4" />
//             <span>{format(new Date(task.due_date), 'MMM d')}</span>
//           </div>
//         )}
        
//         {task.assigned_to && (
//           <div className="flex items-center gap-1">
//             <User className="w-4 h-4" />
//             <span>Assigned</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { format } from 'date-fns';
import { Calendar, User } from 'lucide-react';
import { Task } from '../type';
import { useBoardStore } from '../store/boardStore';

interface TaskCardProps {
  task: Task;
  overlay?: boolean;
}

export default function TaskCard({ task, overlay }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const { deleteTask, updateTask } = useBoardStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });

  const style = transform ? {
    transform: CSS.Translate.toString(transform),
  } : undefined;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  const handleEdit = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = () => {
    updateTask(task.id, editedTask);
    setIsEditing(false);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-move
        ${overlay ? 'shadow-lg' : 'hover:shadow-md transition-shadow'}
      `}
    >
      {isEditing ? (
        <div>
          <input
            name="title"
            value={editedTask.title}
            onChange={handleEdit}
            className="w-full border rounded px-2 py-1 mb-2"
            placeholder="Task title"
          />
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleEdit}
            className="w-full border rounded px-2 py-1 mb-2"
            placeholder="Task description"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={saveEdit}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-gray-900">{task.title}</h4>
            {!overlay && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-gray-400 hover:text-blue-500"
                >
                  ✎
                </button>
                <button
                  onClick={handleDelete}
                  className="text-gray-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          {task.description && (
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
          )}

          <div className="flex items-center justify-between text-sm text-gray-500">
            {task.due_date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{format(new Date(task.due_date), 'MMM d')}</span>
              </div>
            )}

            {task.assigned_to && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>Assigned</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
