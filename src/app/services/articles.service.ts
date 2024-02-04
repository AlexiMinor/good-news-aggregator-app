import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {

  constructor(private apiService: ApiService) { }

  getArticleById(id: string): Observable<Article | null> {
    return this.apiService.get(`Articles/${id}`).pipe();
  }

  getArticles(): Observable<Article[] | null> {
    return this.apiService.get('Articles');
  }


}
