import { Task } from "../models/task.model";

export const tasksInitialState: TaskState = {
    tasks: []
  };

  export interface TaskState {
    tasks: Task[];
  }