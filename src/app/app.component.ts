import { TokenStorageService } from './services/tokenStorage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ArticlesComponent } from "./articles/articles.component";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, ArticlesComponent, RouterModule, MatToolbarModule, MatIcon, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class AppComponent implements OnInit {
  isUserLoggedIn: boolean = false;
  title:string = 'Good News Aggregator';

  constructor(private tokenStorageService: TokenStorageService){}
  ngOnInit(): void {
    this.isUserLoggedIn = this.tokenStorageService.getToken() != null;
  }

}
