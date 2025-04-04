import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';

import * as MockData from '../../../assets/mock-data/mock-data';
import { RegisterUserRequest, User, UserReduced } from '../../model/user.model';
import {
  MessageWithEmails,
  SendMessageRequest,
} from '../../model/message.model';
import { Contact } from '../../model/contact.model';
import { LoginRequest } from './model/login-request.model';
import { AuthService } from './auth.service';
import { ToastService } from '../services/toast.service';
import { LoginResponse } from './model/login-response.model';
import {
  LS_JWT_EXPIRES_AT,
  LS_JWT_TOKEN,
} from './model/local-storage-variables';
import { UserReducedRequest } from './model/user-reduced.request';
import { CurrentUserService } from '../services/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class BaseApiService {
  private LOAD_MOCK_DATA = false;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private toastService: ToastService
  ) {}

  private fetchOrMock<T>(
    fetchedValue: Observable<T>,
    mockValue: Observable<T>
  ) {
    if (this.LOAD_MOCK_DATA) {
      return mockValue;
    }
    return fetchedValue;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0 || !error.status) {
      /* A client-side or network error occurred. Handle it accordingly. */

      const errorMessage = 'An unexpected error occurred';

      this.toastService.showToast({
        detail: errorMessage,
        summary: 'Error',
        severity: 'error',
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
    ).pipe(catchError(this.handleError.bind(this)));
  }

  public getUserByEmail(email: string): Observable<UserReduced> {
    const body: UserReducedRequest = { email: email };
    return this.fetchOrMock(
      this.httpClient.post<UserReduced>('/api/user-by-email', body),
      of(MockData.mockUserReduced).pipe(
        map(
          (user) =>
            ({
              ...user,
              lastLogIn: new Date(user.lastLogIn),
            } as UserReduced)
        )
      )
    ).pipe(catchError(this.handleError.bind(this)));
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
    ).pipe(catchError(this.handleError.bind(this)));
  }

  public login(loginRequest: LoginRequest) {
    const fourHoursInMiliseconds = 4 * 60 * 60 * 1000;
    const mockTimeStamp = new Date();
    mockTimeStamp.setTime(mockTimeStamp.getTime() + fourHoursInMiliseconds);
    return this.fetchOrMock(
      this.authService.login(loginRequest),
      of({
        jwtToken: 'mockToken',
        expiresAt: mockTimeStamp,
      } as LoginResponse).pipe(
        tap((response: LoginResponse) => {
          // Set mock token and expiration
          localStorage.setItem(LS_JWT_TOKEN, response.jwtToken);
          localStorage.setItem(LS_JWT_EXPIRES_AT, mockTimeStamp.toISOString());
        })
      )
    ).pipe(
      switchMap(() => {
        return this.getUserByEmail(loginRequest.email);
      }),
      tap((user: UserReduced) => {
        this.currentUserService.setCurrentUser(user);
        this.toastService.showToast({
          text: 'Logged in successfully',
          severity: 'success',
        });
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const errorMessage = 'Wrong email or password';

          this.toastService.showToast({
            detail: errorMessage,
            summary: 'Unauthorized',
            severity: 'error',
          });

          return throwError(() => new Error(errorMessage));
        } else {
          return this.handleError(error);
        }
      })
    );
  }
  //====================================================================================================================
  // MESSAGE
  //====================================================================================================================
  public getMessages(): Observable<MessageWithEmails[]> {
    return this.fetchOrMock(
      this.httpClient.get<MessageWithEmails[]>('/api/inbox'),
      of(MockData.mockMessagesWithEmails).pipe(
        map((messagesAsJson) => {
          return messagesAsJson.map(
            (messageAsJson) =>
              ({
                ...messageAsJson,
                date: new Date(messageAsJson.date),
              } as MessageWithEmails)
          );
        })
      )
    ).pipe(catchError(this.handleError.bind(this)));
  }

  public getSentMessages(): Observable<MessageWithEmails[]> {
    return this.fetchOrMock(
      this.httpClient.get<MessageWithEmails[]>('/api/sent'),
      of(MockData.mockMessagesWithEmails).pipe(
        map((messagesAsJson) => {
          return messagesAsJson.map(
            (messageAsJson) =>
              ({
                ...messageAsJson,
                date: new Date(messageAsJson.date),
              } as MessageWithEmails)
          );
        })
      )
    ).pipe(catchError(this.handleError.bind(this)));
  }

  getMessagesInTrash() {
    return this.fetchOrMock(
      this.httpClient.get<MessageWithEmails[]>('/api/trash'),
      of(MockData.mockMessagesWithEmails).pipe(
        map((messagesAsJson) => {
          return messagesAsJson.map(
            (messageAsJson) =>
              ({
                ...messageAsJson,
                date: new Date(messageAsJson.date),
              } as MessageWithEmails)
          );
        })
      )
    ).pipe(catchError(this.handleError.bind(this)));
  }

  public getMessageById(id: number): Observable<MessageWithEmails> {
    return this.fetchOrMock(
      this.httpClient.get<MessageWithEmails>('/api/message/' + id),
      of(MockData.mockMessagesWithEmails[0]).pipe(
        map(
          (messageAsJson) =>
            ({
              ...messageAsJson,
              date: new Date(messageAsJson.date),
            } as MessageWithEmails)
        )
      )
    ).pipe(catchError(this.handleError.bind(this)));
  }

  public sendMessage(message: SendMessageRequest) {
    return this.fetchOrMock(
      this.httpClient.post('/api/send-message', message),
      of(MockData.mockMessagesWithEmails[0])
    ).pipe(catchError(this.handleError.bind(this)));
  }
  //====================================================================================================================
  // CONTACT
  //====================================================================================================================
  public getContacts(refresh = false): Observable<Contact[]> {
    // If contacts were already fetched, no need to fetch again, except explicit request to refresh data
    if (this.currentUserService.contactsCurrentUser && !refresh) {
      return of(this.currentUserService.contactsCurrentUser);
    } else {
      return this.fetchOrMock(
        this.httpClient.get<Contact[]>('/api/contacts'),
        of(MockData.mockContacts)
      ).pipe(
        tap((contacts: Contact[]) => {
          this.currentUserService.setContactsCurrentUser(contacts);
        }),
        catchError(this.handleError.bind(this))
      );
    }
  }

  public getContactByEmail(email: string): Observable<Contact> {
    return this.fetchOrMock(
      this.httpClient.post<Contact>('/api/contact/', { email: email }),
      of(MockData.mockContacts[0])
    ).pipe(catchError(this.handleError.bind(this)));
  }
}
