export interface ITodo {
  title: string;
  description: string;
  completed?: boolean;
  userId: string;
}

export interface ITodoDocument extends ITodo {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUpdateTodoRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}