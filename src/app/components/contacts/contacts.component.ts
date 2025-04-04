import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { tap } from 'rxjs';

import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';

import { Contact } from '../../model/contact.model';
import { BaseApiService } from '../../shared/api/base-api.service';
import { TableItem } from '../../model/table-item.model';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';

@Component({
  selector: 'app-contacts',
  imports: [CheckboxModule, FormsModule, PrimeNgModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  @ViewChild('#contacts-table') contactsTable?: ElementRef;
  contacts: TableItem<Contact>[] = [];

  constructor(private baseApiService: BaseApiService) {}
  ngOnInit(): void {
    this.baseApiService
      .getContacts()
      .pipe(
        tap((data) => {
          this.contacts = data.map((item) => ({
            data: item,
            isSelected: false,
          }));
        })
      )
      .subscribe();
  }

  public onToggleFavourite(contact: TableItem<Contact>) {
    const contactItem = this.contacts.find(
      (item) => item.data.id === contact.data.id
    );
    if (contactItem) {
      contactItem.data.favourite = !contact.data.favourite;
    }
    if (this.contactsTable) {
      const row = this.contactsTable.nativeElement.querySelector(
        `#contact-${contact.data.id}`
      );
      if (row) {
        row.classList.toggle('pi-star-fill', contact.data.favourite);
        row.classList.toggle('pi-star', contact.data.favourite);
      }
    }
  }

  public onCheckBoxClicked(event: CheckboxChangeEvent, messageId: number) {
    const index = this.contacts.map((msg) => msg.data.id).indexOf(messageId, 0);
    if (index > -1) {
      if (event.checked) {
        this.contacts[index].isSelected = true;
      } else {
        this.contacts[index].isSelected = false;
      }
    }
  }
}
