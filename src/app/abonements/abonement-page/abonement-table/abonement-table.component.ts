import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { User } from 'src/app/auth/store/models/user.model';
import { AbonementService } from 'src/app/services/abonement.service';
import { getShapes, getUsers } from '../../store/actions/abonement.actions';
import { Abonement } from '../../store/models/abonement.model';
import { getAllShapes, getUsersSelector } from '../../store/selectors/abonement.selectors';

@Component({
  selector: 'app-abonement-table',
  templateUrl: './abonement-table.component.html',
  styleUrls: ['./abonement-table.component.css']
})
export class AbonementTableComponent implements OnInit {

  users: User[];
  private _searchSubject: Subject<string> = new Subject();

  needUsers: User[];
  finish: boolean = false;

  constructor(
    private store: Store,
    private abonementService: AbonementService
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.store.dispatch(getShapes());

    this.selectAllUsers();    
  }

  selectAllUsers(): void {
    this.store.select(getUsersSelector).subscribe(users => {
      this.store.select(getAllShapes).subscribe(shapes => {
        let arr = [];

        users.map((user) => {
          if (shapes) {
            shapes.map((shape) => { 
              if (shape) {
                if (user.abonement) {
                  if (user.abonement.shape === shape.id) {
                    let temp = {...user, ...shape};
                    arr.push(temp);
                  }
                } 
              }
            });
          } 
        });

        if (users) {
          this.users = arr;
          this.needUsers = arr;
        } else this.users = [];
      })
    });
  }

  public updateSearch(searchTextValue: string): any {
    if (!searchTextValue) {
      this.needUsers = this.users;
    }
    if (!this.users) {
      this.needUsers = [];
    }
    searchTextValue = searchTextValue.toLocaleLowerCase();

    this._searchSubject.next(searchTextValue);
    this.needUsers = this.users.filter(user => user.name.toLocaleLowerCase().includes(searchTextValue));
  }

  changeDays(abonement: Abonement) {
    if (abonement.days.valueOf() < 0) {
      this.finish = true;
    }
    this.abonementService.changeDays(abonement);
  }
}
