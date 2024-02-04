import { Article } from './../models/article';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-article-details',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './article-details.component.html',
    styleUrl: './article-details.component.scss',
})
export class ArticleDetailsComponent implements OnInit {

  article: Article | undefined | null;


  constructor(private readonly articleService: ArticlesService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    if (id) {
      let article = this.articleService.getArticleById(id).subscribe(article => {
        this.article = article;
    });
  }
 }
}
