import { createReducer, on } from "@ngrx/store";
import * as UserActions from '../actions/user.actions'
import { IuserState } from "src/app/interfaces";


const initialState: IuserState = {
    errors: {
        authUser: null,
        signin:  null,
        signup: null,
        users:  null,
        signout: null,
        userProfile: null,
        deleteUser: null
    },
    authUser: null,
    asyncInitialized: false,
    users: null,
    userProfile: {
        info: null,
        questions: [],
        answers: [],
        comments: []
    }
}

const userReducer =  createReducer(
    initialState
    ,
    on(UserActions.GET_AUTH_SUCCESS, (state:IuserState, {authUser}) => {
        return {
            ...state,
            authUser,
            errors:{...state.errors, authUser: null},
            asyncInitialized: true
        }
    }),
    on(UserActions.GET_AUTH_ERROR, (state:IuserState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, authUser: error},
            authUser: null,
            asyncInitialized: true
        }
    }),
    on(UserActions.SIGN_UP_SUCCESS, (state:IuserState) => {
        return {
            ...state,
            authUser: null,
            errors:{...state.errors, signup: null}
        }
    }),
    on(UserActions.SIGN_UP_ERROR, (state:IuserState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, signup: error}
        }
    }),
    on(UserActions.SIGN_IN_SUCCESS, (state:IuserState) => {
        return {
            ...state,
            errors:{...state.errors, signin: null}
        }
    }),
    on(UserActions.SIGN_IN_ERROR, (state:IuserState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, signin: error}
        }
    }),
    on(UserActions.SIGN_OUT_SUCCESS, (state:IuserState) => {
        return {
            ...state,
            authUser: null,
            errors:{...state.errors, signout: null},
            asyncInitialized: false
        }
    }),
    on(UserActions.SIGN_OUT_ERROR, (state:IuserState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, signout: error},
            authUser: null,
            asyncInitialized: false
        }
    }),
    on(UserActions.GET_USERS_SUCCESS, (state:IuserState, users) => {
        return {
            ...state,
            users,
            errors:{...state.errors, users: null}
        }
    }),
    on(UserActions.GET_USERS_ERROR, (state:IuserState, {error}) => {
        return {
            ...state,
            users: null,
            errors:{...state.errors, users: error}
        }
    }),
    on(UserActions.GET_USER_PROFILE_INFO_SUCCESS, (state:IuserState, info) => {
        return {
            ...state,
            userProfile:{...state.userProfile, info},
            errors:{...state.errors, userProfile: null}
        }
    }),
    on(UserActions.GET_USER_PROFILE_INFO_ERROR, (state:IuserState, {error}) => {
        return {
            ...state,
            userProfile: {...state.userProfile,info:null},
            errors:{...state.errors, userProfile: error}
        }
    }),
    on(UserActions.GET_USER_PROFILE_QUESTIONS_SUCCESS, (state:IuserState, {questions}) => {
        return {
            ...state,
            userProfile:{...state.userProfile, questions},
            errors:{...state.errors, userProfile: null}
        }
    }),
    on(UserActions.GET_USER_PROFILE_QUESTIONS_ERROR, (state:IuserState, {error}) => {
        return {
            ...state,
            userProfile: {...state.userProfile,questions:[]},
            errors:{...state.errors, userProfile: error}
        }
    }),
    on(UserActions.CLEAR_USER_PROFILE, (state:IuserState) => {
        return {
            ...state,
            userProfile:{
                info: null,
                questions: [],
                answers: [],
                comments: []
            },
            errors:{...state.errors, userProfile: null}
        }
    }),
    on(UserActions.DELETE_USER_SUCCESS, (state:IuserState) => {
        return {
            ...state,
            errors:{...state.errors, deleteUser: null}
        }
    }),
    on(UserActions.DELETE_USER_ERROR, (state:IuserState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, deleteUser: error}
        }
    }),
)

export default userReducer