import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, tap } from 'rxjs';

import { CheckboxChangeEvent } from 'primeng/checkbox';

import { BaseApiService } from '../../shared/api/base-api.service';
import { Message } from '../../model/message.model';
import { TableItem } from '../../model/table-item.model';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';

enum InboxMode {
  Inbox = 'Inbox',
  Sent = 'Sent',
  Trash = 'Trash',
}

@Component({
  selector: 'app-inbox',
  imports: [DatePipe, FormsModule, PrimeNgModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent implements OnInit {
  public messages: TableItem<Message>[] = [];
  public allSelected: boolean = false;
  public inboxMode: InboxMode = InboxMode.Inbox;
  public isSynching: boolean = false;

  constructor(private baseApiService: BaseApiService, private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/sent') {
      this.inboxMode = InboxMode.Sent;
    } else if (this.router.url === '/trash') {
      this.inboxMode = InboxMode.Trash;
    }
    this.fetchData().subscribe();
  }

  fetchData(): Observable<Message[]> {
    let fetchData$: Observable<Message[]>;
    if (this.inboxMode === InboxMode.Sent) {
      fetchData$ = this.baseApiService.getSentMessages();
    } else if (this.inboxMode === InboxMode.Trash) {
      fetchData$ = this.baseApiService.getMessagesInTrash();
    } else {
      fetchData$ = this.baseApiService.getMessages();
    }

    return fetchData$.pipe(
      tap((messages) => {
        this.messages = messages.map((item) => ({
          data: item,
          isSelected: false,
        }));
      })
    );
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
    this.router.navigate(['/message/' + message.data.id]);
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

  onStartSync() {
    this.isSynching = true;
    this.fetchData().subscribe({
      next: () => {},
      error: () => {},
      complete: () => {
        this.isSynching = false;
      },
    });
  }
}
