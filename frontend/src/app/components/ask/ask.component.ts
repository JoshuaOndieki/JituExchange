import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import validTagValidator from 'src/app/validators/tag.validator';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Istate } from 'src/app/interfaces';
import { ASK_QUESTION } from 'src/app/state/actions/question.actions';

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

  constructor(private fb:FormBuilder, private store:Store<Istate>) {

  }

  ngOnInit(): void {
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
    if (this.askForm.valid) {
      this.loading = true
      this.store.dispatch(ASK_QUESTION(this.askForm.value))
    }
    
  }
}
