import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../interfaces/Item';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss']
})
export class NewsItemComponent implements OnInit {

  @Input() item: Item;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
