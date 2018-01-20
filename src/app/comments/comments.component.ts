import { Component, OnInit, OnDestroy } from '@angular/core';

import Item from '../interfaces/Item';
import { ApiService } from '../services/api.service';
import { StateService } from '../services/state.service';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, OnDestroy {

  refresh$: Subscription;
  maxBulkSize: number;

  items: Item[] = [];

  constructor(
    private apiService: ApiService,
    private stateService: StateService,
  ) {
    this.maxBulkSize = this.apiService.maxBulkSize;
  }

  async ngOnInit() {
    await this.getItems();
    this.refresh$ = this.stateService.getRefresh().subscribe(async res => {
      await this.getItems();
    });
  }

  ngOnDestroy() {
    if (this.refresh$) {
      this.refresh$.unsubscribe();
    }
  }

  async getItems() {
    this.comments();
  }

  async comments() {
    // Get first item id
    const wantedId: number = this.items[0] ? this.items[0].id + 1 : undefined;
    console.log(wantedId)

    // No comments fetch all
    if (!wantedId) {
      await this.fetchAll();
    } else {
      await this.fetchNew(wantedId);
    }
  }

  async fetchNew(wantedId: number) {
    const newestId: number = await this.apiService.fetch('maxitem.json');
    let currId = newestId;
    while (currId >= wantedId) {
      console.log({ wantedId, currId })
      const res: Item = await this.apiService.fetch(`item/${currId}.json`);
      if (res.type === 'comment') {
        this.items.unshift(res);
      }
      currId--;
    }
  }

  async fetchAll() {
    const newestId: number = await this.apiService.fetch('maxitem.json');
    let currId = newestId;
    while (this.items.length < this.maxBulkSize) {
      const res: Item = await this.apiService.fetch(`item/${currId}.json`);
      if (res.type === 'comment') {
        this.items.push(res);
      }
      currId--;
    }
  }

  async newestId() {
    const id: number = await this.apiService.fetch('maxitem.json');
    return id;
  }

  // async getItems() {
  //   let comments: Item[] = [];
  //   const newestId: number = await this.apiService.fetch('maxitem.json');

  //   const firstComment: Item = _.get(this.items, [0]);
  //   console.log(firstComment);

  //   // If we do not have comments or comment is older
  //   if (!firstComment || firstComment.id < newestId) {
  //     let currId: number = newestId;

  //     // First time fetching comments -> fetch all
  //     if (this.items.length <= 0) {
  //       while (comments.length <= this.maxBulkSize) {
  //         const res: Item = await this.apiService.fetch(`item/${currId}.json`);
  //         if (res.type === 'comment') {
  //           comments.push(res);
  //         }
  //         --currId;
  //       }
  //     } else {
  //       const first: Item = _.get(this.items, [0]);
  //       while (currId > first.id) {
  //         const res: Item = await this.apiService.fetch(`item/${currId}.json`);
  //         if (res.type === 'comment') {
  //           comments.unshift(res);
  //           comments.slice(-1, 1);
  //         }
  //         --currId;
  //       }
  //     }

  //     this.items = comments;



  //     // let currId: number = newestId;
  //     // while (comments.length <= this.maxBulkSize) {
  //     //   const res: Item = await this.apiService.fetch(`item/${currId}.json`);
  //     //   if (res.type === 'comment') {
  //     //     comments.push(res);
  //     //   }
  //     //   --currId;
  //     // }
  //     // this.items = comments;
  //   }
  // }
}
