import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AbonementService {

  costOfDay: number = 5;

  constructor() { }

  createAbonement() {

  }

  getCost(days: number): number {
    return this.costOfDay * days;
  }
  
}
