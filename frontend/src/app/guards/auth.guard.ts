import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, take } from 'rxjs';
import { Istate } from '../interfaces';
import { GET_AUTH_USER } from '../state/actions/user.actions';

export const authGuard: CanActivateFn = (route, state) => {  

  const store:Store<Istate> = inject(Store)
  const router = inject(Router)

  console.log(route, state);
  console.log('state url', state.url);
  console.log('router url', router.url);
  
  
  

  return store.select('users').pipe(
    switchMap(usersState => {      
      if (['/signin', '/signup', '/welcome'].includes(state.url) && !usersState.authUser && usersState.asyncInitialized) {
        return of(true)
      }
      if (!usersState.asyncInitialized) {
        console.log('auth user not initialized. fetching...');
        store.dispatch(GET_AUTH_USER())
        // const previousRoute = state.url == '/loading' || ['/signin', '/signup', '/welcome'].includes(state.url) ? router.url : state.url
        // console.log('hjadsfv ', previousRoute);
        
        // router.navigate(['/loading'], { state: { previousRoute: state.url }})

        let previousRoute = state.url == '/loading' ? router.url : state.url 
        previousRoute = state.url == '/home' ? router.url : previousRoute
        router.navigate(['/loading'], { state: { previousRoute } })
        return of(false)
      }
      const canActivate = usersState.authUser ? true : false
      if (canActivate) {
        console.log('going to ', state.url);
        
        return of(true)
      } else {
        router.navigate(['/welcome'])
        return of(false)
      }
    }),
    take(1),
    catchError(error => {
      router.navigate(['/welcome'])
      return of(false)
    })
  );
}
