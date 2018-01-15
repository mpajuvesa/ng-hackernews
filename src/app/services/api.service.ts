import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from '../interfaces/Item';

import { StateService } from './state.service';

const API_URL = 'https://hacker-news.firebaseio.com/v0';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private stateService: StateService
  ) { }

  topStories: number[] = [];

  maxBulkSize = 15;

  async getTopStories() {
    const res: any = await this.http.get(`${API_URL}/topstories.json`).toPromise();
    this.topStories = res;
    return res;
  }

  async getStoriesBulk() {
    this.stateService.setLoading(true);
    const topStories: number[] = await this.getTopStories();
    const top = topStories.slice(0, this.maxBulkSize);
    const res = await Promise.all(top.map(id => this.getStoryById(id)));
    this.stateService.setLoading(false);
    return res;
  }

  async getStoryById(id: number) {
    const res = await this.http.get(`${API_URL}/item/${id}.json`).toPromise();
    return res;
  }
}
