import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable, OnInit } from "@angular/core";
import { IMessage } from '../app.component';

@Injectable({ providedIn: 'root' })

export class WSService implements OnInit {

  ngOnInit(): void {
  }

  public messageReceive = new Subject<IMessage>();
  private ws: WebSocket;


  public init(): void {
    this.ws = new WebSocket('ws://ws-chat-itclass.herokuapp.com');

    this.ws.onopen = (event: Event) => {
      this.ws.onmessage = (message) => {
        const parsed = JSON.parse(message.data) as IMessage;
        this.messageReceive.next(parsed);
      };
    };
  }

  public send(message: IMessage): void {
    this.ws.send(JSON.stringify(message));
  }
}
