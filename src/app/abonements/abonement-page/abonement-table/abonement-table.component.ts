import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { User } from 'src/app/auth/store/models/user.model';
import { getShapes, getUsers } from '../../store/actions/abonement.actions';
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

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.store.dispatch(getShapes());

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

}
