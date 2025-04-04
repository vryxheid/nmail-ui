import { Injectable } from '@angular/core';
import { Contact } from '../../model/contact.model';
import { UserReduced } from '../../model/user.model';

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
    return this.contacts;
  }

  public setCurrentUser(user: UserReduced) {
    return (this.user = user);
  }

  public setContactsCurrentUser(contacts: Contact[]) {
    return (this.contacts = contacts);
  }

  public getContactByEmail(email: string) {
    return this.contacts?.find((contact) => contact.email === email);
  }
}
