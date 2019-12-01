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

  eventForm: FormGroup;
  myEvent:any = {
    agent:'afrd',
    debut:'',
    fin:'',
    dh:'',
    fh:''
  }
  constructor(public dialogRef: MatDialogRef<DialogEventEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private formBuilder: FormBuilder) { }

    onNoClick(): void {
      this.dialogRef.close();
    }


    ngOnInit(){
      console.log(this.data.event.id);
      this.myEvent.debut = this.data.event.start.toISOString().split('T',2)[0];
      this.myEvent.fin = this.data.event.end.toISOString().split('T',2)[0];
      this.myEvent.dh = this.displayHeure(this.data.event.start);
      this.myEvent.fh = this.displayHeure(this.data.event.end);
      console.log(this.myEvent.debut);
      
      this.initForm();
     
    }


    initForm(){
      this.eventForm = this.formBuilder.group({
        agent: [''],
        debut: [''],
        fin: [''],
        dh:[''],
        fh:['']
      })
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
