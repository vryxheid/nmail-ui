import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { switchMap, tap } from 'rxjs';

import { MessageWithEmails } from '../../model/message.model';
import { BaseApiService } from '../../shared/api/base-api.service';
import { Contact } from '../../model/contact.model';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { CurrentUserService } from '../../shared/services/current-user.service';

@Component({
  selector: 'app-message-view',
  imports: [DatePipe, PrimeNgModule],
  templateUrl: './message-view.component.html',
  styleUrl: './message-view.component.scss',
})
export class MessageViewComponent implements OnInit {
  public message!: MessageWithEmails;
  public contact?: Contact;

  constructor(
    private baseApiService: BaseApiService,
    private contactService: CurrentUserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          return this.baseApiService.getMessageById(Number(params.get('id')));
        }),
        tap((message) => {
          this.message = message;
          const foundContact = this.contactService.getContactByEmail(
            message.senderEmail
          );
          if (foundContact) {
            this.contact = foundContact;
          }
        })
      )
      .subscribe();
  }
}
