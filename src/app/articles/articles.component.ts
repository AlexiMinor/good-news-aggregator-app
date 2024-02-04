import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticlePreviewComponent } from "../article-preview/article-preview.component";
import { ArticlesService } from '../services/articles.service';
import { catchError, of } from 'rxjs';
import {MatGridList, MatGridTile} from '@angular/material/grid-list'
@Component({
    selector: 'app-articles',
    standalone: true,
    templateUrl: './articles.component.html',
    styleUrl: './articles.component.scss',
    imports: [UpperCasePipe, NgFor, NgIf, FormsModule, ArticlePreviewComponent, MatGridList, MatGridTile]
})

export class ArticlesComponent
  implements OnInit {

  selectedArticle?: Article;
  articles?: Article[] | null = [];
  showSpinner: boolean = false;
  constructor(private articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.showSpinner = true;
    this.articlesService.getArticles().subscribe(articles => {
      this.articles = articles;
      //spinner
    });
}
  //   this.articlesService.getArticles().subscribe((data) => {
  //     data?.forEach(function(article) {
  //       article.rate = 2000
  //     });
  //     catchError(err => {
  //       err.message = err.message
  //       return of({});
  //     })
  //   })
  //   .add(() => this.showSpinner = false);
  // }

  onSelect(article: Article): void {
    if (this.selectedArticle === article) {
      this.selectedArticle = undefined;
    } else {
      this.selectedArticle = article;
    }
  }
}
