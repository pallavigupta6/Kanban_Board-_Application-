export interface User {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description?: string;
    due_date?: string;
    column_id: string;
    assigned_to?: string;
    created_by: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface Column {
    id: string;
    title: string;
    order: number;
    created_by: string;
    created_at: string;
    updated_at: string;
  }


