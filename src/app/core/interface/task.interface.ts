import { Person } from './person.interface';

export interface Task {
  id: number;
  name: string;
  date: Date;
  completed: boolean;
  persons: Person[];
}
