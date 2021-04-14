import { Task } from './Task';

export interface TaskDialogResult {
  task: Task;
  delete?: boolean;
}
