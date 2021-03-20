import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/auth/store/actions/auth.actions';
import { getAllNotes } from 'src/app/diary/store/actions/diary.actions';
import { Exercise } from 'src/app/diary/store/models/exercise.model';
import { Note } from 'src/app/diary/store/models/note.model';
import { DiaryService } from 'src/app/services/diary.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.css']
})
export class EditNoteComponent implements OnInit {

  currNote: Note = {
    exercise: {
      name: '',
      description: '',
      body: null,
      comment: ''
    },
    date: null,
    firstRepeated: null
  };

  noteForm: FormGroup;
  date: string;
  exerciseId: number;

  // currNote: any;

  constructor(
    private store: Store,
    private activationRoute: ActivatedRoute,
    private diaryService: DiaryService,
    private route: Router,
    private firebaseService: FirebaseService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.store.dispatch(getAllNotes());

    this.activationRoute.params.subscribe(params => {
      this.date = params.date;
      this.exerciseId = params.id;
      this.diaryService.getAllNotesByDate(params.date).then(notes => {
        this.currNote = notes.find(note => note.exercise.id == params.id);
      });    
    });

    this.noteForm = new FormGroup({
      firstWeigth: new FormControl(null),
      secondWeigth: new FormControl(null),
      thirdWeigth: new FormControl(null),
      fourthWeigth: new FormControl(null),
      fifthWeigth: new FormControl(null),

      firstRepeated: new FormControl(null),
      secondRepeated: new FormControl(null),
      thirdRepeated: new FormControl(null),
      fourthRepeated: new FormControl(null),
      fifthRepeated: new FormControl(null)
    });
  }

  update(): void {
    this.firebaseService.updatePassword();
  }
  back(): void {
    this.route.navigate([`/diary/exercises-calendar/note/${this.date}`]);
  }

  save(): void {
    const { firstWeigth, secondWeigth, thirdWeigth, fourthWeigth, fifthWeigth, firstRepeated, secondRepeated, thirdRepeated, fourthRepeated, fifthRepeated } = this.noteForm.value;

    const note: Note = {
      date: this.date,
      firstWeigth,
      secondWeigth,
      thirdWeigth,
      fourthWeigth,
      fifthWeigth,
      firstRepeated,
      secondRepeated,
      thirdRepeated,
      fourthRepeated,
      fifthRepeated
    };
    this.diaryService.updateNote(note, this.exerciseId);

    this.back();
  }

}
