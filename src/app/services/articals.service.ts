import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Artical } from './../models';


export class ArticalsService {
  index: number;

  constructor() {}

  getArticals() {
      const articals = localStorage.getItem('articals') ? JSON.parse(localStorage.getItem('articals')) : [];
      return of(articals);
  }

  addArtical(artical: Artical) {
      const data = new Observable((observer) => {
          // Get the next and error callbacks. These will be passed in when
          // the consumer subscribes.
          let articals = this.getArticals();
          articals.subscribe(data => {
              data.push(artical);
              localStorage.setItem('articals', JSON.stringify(data));
          });
          setTimeout(() => {
              observer.next(data);
              observer.complete();
          }, 600);

          observer.complete();
          return {
              unsubscribe() {}
          };
      });
      return data;
  }

  removeArtical(artical: Artical) {
      const data = new Observable((observer) => {
          let articals = this.getArticals();
          articals.subscribe(data => {
              let index;
              data.forEach((el, i) => {
                  if (el.title === artical.title && el.content === artical.content) {
                      index = i;
                  }
              });
              if (index !== undefined) {
                  data.splice(index, 1);
                  localStorage.setItem('articals', JSON.stringify(data));
                  setTimeout(() => {
                      observer.next('Deleted Successfully !!!');
                      observer.complete();
                  }, 600);
              } else {
                  setTimeout(() => {
                      observer.error('Unable to delete artical');
                      observer.complete();
                  }, 600);
              }
              setTimeout(() => {
                  observer.next(data);
                  observer.complete();
              }, 600);
              return {
                  unsubscribe() {}
              };
          });
      })
      return data;
  }

  editArtical(updatedArtical: Artical) {
      let index = this.getArticalIndex();
      const data = new Observable((observer) => {
          let articals = this.getArticals();
          articals.subscribe(data => {
              console.log(index)
              if (index !== undefined) {
                  data.splice(index, 1, updatedArtical);
                  localStorage.setItem('articals', JSON.stringify(data));
                  setTimeout(() => {
                      observer.next('Updated Artical Successfully !!!');
                      observer.complete();
                  }, 600);
              } else {
                  setTimeout(() => {
                      observer.error('Unable to update artical');
                      observer.complete();
                  }, 600);
              }
              // setTimeout(() => {
              //     observer.next(data);
              //     observer.complete();
              // }, 600);
              return {
                  unsubscribe() {}
              };
          });
      })
      return data;
  }

  setArticalIndex(i: number) {
      this.index = i;
  }

  getArticalIndex(): number {
      return this.index;
  }
}