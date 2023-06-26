import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import * as UserActions from "../actions/user.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
class UserEffects {
    constructor(private action$:Actions, private userSvc:UserService) {}

    getUsers$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(UserActions.GET_AUTH_USER),
                mergeMap(action => {
                    return this.userSvc.getSignedInUser().pipe(
                        map(authUser => {
                            return UserActions.GET_AUTH_SUCCESS({authUser})
                        }),
                        catchError(error => {
                            localStorage.removeItem('JituExchange-token')
                            return of(UserActions.GET_AUTH_ERROR({error: error.error.message}))
                        })
                    )
                })
            )
        }
    )
    
}

export default UserEffects