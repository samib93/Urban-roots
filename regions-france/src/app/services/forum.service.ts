import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private apiUrl = 'http://localhost:5000/api/posts'; // URL de votre API

  constructor(private http: HttpClient) { }

  // Méthode pour obtenir les posts
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Méthode pour créer un nouveau post
  createPost(token: string, content: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { token, content });
  }
}
