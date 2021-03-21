import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  isAccount: boolean = false;
  isPassword: boolean = false;

  userName: string = '';
  userEmail: string = '';
  userPhone: string = '';

  active: boolean = false;

  constructor(
    private settingsService: SettingsService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.settingsService.getUserName().then(name => this.userName = name);
    this.userEmail = this.settingsService.getUserEmail();
    this.settingsService.getUserPhone().then(phone => this.userPhone = phone);
  }

  account(): void {
    this.active = true;
    this.isAccount = true;
    this.isPassword = false;
  }

  password(): void {
    this.active = true;
    this.isPassword = true;
    this.isAccount = false;
  }

  send(): void {
    this.firebaseService.updatePassword();
  }

}
