import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { getTrainers } from 'src/app/admin-page/store/actions/admin-page.actions';
import { getAllTrainers } from 'src/app/admin-page/store/selectors/admin-page.selectors';
import { User } from 'src/app/auth/store/models/user.model';

@Component({
  selector: 'app-trainer-table',
  templateUrl: './trainer-table.component.html',
  styleUrls: ['./trainer-table.component.css']
})
export class TrainerTableComponent implements OnInit {

  trainers: User[];
  needTrainers: User[];

  private _searchSubject: Subject<string> = new Subject();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getTrainers());

    this.store.select(getAllTrainers).subscribe(trainers => {
      if (trainers) {
        this.trainers = trainers;
        this.needTrainers = trainers;
      } else this.trainers = [];
    });
  }

  public updateSearch(searchTextValue: string): any {
    if (!searchTextValue) {
      this.needTrainers = this.trainers;
    }
    if (!this.trainers) {
      this.needTrainers = [];
    }
    searchTextValue = searchTextValue.toLocaleLowerCase();

    this._searchSubject.next(searchTextValue);
    this.needTrainers = this.trainers.filter(user => user.name.toLocaleLowerCase().includes(searchTextValue));
  }

}
