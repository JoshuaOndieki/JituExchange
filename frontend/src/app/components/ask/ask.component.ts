import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import validTagValidator from 'src/app/validators/tag.validator';
import { IonicModule } from '@ionic/angular';
import { Store, UPDATE } from '@ngrx/store';
import { Istate, Iuser } from 'src/app/interfaces';
import { ASK_QUESTION, UPDATE_QUESTION } from 'src/app/state/actions/question.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-ask',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonicModule],
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {
  askForm!:FormGroup
  loading:boolean = false
  error:string | null = null
  editMode:boolean = false
  questionID:string | null = null
  authUser: Iuser | null = null

  constructor(private fb:FormBuilder, private store:Store<Istate>, private router:Router, private route:ActivatedRoute, private questionSvc:QuestionService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if (params['id']) {
          this.questionID = params['id']
          this.editMode = params['id'] ? true : false
          this.loading = this.editMode ? true : false
          this.questionSvc.getQuestion(params['id']).subscribe(
            res => {
              this.store.select('users').pipe(take(1)).subscribe(
                usersState => {
                  if (res.askedBy !== usersState.authUser?.id) {
                    this.router.navigate(['/'])
                  }
                }
              )
              this.askForm.reset()
              this.askForm.patchValue({
                summary: res.summary,
                details: res.details
              })
              for (const tag of res.tags) {
                this.tags.push(this.fb.control(tag))
              }
              this.loading = false
            })
        }

          }
        )
    
    this.askForm = this.fb.group(
      {
        summary: ['', [Validators.required]],
        details: ['', [Validators.required]],
        tagInput:['', validTagValidator()],
        tags: this.fb.array([])
      }
    )

    this.store.select('questions').subscribe(
      questionState => {
        this.error = questionState.errors.askQuestion
      }
    )
  }

get summary() {
  return this.askForm.controls['summary']
}

get details() {
  return this.askForm.controls['details']
}

get tags():FormArray {
  return this.askForm.get('tags') as FormArray
}

get tagInput() {
  return this.askForm.controls['tagInput']
}

addTag(event:KeyboardEvent) {
  const input = event.target as HTMLInputElement
  const value = input.value.trim().split(' ')[0]

  if (event.code === 'Space' && value && /^[a-zA-Z0-9-]+$/.test(value)) {
    this.tags.push(this.fb.control(value))
    this.tagInput.reset()
  }
}

removeTag(index:number) {
  this.tags.removeAt(index)
}

onSubmit() {
  if (this.editMode) {
    this.loading = true
    this.store.dispatch(UPDATE_QUESTION({id:this.questionID as string, data:this.askForm.value}))
  }else {
    if (this.askForm.valid) {
      this.loading = true
      this.store.dispatch(ASK_QUESTION(this.askForm.value))
    }
  }
  
}
}
