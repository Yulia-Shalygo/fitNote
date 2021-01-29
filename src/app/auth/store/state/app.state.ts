import { AbonementState } from "src/app/abonements/store/state/abonement.state";
import { TaskState } from "src/app/calend/store/state/task.state";

export interface State {
  user: UserState;
  task: TaskState;
  abonement: AbonementState;
  errorCode: string;
  errorMessage: string;
}

export const authInitialState: UserState = {
   userId: ''
};

export interface UserState {
  userId: string;
}

