import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { tap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';

import { Contact } from '../../shared/model/contact.model';
import { BaseApiService } from '../../shared/api/base-api.service';
import { TableItem } from '../../shared/model/table-item.model';

@Component({
  selector: 'app-contacts',
  imports: [TableModule, CheckboxModule, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  @ViewChild('#contacts-table') contactsTable?: ElementRef;
  contacts: TableItem<Contact>[] = [];

  constructor(private baseApiService: BaseApiService) {}
  ngOnInit(): void {
    this.baseApiService
      .getContacts(1)
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

  onCheckBoxClicked(event: CheckboxChangeEvent, messageId: number) {
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
