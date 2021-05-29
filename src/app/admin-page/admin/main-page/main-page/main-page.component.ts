import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',

  template: `
    <app-main-page-header></app-main-page-header>
      <div class="section">
          <td class="little btn_lit" routerLink = 'create-admin'>
              <span class="btn_text">+</span>
          </td>
          <app-admins-table></app-admins-table>
      </div>
    <router-outlet></router-outlet>
  `,

  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {

  constructor(
   
  ) { }

}
