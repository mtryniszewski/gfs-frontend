import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-furniture-list',
  templateUrl: './furniture-list.component.html',
  styleUrls: ['./furniture-list.component.scss']
})
export class FurnitureListComponent implements OnInit {

  public isCollapsed = true;
  constructor() { }

  ngOnInit() {
  }

}
