import { Injectable } from '@angular/core';

import { MessageService, ToastMessageOptions } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  public showToast(message: ToastMessageOptions) {
    this.messageService.add(message);
  }
}
