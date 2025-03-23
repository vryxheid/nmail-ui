import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import * as MockData from '../../../assets/mock-data/mock-data';
import { RegisterUserRequest, User } from '../../model/user.model';
import { Message } from '../../model/message.model';
import { Contact } from '../../model/contact.model';
import { LoginRequest } from './model/login-request.model';
import { AuthService } from './auth.service';
import { ToastService } from '../services/toast.service';
import { LoginResponse } from './model/login-response.model';
import {
  LS_JWT_EXPIRES_AT,
  LS_JWT_TOKEN,
} from './model/local-storage-variables';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private LOAD_MOCK_DATA = false;

  public contactsCurrentUser: Contact[] | null = null;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  private fetchOrMock<T>(
    fetchedValue: Observable<T>,
    mockValue: Observable<T>
  ) {
    if (this.LOAD_MOCK_DATA) {
      return mockValue;
    }
    return fetchedValue.pipe(catchError(this.handleError.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0 || !error.status) {
      /* A client-side or network error occurred. Handle it accordingly. */

      const errorMessage = 'An unexpected error occurred';

      this.toastService.showToast({
        detail: errorMessage,
        summary: 'Error',
        severity: 'danger',
      });

      // Return an observable with a user-facing error message.
      return throwError(() => new Error(errorMessage));
    } else {
      /* The backend returned an unsuccessful response code.
      The response body may contain clues as to what went wrong. */

      const errorMessage = `Error code ${error.status}`;

      this.toastService.showToast({
        detail: errorMessage,
        summary: `Error ${error.status}`,
        severity: 'error',
      });

      // Return an observable with a user-facing error message.
      return throwError(() => new Error(errorMessage));
    }
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
      this.httpClient.post<User>('/auth/user', registerUserRequest),
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

  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    const mockTimeStamp = new Date();
    mockTimeStamp.setMinutes(mockTimeStamp.getMinutes() + 30);
    return this.fetchOrMock(
      this.authService.login(loginRequest),
      of({
        jwtToken: 'mockToken',
        expiresAt: mockTimeStamp,
      } as LoginResponse).pipe(
        tap((response: LoginResponse) => {
          // Set mock token and expiration
          const expirationDate = new Date();
          expirationDate.setTime(expirationDate.getTime() + 4 * 60 * 60 * 1000);
          localStorage.setItem(LS_JWT_TOKEN, response.jwtToken);
          localStorage.setItem(LS_JWT_EXPIRES_AT, expirationDate.toISOString());
        })
      )
    ).pipe(
      tap(() => {
        this.toastService.showToast({
          text: 'Logged in successfully',
          severity: 'success',
        });
      })
    );
  }
  //====================================================================================================================
  // MESSAGE
  //====================================================================================================================
  public getMessages(): Observable<Message[]> {
    return this.fetchOrMock(
      this.httpClient.get<Message[]>('/api/inbox'),
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

  public getSentMessages(): Observable<Message[]> {
    return this.fetchOrMock(
      this.httpClient.get<Message[]>('/api/sent'),
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

  getMessagesInTrash() {
    return this.fetchOrMock(
      this.httpClient.get<Message[]>('/api/trash'),
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

  public getMessageById(id: number): Observable<Message> {
    return this.fetchOrMock(
      this.httpClient.get<Message>('/api/message/' + id),
      of(MockData.mockMessages[0]).pipe(
        map(
          (messageAsJson) =>
            ({
              ...messageAsJson,
              date: new Date(messageAsJson.date),
            } as Message)
        )
      )
    );
  }
  //====================================================================================================================
  // CONTACT
  //====================================================================================================================
  public getContacts(refresh = false): Observable<Contact[]> {
    // If contacts were already fetched, no need to fetch again, except explicit request to refresh data
    if (this.contactsCurrentUser && !refresh) {
      return of(this.contactsCurrentUser);
    } else {
      return this.fetchOrMock(
        this.httpClient.get<Contact[]>('/api/contacts'),
        of(MockData.mockContacts)
      );
    }
  }

  public getContactById(contactId: number): Observable<Contact> {
    return this.fetchOrMock(
      this.httpClient.get<Contact>('/api/contact/' + contactId),
      of(MockData.mockContacts[0])
    );
  }
}
