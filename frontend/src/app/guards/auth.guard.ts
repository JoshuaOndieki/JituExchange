import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { Istate } from '../interfaces';

export const authGuard: CanActivateFn = (route, state) => {
  const store:Store<Istate> = inject(Store)
  const router = inject(Router)

  return store.select('users').pipe(
    switchMap(usersState => {
      const canActivate = usersState.authUser ? true : false
      if (canActivate) {
        return of(true)
      } else {
        if (['/signin', '/signup'].includes(state.url)) {
          return of(true)
        }
        router.navigate(['signin'])
        return of(false)
      }
    }),
    catchError(error => {
      router.navigate(['signin'])
      return of(false)
    })
  );
}
