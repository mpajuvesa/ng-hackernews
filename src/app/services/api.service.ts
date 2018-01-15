import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Item } from '../interfaces/Item';

import { StateService } from './state.service';
import * as _ from 'lodash';

const API_URL = 'https://hacker-news.firebaseio.com/v0';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private stateService: StateService
  ) { }

  topStories: Item[] = [];
  newStories: Item[] = [];

  topStoriesIds: number[] = [];
  newStoriesIds: number[] = [];

  maxBulkSize = 15;

  async getTopStories() {
    const res: any = await this.http.get(`${API_URL}/topstories.json`).toPromise();
    return res;
  }

  async getNewStories() {
    const res: any = await this.http.get(`${API_URL}/newstories.json`).toPromise();
    return res;
  }

  async getTopStoriesBulk() {
    this.stateService.setLoading(true);
    const topStories: number[] = await this.getTopStories();

    if (_.isEqual(topStories, this.topStoriesIds)) {
      this.stateService.setLoading(false);
      return this.topStories;
    }

    this.topStoriesIds = topStories;

    const storyIds = topStories.slice(0, this.maxBulkSize);
    const res: any = await Promise.all(storyIds.map(id => this.getStoryById(id)));
    this.topStories = res;
    this.stateService.setLoading(false);
    return res;
  }

  async getNewStoriesBulk() {
    this.stateService.setLoading(true);
    const newStories: number[] = await this.getNewStories();

    if (_.isEqual(newStories, this.newStoriesIds)) {
      this.stateService.setLoading(false);
      return this.newStories;
    }

    this.newStoriesIds = newStories;

    const storyIds = newStories.slice(0, this.maxBulkSize);
    const res: any = await Promise.all(storyIds.map(id => this.getStoryById(id)));
    this.newStories = res;
    this.stateService.setLoading(false);
    return res;
  }

  async getStoryById(id: number) {
    const res = await this.http.get(`${API_URL}/item/${id}.json`).toPromise();
    return res;
  }
}
