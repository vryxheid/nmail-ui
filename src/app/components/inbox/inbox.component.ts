import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, of, tap } from 'rxjs';

import { CheckboxChangeEvent } from 'primeng/checkbox';

import { BaseApiService } from '../../shared/api/base-api.service';
import { Draft, Message } from '../../model/message.model';
import { TableItem } from '../../model/table-item.model';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { DraftService } from './draft.service';

enum InboxMode {
  Inbox = 'Inbox',
  Sent = 'Sent',
  Trash = 'Trash',
  Draft = 'Draft',
}

@Component({
  selector: 'app-inbox',
  imports: [DatePipe, FormsModule, PrimeNgModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent implements OnInit {
  public messages: TableItem<Message | Draft>[] = [];
  public allSelected: boolean = false;
  public inboxMode: InboxMode = InboxMode.Inbox;
  public isSynching: boolean = false;

  constructor(private baseApiService: BaseApiService, private router: Router) {}

  ngOnInit(): void {
    if (this.router.url === '/sent') {
      this.inboxMode = InboxMode.Sent;
    } else if (this.router.url === '/trash') {
      this.inboxMode = InboxMode.Trash;
    } else if (this.router.url === '/draft') {
      this.inboxMode = InboxMode.Draft;
    }
    this.fetchData().subscribe();
  }

  fetchData(): Observable<Message[] | Draft[]> {
    let fetchData$: Observable<Message[] | Draft[]>;
    switch (this.inboxMode) {
      case InboxMode.Sent:
        fetchData$ = this.baseApiService.getSentMessages();
        break;
      case InboxMode.Trash:
        fetchData$ = this.baseApiService.getMessagesInTrash();
        break;
      case InboxMode.Draft:
        fetchData$ = of(DraftService.drafts);
        break;
      case InboxMode.Inbox:
        fetchData$ = this.baseApiService.getMessages();
        break;

      default:
        fetchData$ = this.baseApiService.getMessages();
        break;
    }

    return fetchData$.pipe(
      tap((messages: Message[] | Draft[]) => {
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

  onRowClick(message: TableItem<Message | Draft>) {
    if (this.inboxMode === InboxMode.Draft) {
      this.router.navigate(['/draft/' + message.data.id]);
    } else {
      this.router.navigate(['/message/' + message.data.id]);
    }
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
