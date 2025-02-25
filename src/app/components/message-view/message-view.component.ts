import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../../shared/model/message.model';
import { PanelModule } from 'primeng/panel';
import { BaseApiService } from '../../shared/api/base-api.service';
import { Contact } from '../../shared/model/contact.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-message-view',
  imports: [PanelModule],
  templateUrl: './message-view.component.html',
  styleUrl: './message-view.component.scss',
})
export class MessageViewComponent implements OnInit {
  @Input('message') message!: Message;
  public contact?: Contact;

  constructor(private baseApiService: BaseApiService) {}

  ngOnInit(): void {
    this.baseApiService
      .getContactById(this.message.senderId)
      .pipe(
        tap((data) => {
          this.contact = data;
        })
      )
      .subscribe();
  }
}
