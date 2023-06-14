import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iquestion, Iuser } from 'src/app/interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question!:Iquestion
  user!:Iuser

  constructor() {
    this.user =
        {
            firstname:"string",
            lastname:"string",
            id:"JoshuaOndieki",
            email:"string",
            username:"string",
            location:"string",
            joinedDate:"string",
            website: "string",
            github:"string",
            avatar:"string",
            role: 'admin'
        }    
  }
}
