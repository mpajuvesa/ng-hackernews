import { Component, OnInit } from '@angular/core';

import { Item } from '../interfaces/Item';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-topstories',
  templateUrl: './topstories.component.html',
  styleUrls: ['./topstories.component.scss']
})
export class TopstoriesComponent implements OnInit {

  topstories: Item[] = [];

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    await this.getTopStories();
  }

  async getTopStories() {
    const res: any = await this.apiService.getStoriesBulk();
    this.topstories = res;
  }

}
