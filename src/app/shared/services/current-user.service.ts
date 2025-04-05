import { Injectable } from '@angular/core';
import { Contact } from '../../model/contact.model';
import { UserReduced } from '../../model/user.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private user: UserReduced | null = null;
  private contacts: Contact[] | null = null;

  constructor() {}

  public get currentUser() {
    return this.user;
  }

  public get contactsCurrentUser() {
    return this.contacts ?? [];
  }

  public setCurrentUser(user: UserReduced) {
    this.user = user;
  }

  public setContactsCurrentUser(contacts: Contact[]) {
    this.contacts = contacts;
  }

  public getContactByEmail(email: string): Contact | undefined {
    return this.contacts?.find((contact) => contact.email === email);
  }
}
