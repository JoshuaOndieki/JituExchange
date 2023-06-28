import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as QuestionActions from "../actions/question.actions";
import { catchError, concatMap, map, mergeMap, of, take, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { ToastService } from "src/app/services/toast.service";
import { QuestionService } from "src/app/services/question.service";
import { Store } from "@ngrx/store";
import { Istate } from "src/app/interfaces";

@Injectable()
class QuestionEffects {
    constructor(private action$:Actions, private questionSvc:QuestionService, private store:Store<Istate>, private router:Router) {}

    getTopQuestions$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(QuestionActions.GET_TOP_QUESTIONS),
                mergeMap(action => {
                    return this.questionSvc.getTopQuestions().pipe(
                        map(res => {
                            return QuestionActions.GET_TOP_QUESTIONS_SUCCESS({topQuestions:res.questions})
                        }),
                        catchError(error => {
                            return of(QuestionActions.GET_TOP_QUESTIONS_ERROR({error: error.error.message}))
                        })
                    )
                })
            )
        }
    )

    getQuestion$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(QuestionActions.GET_QUESTION),
                mergeMap(action => {
                    QuestionActions.CLEAR_QUESTION()         
                    return this.questionSvc.getQuestion(action.id).pipe(
                        map(question => {
                            return QuestionActions.GET_QUESTION_SUCCESS({question})
                        }),
                        catchError(error => {
                            return of(QuestionActions.GET_QUESTION_ERROR({error: error.error.message}))
                        })
                    )
                })
            )
        }
    )

    postAnswer$ = createEffect(
        ()=> {
            let questionID = ''
            return this.action$.pipe(
                ofType(QuestionActions.POST_ANSWER),
                mergeMap(action => {       
                    questionID = action.questionID             
                    return this.questionSvc.postAnswer({details:action.details, questionID:action.questionID}).pipe(
                        map(res => {
                            return QuestionActions.POST_ANSWER_SUCCESS()
                        }),
                        catchError(error => {
                            return of(QuestionActions.POST_ANSWER_ERROR({error: error.error.message}))
                        })
                    )
                }),
                tap(action => this.store.dispatch(QuestionActions.GET_QUESTION({id:questionID})))
            )
        }
    )

    
    askQuestion$ = createEffect(
        ()=> {
            let questionID = ''
            return this.action$.pipe(
                ofType(QuestionActions.ASK_QUESTION),
                mergeMap(action => {       
                    return this.questionSvc.askQuestion({details:action.details, summary:action.summary, tags:action.tags}).pipe(
                        map(res => {
                            questionID = res.id
                            return QuestionActions.ASK_QUESTION_SUCCESS()
                        }),
                        catchError(error => {
                            return of(QuestionActions.ASK_QUESTION_ERROR({error: error.error.message}))
                        })
                    )
                }),
                tap(action => {
                    this.router.navigate(['/questions/q', questionID])
                })
            )
        }
    )

    addComment$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(QuestionActions.ADD_COMMENT),
                mergeMap(action => {   
                    const {type, ...data} = action
                    return this.questionSvc.addComment(data).pipe(
                        map(res => {
                            return QuestionActions.ADD_COMMENT_SUCCESS()
                        }),
                        catchError(error => {
                            return of(QuestionActions.ADD_COMMENT_ERROR({error: error.error.message}))
                        })
                    )
                }),
                tap(action => {
                    this.store.select('questions').pipe(take(1)).subscribe(
                        questionState => {
                            const questionID = questionState.question?.id || ''
                            this.store.dispatch(QuestionActions.GET_QUESTION({id:questionID}))
                        }
                    )
                })
            )
        }
    )

    vote$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(QuestionActions.VOTE),
                mergeMap(action => {   
                    const {type, ...data} = action
                    return this.questionSvc.vote(data).pipe(
                        map(res => {
                            return QuestionActions.VOTE_SUCCESS()
                        }),
                        catchError(error => {
                            return of(QuestionActions.VOTE_ERROR({error: error.error.message}))
                        })
                    )
                }),
                tap(action => {
                    this.store.select('questions').pipe(take(1)).subscribe(
                        questionState => {
                            const questionID = questionState.question?.id || ''
                            this.store.dispatch(QuestionActions.GET_QUESTION({id:questionID}))
                        }
                    )
                })
            )
        }
    )
    
}

export default QuestionEffects