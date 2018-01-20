import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import User from '../interfaces/User';
import Item from '../interfaces/Item';
import { ApiService } from '../services/api.service';

import * as _ from 'lodash';
import { StateService } from '../services/state.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = null;
  submitted: { [type: string]: Item[] };

  showStories: true;
  showComments: true;

  constructor(
    private apiService: ApiService,
    private router: ActivatedRoute,
    private stateService: StateService) { }

  async ngOnInit() {
    const snapshot = this.router.snapshot;
    const { id } = snapshot.params;

    this.stateService.setLoading(true);
    const user = await this.fetchUser(id);
    if (user) {
      this.user = user;
      this.submitted = await this.fetchSubmitted(user.submitted)
        .then(items => _.groupBy(items, 'type'));
      // console.log(this.submitted)
    }
    this.stateService.setLoading(false);
  }

  async fetchUser(id: string): Promise<User> {
    const res: User = await this.apiService.fetch(`/user/${id}.json`);
    return res;
  }

  async fetchSubmitted(ids: number[]): Promise<Item[]> {
    const res: Item[] = await Promise.all(ids.map(id => this.apiService.fetch(`item/${id.toString()}.json`)));
    return res;
  }

}
