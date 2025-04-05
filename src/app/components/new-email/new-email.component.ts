import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { tap } from 'rxjs';

import { BaseApiService } from '../../shared/api/base-api.service';
import { Contact } from '../../model/contact.model';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { DraftService } from '../inbox/draft.service';
import { Draft, SendMessageRequest } from '../../model/message.model';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { LS_USER_ID } from '../../shared/api/model/local-storage-variables';
import { ToastService } from '../../shared/services/toast.service';
import { CurrentUserService } from '../../shared/services/current-user.service';

@Component({
  selector: 'app-new-email',
  imports: [FormsModule, PrimeNgModule, ReactiveFormsModule],
  templateUrl: './new-email.component.html',
  styleUrl: './new-email.component.scss',
})
export class NewEmailComponent implements OnInit {
  public formGroup!: FormGroup;
  public contactsCurrentUser: Contact[] = [];
  public filteredContacts: Contact[] = [];

  constructor(
    private baseApiService: BaseApiService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      recipients: new FormControl<Contact[]>([]),
      subject: new FormControl<string>(''),
      body: new FormControl<string>(''),
    });

    this.baseApiService
      .getContacts()
      .pipe(
        tap((contacts) => {
          this.contactsCurrentUser = contacts;
        })
      )
      .subscribe();
  }

  public submit() {
    this.formGroup.markAsDirty();
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsDirty();
    });
    if (this.formGroup.valid) {
      const { subject, body } = this.formGroup.value;

      this.formGroup.value.recipients.forEach((recipient: Contact) => {
        const message: SendMessageRequest = {
          subject: subject,
          body: body,
          recipientEmail: recipient.email,
          senderId: new Number(localStorage.getItem(LS_USER_ID)).valueOf(),
        };
        this.baseApiService.sendMessage(message).subscribe(() => {
          this.toastService.showToast({
            summary: 'Message sent',
            severity: 'success',
          });
          this.router.navigate(['/inbox']);
        });
      });
    }
  }

  public saveDraft() {
    this.formGroup.markAsDirty();
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsDirty();
    });
    if (this.formGroup.valid) {
      const { subject, body, recipients } = this.formGroup.value;

      DraftService.drafts.push({
        recipientIds: recipients.map((item: Contact) => item.id),
        subject: subject,
        body: body,
        date: new Date(),
        id: 0,
        senderId: 0,
      } as Draft);
    }

    this.toastService.showToast({
      summary: 'Draft saved',
      severity: 'secondary',
    });
  }

  public search(event: AutoCompleteCompleteEvent) {
    let filtered: Contact[] = [];
    let query = event.query;

    this.contactsCurrentUser.forEach((contact) => {
      if (
        contact.email.toLowerCase().includes(query.toLowerCase()) ||
        (contact.name &&
          contact.name.toLowerCase().includes(query.toLowerCase()))
      ) {
        filtered.push(contact);
      }
    });

    this.filteredContacts = filtered;
  }

  public discard() {
    // ToDo: Open confirmation dialog.
    // Navigate to inbox without saving draft
    this.router.navigate(['/inbox']);
  }
}
