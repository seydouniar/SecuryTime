import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@fullcalendar/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-event-edit',
  templateUrl: './dialog-event-edit.component.html',
  styleUrls: ['./dialog-event-edit.component.scss']
})
export class DialogEventEditComponent implements OnInit{

 
  myEvent:any = {
    agent:'afrd',
    debut:'',
    fin:'',
    dh:'',
    fh:''
  }
  constructor(public dialogRef: MatDialogRef<DialogEventEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

    onNoClick(): void {
      this.dialogRef.close();
    }


    ngOnInit(){
      console.log(this.displayDate(this.data.event.start));
      this.myEvent.debut = this.displayDate(this.data.event.start)
      this.myEvent.fin = this.displayDate(this.data.event.end)
      this.myEvent.dh = this.displayHeure(this.data.event.start)
      this.myEvent.fh = this.displayHeure(this.data.event.end)
     
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
