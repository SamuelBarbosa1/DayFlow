export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: Priority;
  dueDate?: string; // ISO string
  listId: string;
  createdAt: string;
  updatedAt: string;
}

export interface List {
  id: string;
  name: string;
  color: string;
  icon?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  content: string; // A primeira linha pode ser considerada o título.
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AppState {
  tasks: Task[];
  lists: List[];
  notes: Note[];

  // Task Ações de observação
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'isCompleted'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
  moveTask: (taskId: string, newListId: string) => void;

  // List Ações de observação
  addList: (list: Omit<List, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateList: (id: string, updates: Partial<List>) => void;
  deleteList: (id: string) => void;

  // Note Ações de observação
  addNote: (content: string, color?: string) => void;
  updateNote: (id: string, content: string, color?: string) => void;
  deleteNote: (id: string) => void;
}
