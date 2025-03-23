import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { of, switchMap, tap, throwError } from 'rxjs';

import { Contact } from '../../model/contact.model';
import { PrimeNgModule } from '../../shared/primeng/primeng.module';
import { DraftService } from '../inbox/draft.service';
import { Draft } from '../../model/message.model';
import { BaseApiService } from '../../shared/api/base-api.service';

@Component({
  selector: 'app-draft-view',
  imports: [DatePipe, PrimeNgModule],
  templateUrl: './draft-view.component.html',
  styleUrl: './draft-view.component.scss',
})
export class DraftViewComponent implements OnInit {
  public draft!: Draft;

  constructor(
    private draftService: DraftService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap((params) => {
          const draft = this.draftService.getDraftById(
            Number(params.get('id'))
          );
          console.log(draft);

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
}
