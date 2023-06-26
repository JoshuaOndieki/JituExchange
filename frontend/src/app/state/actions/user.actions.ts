import { createAction, props } from "@ngrx/store";
import { Iuser } from "src/app/interfaces";


export const GET_AUTH_USER = createAction('[Users] - Get AUTH User')
// export const GET_USERS = createAction('[Header] - Get Users')
export const GET_AUTH_SUCCESS = createAction('[Users] - Get AUTH Success', props<{authUser: Iuser}>())
export const GET_AUTH_ERROR = createAction('[Users] - Get AUTH Error', props<{error:string}>())

// export const SET_SELECTED_USER = createAction('[Header] - Set Selected User', props<{userId:number}>())