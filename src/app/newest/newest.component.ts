import { Component, OnInit, OnDestroy } from '@angular/core';

import { Item } from '../interfaces/Item';
import { ApiService } from '../services/api.service';
import { StateService } from '../services/state.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-newest',
  templateUrl: '../topstories/topstories.component.html',
  styleUrls: ['../topstories/topstories.component.scss']
})
export class NewestComponent implements OnInit, OnDestroy {

  items: Item[] = [];
  refresh$: Subscription;

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
  ) { }

  async ngOnInit() {
    await this.getStories();
    this.refresh$ = this.stateService.getRefresh().subscribe(async res => {
      await this.getStories();
    });
  }

  ngOnDestroy() {
    if (this.refresh$) {
      this.refresh$.unsubscribe();
    }
  }

  async getStories() {
    const res: any = await this.apiService.getNewStoriesBulk();
    this.items = res;
  }
}
