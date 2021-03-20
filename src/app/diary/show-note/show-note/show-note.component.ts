import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/auth/store/actions/auth.actions';
import { DiaryService } from 'src/app/services/diary.service';
import { getAllNotes, getBodies, getExercises } from '../../store/actions/diary.actions';
import { Note } from '../../store/models/note.model';
import { getNotesByDateSelector } from '../../store/selectors/diary.selectors';

@Component({
  selector: 'app-show-note',
  templateUrl: './show-note.component.html',
  styleUrls: ['./show-note.component.css']
})
export class ShowNoteComponent implements OnInit {

  date: any;
  notes: Note[];
  
  selectedNote: Note = {
    exercise: {
      name: '',
      description: '',
      body: null,
      comment: ''
    },
    date: null,
    firstRepeated: null
  };

  isEdit: boolean = false;

  constructor(
    private store: Store,
    private activationRoute: ActivatedRoute,
    private diaryService: DiaryService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.store.dispatch(getBodies());
    this.store.dispatch(getExercises());
    this.store.dispatch(getAllNotes());

    this.activationRoute.params.subscribe(date => {
      this.date = date.date;
      this.updateNotes();
      
      // this.store.select(getNotesByDateSelector(this.date)).subscribe(notes => {
      //   console.log(notes);        

      // })
      // this.store.select(getExercisesByBodyId(bodyId.id)).subscribe(body => console.log(body));
    });

  }

  editNote(note): void {
    console.log(note);
  }

  remove(note: Note) {
    console.log('note: ', note);
    this.diaryService.removeNote(note);
    this.updateNotes();
  }

  updateNotes(): void {
    this.diaryService.getAllNotesByDate(this.date).then(item => {
      this.notes = item;
    });
  }

}
