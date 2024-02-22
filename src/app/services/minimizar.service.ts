import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MinimizarService {

  private minimizarBoolean = new BehaviorSubject<boolean>(true);
  minimizarCurrent = this.minimizarBoolean.asObservable();
  constructor() { }
  changeMinimizar(value:boolean){
    this.minimizarBoolean.next(value);
  }
}
