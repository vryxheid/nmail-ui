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

@Component({
  selector: 'app-new-email',
  imports: [FormsModule, PrimeNgModule, ReactiveFormsModule],
  templateUrl: './new-email.component.html',
  styleUrl: './new-email.component.scss',
})
export class NewEmailComponent implements OnInit {
  public formGroup!: FormGroup;

  public recipients: string[] = [];
  public contactsCurrentUser: Contact[] = [];

  public get emailsContactsCurrentUser() {
    return this.contactsCurrentUser.map((contact) => contact.email);
  }

  constructor(private baseApiService: BaseApiService, private router: Router) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      recipients: new FormControl<string[]>([]),
      subject: new FormControl<string>(''),
      body: new FormControl<string>(''),
    });

    this.baseApiService
      .getContacts()
      .pipe(
        tap((contacts: Contact[]) => {
          this.contactsCurrentUser = contacts;
          console.log(this.contactsCurrentUser);
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
      console.log('Send Message');

      console.log(this.formGroup.value);
    }
  }

  public saveDraft() {
    this.formGroup.markAsDirty();
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsDirty();
    });
    if (this.formGroup.valid) {
      console.log('save as draft');

      console.log(this.formGroup.value);
    }
  }

  public discard() {
    // ToDo: Open confirmation dialog.
    // Navigate to inbox without saving draft
    this.router.navigate(['/inbox']);
  }
}
