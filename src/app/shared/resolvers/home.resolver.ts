import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetAllUsers } from 'src/app/home/action/user.action';

import { UserService } from '../services/user.service';

@Injectable()

export class HomeResolver implements Resolve<any> {
  constructor(private userService: UserService, private store: Store) {}

  resolve(): Observable<any> {
    return  this.store.dispatch(new GetAllUsers())
  }
}