import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getErrorString(errorCode: string): string {
    switch (errorCode) {
      case 'auth/too-many-requests': return 'Слишком много запросов.';
      case 'auth/wrong-password': return 'Неправильный пароль.';
      case 'auth/user-not-found': return 'Пользователь не найден.';
      case 'auth/email-already-in-use': return 'Профиль с таким e-mail уже существует.';
      default: return 'Something wrong happened.'
    }
  }
}
