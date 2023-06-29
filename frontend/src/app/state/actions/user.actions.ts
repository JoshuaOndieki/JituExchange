import { createAction, props } from "@ngrx/store";
import { InewUserData, Iqueries, Iquestion, Iquestions, Iuser, Iusers } from "src/app/interfaces";


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

export const GET_USERS = createAction('[Users] - Get users', props<Iqueries>())
export const GET_USERS_SUCCESS = createAction('[Users] - Get users Success', props<Iusers>())
export const GET_USERS_ERROR = createAction('[Users] - Get users Error', props<{error:string}>())

export const GET_USER_PROFILE_INFO = createAction('[Users] - Get user', props<{by:'username' | 'id' | 'email', identifier:string}>())
export const GET_USER_PROFILE_INFO_SUCCESS = createAction('[Users] - Get user Success', props<Iuser>())
export const GET_USER_PROFILE_INFO_ERROR = createAction('[Users] - Get user Error', props<{error:string}>())

export const GET_USER_PROFILE_QUESTIONS = createAction('[Users] - Get user questions', props<Iqueries>())
export const GET_USER_PROFILE_QUESTIONS_SUCCESS = createAction('[Users] - Get user questions Success', props<Iquestions>())
export const GET_USER_PROFILE_QUESTIONS_ERROR = createAction('[Users] - Get user questions Error', props<{error:string}>())

export const GET_USER_PROFILE_ANSWERS = createAction('[Users] - Get user', props<{by:'username' | 'id' | 'email', identifier:string}>())
export const GET_USER_PROFILE_ANSWERS_SUCCESS = createAction('[Users] - Get user Success', props<Iuser>())
export const GET_USER_PROFILE_ANSWERS_ERROR = createAction('[Users] - Get user Error', props<{error:string}>())

export const GET_USER_PROFILE_COMMENTS = createAction('[Users] - Get user', props<{by:'username' | 'id' | 'email', identifier:string}>())
export const GET_USER_PROFILE_COMMENTS_SUCCESS = createAction('[Users] - Get user Success', props<Iuser>())
export const GET_USER_PROFILE_COMMENTS_ERROR = createAction('[Users] - Get user Error', props<{error:string}>())

export const CLEAR_USER_PROFILE = createAction('[Users] - clear user profile')
