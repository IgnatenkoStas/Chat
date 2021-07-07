import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMessage } from 'src/app/app.component';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() public message: IMessage;

  constructor() {
  }

  public receivedDate: any;

  ngOnInit(): void {
    let today = new Date();
    this.receivedDate = formatDate(today, 'hh:mm a', 'en-US');
  }

}
