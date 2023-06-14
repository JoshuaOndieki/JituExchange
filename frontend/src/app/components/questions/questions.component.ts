import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AskComponent } from '../ask/ask.component';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {

}
