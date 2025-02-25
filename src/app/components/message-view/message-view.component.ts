import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { switchMap, tap } from 'rxjs';
import { PanelModule } from 'primeng/panel';

import { Message } from '../../shared/model/message.model';
import { BaseApiService } from '../../shared/api/base-api.service';
import { Contact } from '../../shared/model/contact.model';

@Component({
  selector: 'app-message-view',
  imports: [PanelModule, DatePipe],
  templateUrl: './message-view.component.html',
  styleUrl: './message-view.component.scss',
})
export class MessageViewComponent implements OnInit {
  public message!: Message;
  public contact?: Contact;

  constructor(
    private baseApiService: BaseApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          return this.baseApiService.getMessageById(Number(params.get('id')));
        }),
        tap((message) => {
          console.log(message);

          this.message = message;
        }),
        switchMap((message) => {
          return this.baseApiService.getContactById(message.senderId).pipe(
            tap((data) => {
              this.contact = data;
            })
          );
        })
      )
      .subscribe();
  }
}
