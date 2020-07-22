import {
  Observable,
  Subject,
} from 'rxjs';

export class DialogRef {

  private readonly afterClosed = new Subject<any>();
  public afterClosed$: Observable<any> = this.afterClosed.asObservable();

  constructor() {}

  close(result?: any): void {
    this.afterClosed.next(result);
  }

}