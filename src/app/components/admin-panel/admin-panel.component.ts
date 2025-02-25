import { Component, OnInit } from '@angular/core';
import { BaseApiService } from '../../shared/api/base-api.service';
import { tap } from 'rxjs';
import { TableModule } from 'primeng/table';
import { User } from '../../shared/model/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  imports: [TableModule, DatePipe],
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
