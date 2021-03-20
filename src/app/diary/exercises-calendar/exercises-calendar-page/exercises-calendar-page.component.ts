import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DateService } from 'src/app/services/date.service';
import { TaskService } from 'src/app/services/task.service';
import * as moment from 'moment';
import { Week } from 'src/app/calend/store/models/week.model';
import { MomentPipe } from 'src/app/pipes/moment.pipe';
import { DiaryService } from 'src/app/services/diary.service';
import { Note } from '../../store/models/note.model';
import { getNotesSelector } from '../../store/selectors/diary.selectors';
import { getUser } from 'src/app/auth/store/actions/auth.actions';
import { getAllNotes, getBodies, getExercises } from '../../store/actions/diary.actions';

@Component({
  selector: 'app-exercises-calendar-page',
  templateUrl: './exercises-calendar-page.component.html',
  styleUrls: ['./exercises-calendar-page.component.css'],
  providers: [MomentPipe]
})
export class ExercisesCalendarPageComponent implements OnInit {

  selectedNotes: Set<Note> = new Set();
  currNotes: any;

  constructor(
    public dataService: DateService,
    public taskService: TaskService,
    public diaryService: DiaryService,
    private store: Store
  ) { }

  userUID: any;

  calendar: Week[];
  date: any;

  notes: any;

  ngOnInit(): void {
    this.store.dispatch(getUser());
    this.store.dispatch(getAllNotes());
    
    this.dataService.date.subscribe(this.calend.bind(this));
    this.date = this.dataService.date;
    
    this.diaryService.getAllNotes().then(items => {
      this.notes = [[(items[2])][0]];
      console.log(this.notes);
    });
    
    this.store.dispatch(getExercises());
    this.store.dispatch(getBodies());
  }

  // removeTraining(note: any) {
  //   console.log(note);
  // }
  minusMonth(): void {
    this.dataService.minusMonth();
  }

  plusMonth(): void {
    this.dataService.plusMonth();
  }

  calend(curDate: moment.Moment): void {
    let calendar: any = [];

    const start: moment.Moment = curDate.clone().startOf('month').startOf('week');
    const end: moment.Moment = curDate.clone().endOf('month').endOf('week');
    const date: moment.Moment = start.clone().subtract(0, 'day');
    
    while (date.isBefore(end, 'day')) {
      calendar.push({
          days: Array(7).fill(0).map(() =>  {
            const value = date.add(1, 'day').clone();
            const active = moment().isSame(value, 'date');
            const selected = curDate.isSame(value, 'date');
            const disable = !curDate.isSame(value, 'month');

            return { value, active, selected, disable };
          })         
      });
    }
    this.calendar = calendar;
  }

}
