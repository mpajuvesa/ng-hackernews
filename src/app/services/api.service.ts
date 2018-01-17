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

  maxBulkSize = 15;

  cache = {};

  async fetch(url: string): Promise<any> {
    return this.http.get(`${API_URL}/${url}`).toPromise();
  }

  /**
   * Fetches items by supplied type
   * @param type topstories, newstories
   * @param forceRefresh Force refresh
   */
  async getItemsByType(type: string, forceRefresh: boolean = false) {
    this.stateService.setLoading(true);

    // Fetch latest item ids
    const latestIds: number[] = await this.fetch(`${type}.json`);
    // Fetch max bulk size amount of items
    const res = await this.fetchItems(type, latestIds.slice(0, this.maxBulkSize), forceRefresh);

    this.stateService.setLoading(false);
    return res;
  }

  /**
   * Fetches items in bulk
   * @param type
   * @param ids
   */
  async getBulk(type: string, ids: number[]) {
    const res: any[] = await Promise.all(ids.map(id => this.fetch(`item/${id}.json`)));
    return res;
  }

  /**
   * Fetches itemsby supplied type and ids
   * @param type
   * @param latestIds
   */
  async fetchItems(type: string, latestIds: number[], forceRefresh: boolean = false) {
    const cacheIds: number[] = _.get(this.cache, `${type}.ids`, []);
    const cacheValues: number[] = _.get(this.cache, `${type}.values`, []);

    // Compare latest and cached ids
    // If they do not match then we want to fetch new items
    if (!_.isEqual(latestIds, cacheIds) || forceRefresh) {
      const values = await this.getBulk(type, latestIds);
      _.set(this.cache, `${type}.ids`, latestIds);
      _.set(this.cache, `${type}.values`, values);
      return values;
    }

    return cacheValues;
  }
}
