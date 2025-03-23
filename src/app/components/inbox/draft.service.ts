import { Injectable } from '@angular/core';
import { Draft } from '../../model/message.model';

@Injectable({ providedIn: 'root' })
export class DraftService {
  public static drafts: Draft[] = [];

  public getDraftById(id: number): Draft | undefined {
    return DraftService.drafts.find((draft) => draft.id === id);
  }
}
