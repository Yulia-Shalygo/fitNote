import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.css']
})
export class CreateNoteComponent implements OnInit {

  constructor() { }
  range: FormGroup;

  ngOnInit(): void {
    this.range = new FormGroup({
      start: new FormControl(null,)
    })
  }

  getDate(date: any) {
   console.log(date)
  }
}
