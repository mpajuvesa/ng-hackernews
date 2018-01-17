import { Component, OnInit, OnDestroy } from '@angular/core';

import { StateService } from '../services/state.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private stateService: StateService) { }

  isLoading = true;
  isLoading$: Subscription;

  ngOnInit() {
    this.isLoading$ = this.stateService.isLoading().subscribe(state => {
      this.isLoading = state;
    });
  }

  ngOnDestroy() {
    this.isLoading$.unsubscribe();
  }

  refresh() {
    this.stateService.refresh(true);
  }

}
