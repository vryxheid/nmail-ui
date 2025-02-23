import { Component, OnInit } from '@angular/core';
import { BaseApiService } from '../../shared/api/base-api.service';
import { tap } from 'rxjs';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-admin-panel',
  imports: [TableModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  users: any[] = [];
  selectedUsers: any[] = [];
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
