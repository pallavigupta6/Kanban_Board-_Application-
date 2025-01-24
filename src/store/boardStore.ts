import { create } from 'zustand';
import { Column, Task } from '../type';

interface BoardState {
  columns: Column[];
  tasks: Task[];
  loading: boolean;
  fetchBoard: () => Promise<void>;
  addColumn: (title: string) => Promise<void>;
  updateColumn: (id: string, title: string) => Promise<void>;
  deleteColumn: (id: string) => Promise<void>;
  addTask: (columnId: string, task: Partial<Task>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, toColumnId: string) => Promise<void>;
}


export const useBoardStore = create<BoardState>((set, get) => ({
  columns: [],
  tasks: [],
  loading: false,
  fetchBoard: async () => {
    // Initialize with some default columns
    set({
      columns: [
        { id: '1', title: 'To Do', order: 0, created_by: '', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '2', title: 'In Progress', order: 1, created_by: '', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
        { id: '3', title: 'Done', order: 2, created_by: '', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      ],
      loading: false,
    });
  },
  addColumn: async (title) => {
    const columns = get().columns;
    const newColumn: Column = {
      id: crypto.randomUUID(),
      title,
      order: columns.length,
      created_by: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    set({ columns: [...columns, newColumn] });
  },
  updateTask: async (taskId, updates) => {
    set((state) => {
      const updatedTasks = state.tasks.map((t) =>
        t.id === taskId ? { ...t, ...updates } : t
      );
      return { ...state, tasks: updatedTasks };
    });
  },
  
  updateColumn: async (id, title) => {
    set({
      columns: get().columns.map((col) =>
        col.id === id ? { ...col, title, updated_at: new Date().toISOString() } : col
      ),
    });
  },
  deleteColumn: async (id) => {
    set({
      columns: get().columns.filter((col) => col.id !== id),
      tasks: get().tasks.filter((task) => task.column_id !== id),
    });
  },
  addTask: async (columnId, task) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: task.title || '',
      description: task.description,
      due_date: task.due_date,
      column_id: columnId,
      assigned_to: task.assigned_to,
      created_by: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    set({ tasks: [...get().tasks, newTask] });
  },
  updateTask: async (id, updates) => {
    set({
      tasks: get().tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updated_at: new Date().toISOString() }
          : task
      ),
    });
  },
  deleteTask: async (id) => {
    set({ tasks: get().tasks.filter((task) => task.id !== id) });
  },
  moveTask: async (taskId, toColumnId) => {
    set({
      tasks: get().tasks.map((task) =>
        task.id === taskId
          ? { ...task, column_id: toColumnId, updated_at: new Date().toISOString() }
          : task
      ),
    });
  },
}));