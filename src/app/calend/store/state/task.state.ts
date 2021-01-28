import { Task } from "../models/task";

export const tasksInitialState: TaskState = {
    tasks: []
  };

  export interface TaskState {
    tasks: Task[];
  }