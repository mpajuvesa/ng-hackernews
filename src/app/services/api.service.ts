import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from '../interfaces/Item';

const API_URL = 'https://hacker-news.firebaseio.com/v0';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) { }

  topStories: number[] = [];

  maxBulkSize = 15;

  async getTopStories() {
    const res: any = await this.http.get(`${API_URL}/topstories.json`).toPromise();
    this.topStories = res;
    return res;
  }

  async getStoriesBulk() {
    const topStories: number[] = await this.getTopStories();
    const top = topStories.slice(0, this.maxBulkSize);
    const res = await Promise.all(top.map(id => this.getStoryById(id)));
    return res;
  }

  async getStoryById(id: number) {
    const res = await this.http.get(`${API_URL}/item/${id}.json`).toPromise();
    return res;
  }
}
