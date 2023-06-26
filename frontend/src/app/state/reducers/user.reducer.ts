import {createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as UserActions from '../actions/user.actions'
import { IuserState } from "src/app/interfaces";


const initialState: IuserState = {
    error: null,
    authUser: null
}

// const getUserState = createFeatureSelector<IuserState>('users')
// export const getUsers = createSelector(getUserState, state => state.users)


const userReducer =  createReducer(
    initialState
    ,
    on(UserActions.GET_AUTH_SUCCESS, (state:IuserState, {authUser}) => {
        return {
            ...state,
            authUser,
            error: null
        }
    }),
    on(UserActions.GET_AUTH_ERROR, (state:IuserState, {error}) => {
        return {
            ...state,
            error,
            authUser: null
        }
    })
)

export default userReducer