import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { BaseApiService } from '../../shared/api/base-api.service';
import { tap } from 'rxjs';
import { Message } from '../../shared/model/message.model';

@Component({
  selector: 'app-inbox',
  imports: [TableModule, DatePipe, CheckboxModule, ToolbarModule, FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent implements OnInit {
  public messages: Message[] = [];
  public selectedMessages: Message[] = [];
  public allSelected: boolean = false;
  constructor(private baseApiService: BaseApiService) {}
  ngOnInit(): void {
    this.baseApiService
      .getMessages(4)
      .pipe(
        tap((messages) => {
          this.messages = messages;
        })
      )
      .subscribe();
  }
  onSelectAllChanged(e: CheckboxChangeEvent) {
    if (e.checked) {
      this.selectedMessages = this.messages;
    } else {
      this.selectedMessages = [];
    }
  }
}
