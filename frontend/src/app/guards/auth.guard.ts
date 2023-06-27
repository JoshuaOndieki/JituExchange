import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap } from 'rxjs';
import { Istate } from '../interfaces';
import { GET_AUTH_USER } from '../state/actions/user.actions';

export const authGuard: CanActivateFn = (route, state) => {
  if (['/signin', '/signup'].includes(state.url)) {
    return true
  }

  const store:Store<Istate> = inject(Store)
  const router = inject(Router)

  return store.select('users').pipe(
    switchMap(usersState => {
      if (!usersState.asyncInitialized) {
        console.log('auth user not initialized. fetching...');
        store.dispatch(GET_AUTH_USER())
        
        router.navigate(['/loading'], { state: { previousRoute:state.url } })
        return of(false)
      }
      const canActivate = usersState.authUser ? true : false
      if (canActivate) {
        return of(true)
      } else {
        router.navigate(['/welcome'])
        return of(false)
      }
    }),
    catchError(error => {
      router.navigate(['/welcome'])
      return of(false)
    })
  );
}
