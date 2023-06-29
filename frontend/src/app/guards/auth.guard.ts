import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, of, switchMap, take } from 'rxjs';
import { Istate } from '../interfaces';
import { GET_AUTH_USER } from '../state/actions/user.actions';

export const authGuard: CanActivateFn = (route, state) => {  

  // this guard requires data to be fetched from endpoint only once when the state is initialized.
  // takes client to a loading component until the data has been loaded and has to keep track of the url to redirect to after the data is fetched.
  // Warning: A bit unstable

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
        previousRoute = state.url == '/home' || ['/signin', '/signup', '/welcome'].includes(state.url) ? router.url : previousRoute
        console.log('going to fvsdhjk ', previousRoute);
        
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
