import {Component, Inject, OnInit} from '@angular/core';
import {Task} from '../../Models/Task';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TaskDialogData} from '../../Models/TaskDialogData';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  private backupTask: Partial<Task> = { ...this.data.task };

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
  ) {}

  cancel(): void {
    this.data.task.name = this.backupTask.name;
    this.data.task.description = this.backupTask.description;
    this.dialogRef.close(this.data);
  }
}
