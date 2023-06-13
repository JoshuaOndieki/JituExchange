import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iquestion } from 'src/app/interfaces';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input() question!:Iquestion
}
