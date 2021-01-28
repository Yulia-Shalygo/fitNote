import { TaskState } from "src/app/calend/store/state/task.state";

export interface State {
  user: UserState;
  task: TaskState;
  errorCode: string;
  errorMessage: string;
}

export const authInitialState: UserState = {
   userId: ''
};

export interface UserState {
  userId: string;
}

