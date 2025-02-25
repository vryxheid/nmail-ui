import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import * as MockData from '../../../assets/mock-data/mock-data';
import { RegisterUserRequest, User } from '../model/user.model';
import { Message } from '../model/message.model';
import { Contact } from '../model/contact.model';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private LOAD_MOCK_DATA = false;
  constructor(private httpClient: HttpClient) {}

  private fetchOrMock<T>(
    fetchedValue: Observable<T>,
    mockValue: Observable<T>
  ) {
    if (this.LOAD_MOCK_DATA) {
      return mockValue;
    }
    return fetchedValue;
  }

  //====================================================================================================================
  // USER
  //====================================================================================================================
  public getUsers(): Observable<User[]> {
    return this.fetchOrMock(
      this.httpClient.get<User[]>('/api/users'),
      of(MockData.mockUsers).pipe(
        map((usersAsJson) =>
          usersAsJson.map(
            (userAsJson) =>
              ({
                ...userAsJson,
                lastLogIn: new Date(userAsJson.lastLogIn),
              } as User)
          )
        )
      )
    );
  }

  public registerUser(
    registerUserRequest: RegisterUserRequest
  ): Observable<User> {
    return this.fetchOrMock(
      this.httpClient.post<User>('/api/user', registerUserRequest),
      of(MockData.mockUsers).pipe(
        map((data: any[]) => data[0]!),
        map(
          (userAsJson) =>
            ({
              ...userAsJson,
              lastLogIn: new Date(userAsJson.lastLogIn),
            } as User)
        )
      )
    );
  }

  //====================================================================================================================
  // MESSAGE
  //====================================================================================================================
  public getMessages(userId: number): Observable<Message[]> {
    return this.fetchOrMock(
      this.httpClient.get<Message[]>('/api/inbox/' + userId),
      of(MockData.mockMessages).pipe(
        map((messagesAsJson) => {
          return messagesAsJson.map(
            (messageAsJson) =>
              ({
                ...messageAsJson,
                date: new Date(messageAsJson.date),
              } as Message)
          );
        })
      )
    );
  }

  public getSentMessages(userId: number): Observable<Message[]> {
    return this.fetchOrMock(
      this.httpClient.get<Message[]>('/api/sent/' + userId),
      of(MockData.mockMessages).pipe(
        map((messagesAsJson) => {
          return messagesAsJson.map(
            (messageAsJson) =>
              ({
                ...messageAsJson,
                date: new Date(messageAsJson.date),
              } as Message)
          );
        })
      )
    );
  }

  //====================================================================================================================
  // CONTACT
  //====================================================================================================================
  public getContacts(userId: number): Observable<Contact[]> {
    return this.fetchOrMock(
      this.httpClient.get<Contact[]>('/api/contacts/' + userId),
      of(MockData.mockContacts)
    );
  }

  public getContactById(contactId: number): Observable<Contact> {
    return this.fetchOrMock(
      this.httpClient.get<Contact>('/api/contact/' + contactId),
      of(MockData.mockContacts[0])
    );
  }
}
