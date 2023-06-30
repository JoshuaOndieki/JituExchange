import {createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { IquestionState } from "src/app/interfaces";
import * as QuestionActions from '../actions/question.actions'

const initialState: IquestionState = {
    errors: {
        question: null,
        topQuestions: null,
        postAnswer: null,
        askQuestion: null,
        addComment: null,
        voting: null,
        updateQuestion: null,
        acceptAnswer: null,
        allQuestions: null
    },
    question: null,
    topQuestions: [],
    allQuestions: null
}

const questionReducer =  createReducer(
    initialState
    ,
    on(QuestionActions.GET_TOP_QUESTIONS_SUCCESS, (state:IquestionState, {topQuestions}) => {
        return {
            ...state,
            topQuestions,
            errors:{...state.errors, topQuestions: null}
        }
    }),
    on(QuestionActions.GET_TOP_QUESTIONS_ERROR, (state:IquestionState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, topQuestions: error},
            topQuestions: []
        }
    }),
    on(QuestionActions.GET_QUESTIONS_SUCCESS, (state:IquestionState, {allQuestions}) => {
        return {
            ...state,
            allQuestions,
            errors:{...state.errors, allQuestions: null}
        }
    }),
    on(QuestionActions.GET_QUESTIONS_ERROR, (state:IquestionState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, allQuestions: error},
            allQuestions: null
        }
    }),
    on(QuestionActions.GET_QUESTION_SUCCESS, (state:IquestionState, {question}) => {
        return {
            ...state,
            question,
            errors:{...state.errors, question: null}
        }
    }),
    on(QuestionActions.GET_QUESTION_ERROR, (state:IquestionState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, question: error},
            question: null
        }
    }),
    on(QuestionActions.CLEAR_QUESTION, (state:IquestionState) => {
        return {
            ...state,
            question:null,
            errors:{...state.errors, question: null}
        }
    }),
    on(QuestionActions.POST_ANSWER_SUCCESS, (state:IquestionState) => {
        return {
            ...state,
            errors:{...state.errors, postAnswer: null}
        }
    }),
    on(QuestionActions.POST_ANSWER_ERROR, (state:IquestionState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, postAnswer: error}
        }
    }),
    on(QuestionActions.ASK_QUESTION_SUCCESS, (state:IquestionState) => {
        return {
            ...state,
            errors:{...state.errors, askQuestion: null}
        }
    }),
    on(QuestionActions.ASK_QUESTION_ERROR, (state:IquestionState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, askQuestion: error}
        }
    }),
    on(QuestionActions.UPDATE_QUESTION_SUCCESS, (state:IquestionState) => {
        return {
            ...state,
            errors:{...state.errors, updateQuestion: null}
        }
    }),
    on(QuestionActions.UPDATE_QUESTION_ERROR, (state:IquestionState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, UPDATEQuestion: error}
        }
    }),
    on(QuestionActions.ADD_COMMENT_SUCCESS, (state:IquestionState) => {
        return {
            ...state,
            errors:{...state.errors, addComment: null}
        }
    }),
    on(QuestionActions.ADD_COMMENT_ERROR, (state:IquestionState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, addComment: error}
        }
    }),
    on(QuestionActions.VOTE_SUCCESS, (state:IquestionState) => {
        return {
            ...state,
            errors:{...state.errors, voting: null}
        }
    }),
    on(QuestionActions.VOTE_ERROR, (state:IquestionState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, voting: error}
        }
    }),
    on(QuestionActions.ACCEPT_ANSWER_SUCCESS, (state:IquestionState) => {
        return {
            ...state,
            errors:{...state.errors, acceptAnswer: null}
        }
    }),
    on(QuestionActions.ACCEPT_ANSWER_ERROR, (state:IquestionState, {error}) => {
        return {
            ...state,
            errors:{...state.errors, acceptAnswer: error}
        }
    })
)

export default questionReducer