import { FurnitureInfos, FabricIds } from './../../models/furniture-data.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary-step4',
  templateUrl: './summary-step4.component.html',
  styleUrls: ['./summary-step4.component.scss']
})
export class SummaryStep4Component implements OnInit {


  constructor(
  ) { }


  @Output() sendFormEvent = new EventEmitter();
  @Output() step3a = new EventEmitter<boolean>();

  ngOnInit() {
  }

  back() {
    this.step3a.emit();
  }

  sendForm() {
    this.sendFormEvent.emit();

  }
}
