import { Task } from './interface/task.interface';

export interface AppState {
  readonly tasks: Array<Task>;
}
