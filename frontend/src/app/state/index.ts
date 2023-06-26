import { ActionReducerMap, combineReducers } from "@ngrx/store";
import userReducer from "./reducers/user.reducer";
import { Istate } from "../interfaces";


const stateReducers: ActionReducerMap<Istate> = {
    users: userReducer
}


export default stateReducers