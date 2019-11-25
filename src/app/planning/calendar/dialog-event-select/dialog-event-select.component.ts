import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { formatDate } from '@fullcalendar/core'

@Component({
  selector: 'app-dialog-event-select',
  templateUrl: './dialog-event-select.component.html',
  styleUrls: ['./dialog-event-select.component.scss']
})
export class DialogEventSelectComponent  {
  
  constructor(public dialogRef: MatDialogRef<DialogEventSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data){}

    onNoClick(): void {
      this.dialogRef.close();
    }

    displayDate(jour): String {
      let str = formatDate(jour, {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
        timeZone: 'local',
        locale: 'fr'
      })
      return str
    }

    displayHeure(jour): String {
      let str = formatDate(jour, {
        hour: 'numeric',
        minute: 'numeric',
        locale: 'fr'
      })
      return str
    }

}

