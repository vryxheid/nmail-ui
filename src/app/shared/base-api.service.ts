import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as MockData from '../../assets/mock-data/mock-data';

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

  getUsers(): Observable<any> {
    return this.fetchOrMock(
      this.httpClient.get('/api/users'),
      of(MockData.mockUsers)
    );
  }
}
