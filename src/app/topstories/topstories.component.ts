import { Component, OnInit } from '@angular/core';

import { Item } from '../interfaces/Item';
import { ApiService } from '../services/api.service';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-topstories',
  templateUrl: './topstories.component.html',
  styleUrls: ['./topstories.component.scss']
})
export class TopstoriesComponent implements OnInit {

  topstories: Item[] = [];

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
  ) { }

  async ngOnInit() {
    await this.getTopStories();
    this.stateService.getRefresh().subscribe(async res => {
      await this.getTopStories();
    });
  }

  async getTopStories() {
    const res: any = await this.apiService.getStoriesBulk();
    this.topstories = res;
  }

}
