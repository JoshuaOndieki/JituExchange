import { ActionReducerMap } from "@ngrx/store";
import userReducer from "./reducers/user.reducer";
import { Istate } from "../interfaces";
import questionReducer from "./reducers/question.reducer";


const stateReducers: ActionReducerMap<Istate> = {
    users: userReducer,
    questions: questionReducer
}


export default stateReducers