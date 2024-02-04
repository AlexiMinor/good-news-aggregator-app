import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public currentToken: Observable<Token | null>;
  private currentTokenSubject: BehaviorSubject<Token | null>;

  constructor() {
    this.currentTokenSubject = new BehaviorSubject<Token | null>(this.getTokenFromStorage());
    this.currentToken = this.currentTokenSubject.asObservable();

    this.currentTokenSubject.subscribe(value =>
      localStorage.setItem('token', JSON.stringify(value)));

  }

  public getToken(): Token | null {
    return this.currentTokenSubject.value;
  }

  public removeToken(): void {
    this.currentTokenSubject.next(null);
  }

  public setToken(token: Token): void {
    this.currentTokenSubject.next(token);
  }

  private getTokenFromStorage(): Token | null {
    const tokenString = JSON.parse((localStorage.getItem('token') ?? "null" )) ;
    if (tokenString)
      return tokenString as Token;
    else
      return null
  }

}
