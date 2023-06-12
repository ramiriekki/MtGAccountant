import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  @Output() progLoad: EventEmitter<any> = new EventEmitter();
  @Output() topCardLoad: EventEmitter<any> = new EventEmitter();

  progLoaded(): any {
    this.progLoad.emit(false);
  }
  topCardLoaded(): any {
    this.topCardLoad.emit(false);
  }
}
