import { Observable, of } from 'rxjs';
import { User } from './../models';

export class AuthService {

  constructor() {}

  isAuthorized(): boolean {
      return localStorage.getItem('loggedInUser') !== null;
  }

  login(user) {
      const data = new Observable((observer) => {
          let users = this.getUsers();
          users.subscribe(data => {
              data.map(el => {
                  if (el.email === user.email && el.password === user.password) {
                      localStorage.setItem('loggedInUser', JSON.stringify(user));
                      setTimeout(() => {
                          observer.next(data);
                          observer.complete();
                      }, 600);
                  }
              })
          });
          setTimeout(() => {
              observer.error(`Wrong Email or Password!!`);
              observer.complete();
          }, 600);
          return {
              unsubscribe() {}
          };
      });
      return data;
  }

  register(user: User) {
      const data = new Observable((observer) => {
          // Get the next and error callbacks. These will be passed in when
          // the consumer subscribes.
          let users = this.getUsers();
          users.subscribe(data => {
              data.push(user);
              localStorage.setItem('users', JSON.stringify(data));
          });
          setTimeout(() => {
              observer.next(data);
              observer.complete();
          }, 600);
          return {
              unsubscribe() {}
          };
      });
      return data;
  }

  getUsers(): Observable < User[] > {
      const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
      // console.log(users);
      return of(users);
  }

  logout() {
      localStorage.removeItem('loggedInUser');
  }
}