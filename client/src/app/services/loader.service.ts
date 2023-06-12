import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  @Output() progLoad: EventEmitter<any> = new EventEmitter();

  sendData(): any {
    this.progLoad.emit(false);
  }
}
