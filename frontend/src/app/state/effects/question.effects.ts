import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as QuestionActions from "../actions/question.actions";
import { catchError, map, mergeMap, of, take, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastService } from "src/app/services/toast.service";
import { QuestionService } from "src/app/services/question.service";
import { Store } from "@ngrx/store";
import { Istate, ItoastMessage } from "src/app/interfaces";
import { GET_USER_PROFILE_QUESTIONS, GET_USER_PROFILE_QUESTIONS_ERROR, GET_USER_PROFILE_QUESTIONS_SUCCESS } from "../actions/user.actions";

@Injectable()
class QuestionEffects {
    constructor(private action$:Actions, private questionSvc:QuestionService, private store:Store<Istate>, private router:Router, private toast:ToastService) {}

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

    getAllQuestions$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(QuestionActions.GET_QUESTIONS),
                mergeMap(action => {
                    const {type, ...queries} = action
                    return this.questionSvc.getQuestions(queries).pipe(
                        map(allQuestions => {
                            return QuestionActions.GET_QUESTIONS_SUCCESS({allQuestions})
                        }),
                        catchError(error => {
                            return of(QuestionActions.GET_QUESTIONS_ERROR({error: error.error.message}))
                        })
                    )
                })
            )
        }
    )

    getUserProfileQuestions$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(GET_USER_PROFILE_QUESTIONS),
                mergeMap(action => {
                    const {type, ...queries} = action
                    return this.questionSvc.getQuestions(queries).pipe(
                        map(questions => {
                            return GET_USER_PROFILE_QUESTIONS_SUCCESS(questions)
                        }),
                        catchError(error => {
                            return of(GET_USER_PROFILE_QUESTIONS_ERROR({error: error.error.message}))
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
            let posting = true
            return this.action$.pipe(
                ofType(QuestionActions.POST_ANSWER),
                mergeMap(action => {       
                    questionID = action.questionID             
                    return this.questionSvc.postAnswer({details:action.details, questionID:action.questionID}).pipe(
                        map(res => {
                            posting = false
                            return QuestionActions.POST_ANSWER_SUCCESS()
                        }),
                        catchError(error => {
                            posting = false
                            return of(QuestionActions.POST_ANSWER_ERROR({error: error.error.message}))
                        })
                    )
                }),
                tap(action => {
                    while (posting) {
                    }
                    this.store.dispatch(QuestionActions.GET_QUESTION({id:questionID}))
                })
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

    updateQuestion$ = createEffect(
        ()=> {
            let questionID = ''
            return this.action$.pipe(
                ofType(QuestionActions.UPDATE_QUESTION),
                mergeMap(action => {  
                    questionID = action.id     
                    return this.questionSvc.updateQuestion(action.id, {details:action.data.details,summary:action.data.summary, tags:action.data.tags}).pipe(
                        map(res => {
                            return QuestionActions.UPDATE_QUESTION_SUCCESS()
                        }),
                        catchError(error => {
                            return of(QuestionActions.UPDATE_QUESTION_ERROR({error: error.error.message}))
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

    acceptAnswer$ = createEffect(
        ()=> {
            return this.action$.pipe(
                ofType(QuestionActions.ACCEPT_ANSWER),
                mergeMap(action => {   
                    return this.questionSvc.acceptAnswer(action.answerID).pipe(
                        map(res => {
                            return QuestionActions.ACCEPT_ANSWER_SUCCESS()
                        }),
                        catchError(error => {
                            return of(QuestionActions.ACCEPT_ANSWER_ERROR({error: error.error.message}))
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

    deleteQuestion$ = createEffect(
        ()=> {
            let message:ItoastMessage
            return this.action$.pipe(
                ofType(QuestionActions.DELETE_QUESTION),
                mergeMap(action => {
                    QuestionActions.CLEAR_QUESTION()         
                    return this.questionSvc.deleteQuestion(action.id).pipe(
                        map(res => {
                            message = {message:res.message, type: 'success', displayed: false}
                            return QuestionActions.DELETE_QUESTION_SUCCESS()
                        }),
                        catchError(error => {
                            message = {message:error.error.message, type: 'error', displayed: false}
                            return of(QuestionActions.DELETE_QUESTION_ERROR({error: error.error.message}))
                        })
                    )
                }),
                tap(action => {
                    console.log(this.router.url);
                    this.toast.displayMessage(message)
                    this.store.dispatch(QuestionActions.GET_TOP_QUESTIONS())
                })
            )
        }
    )
    
}

export default QuestionEffects