import { Component } from '@angular/core';
import { Contact } from '../../shared/model/contact.model';
import { BaseApiService } from '../../shared/api/base-api.service';
import { tap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-contacts',
  imports: [TableModule, CheckboxModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  contacts: Contact[] = [];
  selectedContacts: Contact[] = [];
  constructor(private baseApiService: BaseApiService) {}
  ngOnInit(): void {
    this.baseApiService
      .getContacts(1)
      .pipe(
        tap((data) => {
          this.contacts = data;
        })
      )
      .subscribe();
  }
}
