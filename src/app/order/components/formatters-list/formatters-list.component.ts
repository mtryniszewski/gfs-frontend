import { FurnitureIdRequest } from './../../models/furniture.model';
import { RectangularFormatter, TriangularFormatter, PentagonFormatter } from './../../models/formatters.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LFormatter } from '../../models/formatters.model';
import { EventBusService } from 'src/app/core/services/event-bus.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-formatters-list',
  templateUrl: './formatters-list.component.html',
  styleUrls: ['./formatters-list.component.scss']
})
export class FormattersListComponent implements OnInit, OnDestroy {


  private lFormatters: LFormatter[];
  @Input() rectangularFormatters: RectangularFormatter[];
  private triangularFormatters: TriangularFormatter[];
  private pentagonFormatters: PentagonFormatter[];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private eventBus: EventBusService
  ) { }

  ngOnInit() {
    this.eventBus
      .of(FurnitureIdRequest)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
       // this.pages.page = 0;
        //  this.loadOrders();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
