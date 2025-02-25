import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { BaseApiService } from '../../shared/api/base-api.service';
import { tap } from 'rxjs';
import { Message } from '../../shared/model/message.model';
import { Router } from '@angular/router';

class MessageDisplay extends Message {
  public isSelected!: boolean;
}
@Component({
  selector: 'app-inbox',
  imports: [TableModule, DatePipe, CheckboxModule, ToolbarModule, FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent implements OnInit {
  // public messages: Message[] = [];
  public messages: MessageDisplay[] = [];
  public allSelected: boolean = false;
  public sentInbox: boolean = false;
  constructor(private baseApiService: BaseApiService, private router: Router) {}
  ngOnInit(): void {
    if (this.router.url === '/sent') {
      this.sentInbox = true;
      this.baseApiService
        .getSentMessages(1)
        .pipe(
          tap((messages) => {
            this.messages = messages.map((item) => ({
              ...item,
              isSelected: false,
            }));
          })
        )
        .subscribe();
    } else {
      this.baseApiService
        .getMessages(1)
        .pipe(
          tap((messages) => {
            this.messages = messages.map((item) => ({
              ...item,
              isSelected: false,
            }));
          })
        )
        .subscribe();
    }
  }

  onSelectAllChanged(e: CheckboxChangeEvent) {
    if (e.checked) {
      this.messages = this.messages.map((msg) => ({
        ...msg,
        isSelected: true,
      }));
    } else {
      this.messages = this.messages.map((msg) => ({
        ...msg,
        isSelected: false,
      }));
    }
  }

  openMessage(e: any) {
    console.log(e);
  }

  onCheckBoxClicked(event: CheckboxChangeEvent, messageId: number) {
    const index = this.messages.map((msg) => msg.id).indexOf(messageId, 0);
    if (index > -1) {
      if (event.checked) {
        this.messages[index].isSelected = true;
      } else {
        this.messages[index].isSelected = false;
      }
    }
  }
}
