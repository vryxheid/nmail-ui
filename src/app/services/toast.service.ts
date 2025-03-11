import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ToastMessageOptions } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  public messages$ = new Observable<ToastMessageOptions>();
}
