import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { tap } from 'rxjs';

import { BaseApiService } from '../../shared/api/base-api.service';
import { User } from '../../shared/model/user.model';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';

@Component({
  selector: 'app-admin-panel',
  imports: [DatePipe, PrimeNgModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  users: User[] = [];
  selectedUsers: User[] = [];
  constructor(private baseApiService: BaseApiService) {}
  ngOnInit(): void {
    this.baseApiService
      .getUsers()
      .pipe(
        tap((data) => {
          this.users = data;
        })
      )
      .subscribe();
  }
}
