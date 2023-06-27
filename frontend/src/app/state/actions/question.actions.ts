import { createAction, props } from "@ngrx/store";
import { InewAnswerData, InewCommentData, InewQuestionData, InewVoteData, Iquestion, IquestionWithDetails } from "src/app/interfaces";


export const GET_TOP_QUESTIONS = createAction('[Questions] - Get TOP QUESTIONS')
export const GET_TOP_QUESTIONS_SUCCESS = createAction('[Questions] - Get TOP QUESTIONS Success', props<{topQuestions: Iquestion[]}>())
export const GET_TOP_QUESTIONS_ERROR = createAction('[Questions] - Get TOP_QUESTIONS Error', props<{error:string}>())

export const GET_QUESTION = createAction('[Questions] - Get  QUESTION', props<{id:string}>())
export const CLEAR_QUESTION = createAction('[Questions] - clear  QUESTION')
export const GET_QUESTION_SUCCESS = createAction('[Questions] - Get  QUESTION Success', props<{question: IquestionWithDetails}>())
export const GET_QUESTION_ERROR = createAction('[Questions] - Get QUESTION Error', props<{error:string}>())

export const POST_ANSWER = createAction('[Questions] - post answer', props<InewAnswerData>())
export const POST_ANSWER_SUCCESS = createAction('[Questions] - post answer success')
export const POST_ANSWER_ERROR = createAction('[Questions] - post answer error', props<{error:string}>())

export const ASK_QUESTION = createAction('[Questions] - ask question', props<InewQuestionData>())
export const ASK_QUESTION_SUCCESS = createAction('[Questions] - ask question success')
export const ASK_QUESTION_ERROR = createAction('[Questions] - ask question error', props<{error:string}>())

export const ADD_COMMENT = createAction('[Questions] - add comment', props<InewCommentData>())
export const ADD_COMMENT_SUCCESS = createAction('[Questions] - add comment success')
export const ADD_COMMENT_ERROR = createAction('[Questions] - add comment error', props<{error:string}>())

export const VOTE = createAction('[Questions] - vote', props<InewVoteData>())
export const VOTE_SUCCESS = createAction('[Questions] - vote success')
export const VOTE_ERROR = createAction('[Questions] - vote error', props<{error:string}>())