import { createAction, props } from "@ngrx/store";
import { InewUserData, Iuser } from "src/app/interfaces";


export const GET_AUTH_USER = createAction('[Users] - Get AUTH User')
export const GET_AUTH_SUCCESS = createAction('[Users] - Get AUTH Success', props<{authUser: Iuser}>())
export const GET_AUTH_ERROR = createAction('[Users] - Get AUTH Error', props<{error:string}>())

export const SIGN_OUT = createAction('[Users] - Sign out')
export const SIGN_OUT_SUCCESS = createAction('[Users] - sign out success')
export const SIGN_OUT_ERROR = createAction('[Users] - sign out error', props<{error:string}>())

export const SIGN_IN = createAction('[Users] - Sign in', props<{identifier:string, password:string}>())
export const SIGN_IN_SUCCESS = createAction('[Users] - sign in success')
export const SIGN_IN_ERROR = createAction('[Users] - sign in error', props<{error:string}>())

export const SIGN_UP = createAction('[Users] - Sign up', props<InewUserData>())
export const SIGN_UP_SUCCESS = createAction('[Users] - sign up success')
export const SIGN_UP_ERROR = createAction('[Users] - sign up error', props<{error:string}>())