import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { Task } from '../calend/store/models/task.model';

import { DateService } from './date.service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  static url: string = 'https://fitnote-ad140-default-rtdb.firebaseio.com/users';

  constructor(
    public dataService: DateService,
  ) { }

  create(task: Task): any { 
    return firebase.database().ref(`club/users/${task.user}/tasks/${task.date}`).set(task);
  }

  async readAll(userId: string): Promise<Task[]> {
    const snapshot = await firebase.database().ref(`club/users/${userId}/tasks`).once('value');
    return Object.values(snapshot.val() || {});
  }
}
