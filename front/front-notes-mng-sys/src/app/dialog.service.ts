import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private messageService: MessageService) {}
  successMessage(summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
      life: 2000,
      sticky: false,
    });
  }
  errorMessage(summary: string, detail: string) {
    this.messageService.clear();
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
      life: 2000,
      sticky: false,
    });
  }
}
