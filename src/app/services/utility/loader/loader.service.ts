import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private requestCount = 0;
  private loading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loading.asObservable();

  show(): void {
    this.requestCount++;
    if (this.requestCount === 1) {
      this.loading.next(true);
    }
  }

  hide(): void {
    if (this.requestCount > 0) {
      this.requestCount--;
    }
    if (this.requestCount === 0) {
      this.loading.next(false);
    }
  }

  reset(): void {
    this.requestCount = 0;
    this.loading.next(false);
  }
}