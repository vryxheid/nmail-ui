import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public messages$ = new Subject<ToastMessageOptions>();

  constructor() {}
}
