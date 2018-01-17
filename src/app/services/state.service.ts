import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class StateService {

  private refresh$ = new Subject<any>();
  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLoading(state: boolean = false) {
    this.isLoading$.next(state);
  }

  isLoading() {
    return this.isLoading$;
  }

  refresh(force: boolean = false) {
    this.refresh$.next(force);
  }

  getRefresh(): Observable<any> {
    return this.refresh$.asObservable();
  }

}
