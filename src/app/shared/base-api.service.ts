import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import * as MockData from '../../assets/mock-data/mock-data';
import { RegisterUserRequest, User } from './model/user.model';

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

  getUsers(): Observable<User[]> {
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

  registerUser(registerUserRequest: RegisterUserRequest): Observable<User> {
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
}
