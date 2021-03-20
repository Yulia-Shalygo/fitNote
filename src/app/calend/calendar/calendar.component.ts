import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DateService } from 'src/app/services/date.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/calend/store/models/task.model';
import { Store } from '@ngrx/store';
import { getUser } from 'src/app/auth/store/actions/auth.actions';
import { addTask, readAllTasks } from '../store/actions/calendar.actions';
import { getTaskByDate, selectUserId } from '../store/selectors/calendar.selectors';
import { Week } from '../store/models/week.model';
import { MomentPipe } from 'src/app/pipes/moment.pipe';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [MomentPipe]
})
export class CalendarComponent implements OnInit {

  constructor(
    public dataService: DateService,
    public taskService: TaskService,
    private store: Store  
  ) { }

  userUID: any;

  calendar: Week[];

  modal: boolean = true;
  flip: boolean = false;
  calendarForm: FormGroup;

  tempTask: Task = {
    description: '',
    date: '',
    user: ''
  };

  ngOnInit(): void {
    this.dataService.date.subscribe(this.calend.bind(this));
    this.calendarForm = new FormGroup({
      description: new FormControl(null,
        [Validators.required])
    });
    this.store.dispatch(getUser());
    this.store.dispatch(readAllTasks());

    this.store.select(selectUserId).subscribe((id) => this.userUID = id);
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

  minusMonth(): void {
    this.dataService.minusMonth();
  }

  plusMonth(): void {
    this.dataService.plusMonth();
  }

  changeModal(day: moment.Moment): void {
    this.modal = true;
    this.flip = true;
    
    this.dataService.changeDate(day);
    this.readTaskForModal(day.format('YYYY-MM-DD'));
  }

  closeModal(): void {
    this.modal = false;
    this.flip = false;

    this.calendarForm.reset();
  }

  submit(): void {
    this.flip = false;
    const { description } = this.calendarForm.value;

    const task: Task = {
      date: this.dataService.date.value.format('YYYY-MM-DD'),
      description,
      user: this.userUID
    };

    // this.taskService.create(task);
    // this.calendarForm.reset();
    // this.modal = false;
    this.store.dispatch(addTask({ task }));
    this.store.dispatch(readAllTasks());

    this.calendarForm.reset();
    this.modal = false;
  }

  readTaskForModal(day: string): void {
    let curtask: Task;
    this.store.select(getTaskByDate(day)).subscribe((task) => curtask = task);

    if (curtask) {
      this.tempTask.description = curtask.description;
      this.tempTask.date = curtask.date;
      this.tempTask.user = curtask.user;
    } else {
      this.tempTask.description = '';
      this.tempTask.date = '';
      this.tempTask.user = '';
    }
  }
}
