import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { tap, throwError } from 'rxjs';

import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { DraftService } from '../inbox/draft.service';
import { Draft } from '../../model/message.model';
import { UserReduced } from '../../model/user.model';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { BaseApiService } from '../../shared/api/base-api.service';

@Component({
  selector: 'app-draft-view',
  imports: [DatePipe, PrimeNgModule],
  templateUrl: './draft-view.component.html',
  styleUrl: './draft-view.component.scss',
})
export class DraftViewComponent implements OnInit {
  public draft!: Draft;
  public currentUser: UserReduced | null = null;

  constructor(
    private draftService: DraftService,
    private currentUserService: CurrentUserService,
    private baseApiService: BaseApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.currentUserService.currentUser;
    this.route.paramMap
      .pipe(
        tap((params) => {
          const draft = this.draftService.getDraftById(
            Number(params.get('id'))
          );

          if (!draft) {
            this.router.navigate(['/draft']);
            throwError(() => new Error("This draft doesn't exist."));
          } else {
            this.draft = draft;
          }
        })
      )
      .subscribe();
  }

  public getRecipientsString(recipientIds: number[]) {
    const foundContacts: string[] = [];
    recipientIds.forEach((id) => {
      const foundContact = this.currentUserService.contactsCurrentUser?.find(
        (contact) => contact.id === id
      );
      if (foundContact && foundContact.email && foundContact.email.length > 0) {
        foundContacts.push(foundContact.email);
      }
    });

    return foundContacts.join(', ');
  }
}
