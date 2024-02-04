import { Component, Input } from '@angular/core';
import { Article } from '../models/article';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [NgIf, FormsModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss'
})

export class ArticlePreviewComponent {
  @Input() article?: Article;

}
