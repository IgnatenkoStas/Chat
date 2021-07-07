import { WSService } from './websocket/ws.service';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { WS } from './websocket/websocket.events';
import { NgModule } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface IMessage {
  id: number;
  sender: string;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public messages: IMessage[] = [];
  public text: string = '';

  @ViewChild('messageContainer') private container: ElementRef;

  private senders: string[] = [
    'Stasique',
    'Dima',
    'Alex',
    'Sveta',
    'Vova',
    'Anton'
  ];

  @HostListener('document:keydown.enter', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.sendMessage();
  }

  constructor(private wsService: WSService) {
  }

  ngOnInit() {
    this.wsService.init();
    this.wsService.messageReceive.subscribe((message) => {
      this.messages.push(message);

      setTimeout(() => {
      this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
      }, 1);
    });
  }

  public sendMessage(): void {
    let resultStr: string = this.text.trim();

    let resultIndex = Math.floor(Math.random() * this.senders.length);

    if(resultStr !== '') {
      this.wsService.send({id: 1, sender: this.senders[resultIndex], text: resultStr });
    }

    this.text = '';
  }
}
