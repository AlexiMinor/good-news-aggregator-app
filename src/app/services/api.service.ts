import { HttpClient, HttpClientModule, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import queryString from 'query-string';
import { Observable } from 'rxjs';
import { environment } from '../../environments/envoronment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private getUrl(url: string): string {
    return environment.apiUrl + url;
  }

  get(url: string, data: object = {}): Observable<any | null> {
    if (Object.keys(data).length > 0) {
      url += '?' + queryString.stringify(data);
    }
    return this.http.get(this.getUrl(url)).pipe(data => {return data});
  }

  post(url: string, data: object, options: object={}): Observable<any> {
    return this.http.post(this.getUrl(url), data, options);
  }

  request(method: string, url: string, data: object, options: object={}): Observable<any> {
    const request = new HttpRequest(method, this.getUrl(url), data, options);
    return this.http.request(request);
  }
}

//get -> domain.com/api/v1/users

//post -> domain.com/api/v1/articles

//delete -> domain.com/api/v1/articles/15
