import { Component, OnInit } from '@angular/core';
import { NMailApiService } from '../../shared/nmail-api.service';
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
  constructor(private NMailApiService: NMailApiService) {}
  ngOnInit(): void {
    this.NMailApiService.getUsers()
      .pipe(
        tap((data) => {
          this.users = data;
        })
      )
      .subscribe();
  }
}
