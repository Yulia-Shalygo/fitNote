import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { User } from 'src/app/auth/store/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { getUsers } from '../store/actions/abonement.actions';
import { getUsersSelector } from '../store/selectors/abonement.selectors';

@Component({
  selector: 'app-abonement-page',
  templateUrl: './abonement-page.component.html',
  styleUrls: ['./abonement-page.component.css']
})
export class AbonementPageComponent implements OnInit {
  
  users: User[];
  private _searchSubject: Subject<string> = new Subject();

  needUsers: User[];

  constructor(
    private firebaseService: FirebaseService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getUsers());
    this.store.select(getUsersSelector).subscribe(users => {
      this.users = users;
      this.needUsers = users;
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
