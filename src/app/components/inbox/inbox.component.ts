import { Component, OnInit } from '@angular/core';
import mockMessages from '../../../assets/mock-data/mock-messages.json';
import { TableModule } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inbox',
  imports: [TableModule, DatePipe, CheckboxModule, ToolbarModule, FormsModule],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.scss',
})
export class InboxComponent implements OnInit {
  public messages: any[] = mockMessages;
  public selectedMessages: any[] = [];
  public allSelected: boolean = false;
  ngOnInit(): void {}
  onSelectAllChanged(e: CheckboxChangeEvent) {
    if (e.checked) {
      this.selectedMessages = this.messages;
    } else {
      this.selectedMessages = [];
    }
  }
}
