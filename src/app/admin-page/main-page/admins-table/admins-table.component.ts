import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { User } from 'src/app/auth/store/models/user.model';
import { getAdmins } from '../../store/actions/admin-page.actions';
import { getAllAdmins } from '../../store/selectors/admin-page.selectors';

@Component({
  selector: 'app-admins-table',
  templateUrl: './admins-table.component.html',
  styleUrls: ['./admins-table.component.css']
})
export class AdminsTableComponent implements OnInit {

  admins: User[];
  needAdmins: User[];

  private _searchSubject: Subject<string> = new Subject();

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.store.dispatch(getAdmins());
    
    this.store.select(getAllAdmins).subscribe(admins => {
      if(admins) {
        this.admins = admins;
        this.needAdmins = admins;
      } else this.admins = [];
    });
  }

  public updateSearch(searchTextValue: string): any {
    if (!searchTextValue) {
      this.needAdmins = this.admins;
    }
    if (!this.admins) {
      this.needAdmins = [];
    }
    searchTextValue = searchTextValue.toLocaleLowerCase();

    this._searchSubject.next(searchTextValue);
    this.needAdmins = this.admins.filter(user => user.name.toLocaleLowerCase().includes(searchTextValue));
  }

}
