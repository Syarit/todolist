import { Task } from './Task';

export interface TaskDialogData {
  task: Partial<Task>;
  enableDelete: boolean;
}
