import { Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'articles', component: ArticlesComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'article/:id', component: ArticleDetailsComponent },
  { path: 'login', component: LoginComponent },
];
