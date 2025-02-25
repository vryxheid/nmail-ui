import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { tap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';

import { BaseApiService } from '../../shared/api/base-api.service';
import { Message } from '../../shared/model/message.model';
import { TableItem } from '../../shared/model/table-item.model';

@Component({
  selector: 'app-inbox',
  imports: [TableModule, DatePipe, CheckboxModule, ToolbarModule, FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent implements OnInit {
  public messages: TableItem<Message>[] = [];
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
              data: item,
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
              data: item,
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

  onRowClick(message: TableItem<Message>) {
    console.log(message);
  }

  openMessage(e: any) {
    console.log(e);
  }

  onCheckBoxClicked(event: CheckboxChangeEvent, messageId: number) {
    const index = this.messages.map((msg) => msg.data.id).indexOf(messageId, 0);
    if (index > -1) {
      if (event.checked) {
        this.messages[index].isSelected = true;
      } else {
        this.messages[index].isSelected = false;
      }
    }
  }
}
