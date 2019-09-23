import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';

interface IMessage {
  channel: string;
  data: any;
}

@Injectable()
export class EventBusService {
  private message$: Subject<IMessage>;

  constructor() {
    this.message$ = new Subject<IMessage>();
  }

  public publish<T>(message: T): void {
    const channel = (<any>message.constructor).name;
    this.message$.next({ channel: channel, data: message });
  }

  public of<T>(messageType: { new(...args: any[]): T }): Observable<T> {
    const channel = (<any>messageType).name;
    return this.message$.pipe(
      filter<IMessage>(m => m.channel === channel),
      map<IMessage, T>(x => x.data)
    );
  }
}
