import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@fullcalendar/core';

@Component({
  selector: 'app-dialog-event-edit',
  templateUrl: './dialog-event-edit.component.html',
  styleUrls: ['./dialog-event-edit.component.scss']
})
export class DialogEventEditComponent implements OnInit {
  event: any;
  constructor(public dialogRef: MatDialogRef<DialogEventEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

  ngOnInit() {
    this.event = {
      debut: this.displayDate(this.data.event.start),
      fin: this.displayDate(this.data.event.end),
      hd: this.displayDate(this.data.event.start),
      hf: this.displayDate(this.data.event.start),
    }
  }

  displayDate(jour): String {
    let str = formatDate(jour, {
      month: 'numeric',
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
