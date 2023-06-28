import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "src/app/services/user.service";
import * as UserActions from "../actions/user.actions";
import { catchError, concatMap, map, mergeMap, of, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { ActionsSubject } from "@ngrx/store";
import { Router } from "@angular/router";
import { ToastService } from "src/app/services/toast.service";

@Injectable()
class UserEffects {
    constructor(private action$:Actions, private userSvc:UserService, private authSvc:AuthService, private actionsSubject:ActionsSubject, private router:Router, private toastSvc:ToastService) {}

    getAuthUser$ = createEffect(
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

    signup$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(UserActions.SIGN_UP),
                mergeMap(action => {
                    return this.userSvc.signup({username: action.username, email: action.email, password:action.password}).pipe(
                        map(res => {
                            this.toastSvc.displayMessage(
                                {
                                    message: res.message,
                                    type: "success",
                                    displayed: false
                                }
                            )
                            this.router.navigate(['/signin'])
                            return UserActions.SIGN_UP_SUCCESS()
                        }),
                        catchError(error => {
                            return of(UserActions.SIGN_UP_ERROR({error: error.error.message}))
                        })
                    )
                })
            )
        }
    )

    signin$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(UserActions.SIGN_IN),
                mergeMap(action => {
                    return this.userSvc.signin({identifier:action.identifier, password:action.password}).pipe(
                        map(res => {
                            this.authSvc.signIn(res.token)
                            UserActions.SIGN_IN_SUCCESS()
                            return UserActions.GET_AUTH_USER()
                        }),
                        catchError(error => {
                            return of(UserActions.SIGN_IN_ERROR({error: error.error.message}))
                        })
                    )
                })
            )
        }
    )

    signout$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(UserActions.SIGN_OUT),
                mergeMap(action => {
                    return this.userSvc.signout().pipe(
                        map(message => {
                            return UserActions.SIGN_OUT_SUCCESS()
                        }),
                        catchError(error => {
                            return of(UserActions.SIGN_OUT_ERROR({error: error.error.message}))
                        })
                    )
                })
            )
        }
    )

    getUsers$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(UserActions.GET_USERS),
                mergeMap(action => {
                    const {type, ...queries} = action
                    return this.userSvc.getUsers(queries).pipe(
                        map(users => {
                            return UserActions.GET_USERS_SUCCESS(users)
                        }),
                        catchError(error => {
                            console.log(error);
                            
                            return of(UserActions.GET_USERS_ERROR({error: error.error.message}))
                        })
                    )
                })
            )
        }
    )

    getUserProfile$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(UserActions.GET_USER_PROFILE),
                mergeMap(action => {
                    return this.userSvc.getUserProfile({by:action.by, identifier:action.identifier}).pipe(
                        map(user => {
                            return UserActions.GET_USER_PROFILE_SUCCESS(user)
                        }),
                        catchError(error => {
                            console.log(error);
                            
                            return of(UserActions.GET_USER_PROFILE_ERROR({error: error.error.message}))
                        })
                    )
                })
            )
        }
    )
    
}

export default UserEffects