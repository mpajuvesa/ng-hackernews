import { Component, OnInit, OnDestroy } from '@angular/core';

import Item from '../interfaces/Item';
import { ApiService } from '../services/api.service';
import { StateService } from '../services/state.service';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit, OnDestroy {

  items: Item[] = [];
  refresh$: Subscription;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
  ) { }

  async ngOnInit() {
    await this.getItems();
    this.refresh$ = this.stateService.getRefresh().subscribe(async res => {
      await this.getItems(res);
    });
  }

  ngOnDestroy() {
    if (this.refresh$) {
      this.refresh$.unsubscribe();
    }
  }

  async getItems(force: boolean = false) {
    const res: any = await this.apiService.getItemsByType('jobstories', force);
    this.items = res;
  }

}
