import { TaskModel } from '../../interface/task.interface';

export const TaskState: TaskModel = {
  list: [],
  errorMessage: '',
  taskObj: {
    completed: false,
    date: new Date(),
    id: 0,
    name: '',
    persons: [],
  },
};
