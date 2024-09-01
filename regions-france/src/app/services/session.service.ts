import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Assurez-vous que cette voie d'accès est correcte

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrl = `${environment.apiUrl}/api/sessions`;
  constructor(private http: HttpClient) {}

  createSession(sessionData: { email: string, lat: number, lng: number }) {
    return this.http.post(`${this.apiUrl}`, sessionData);
  }

  // Ajoutez cette méthode pour récupérer les données de la dernière session
  getSessionData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/latest`); // Assurez-vous que 'latest' correspond à votre route API pour obtenir la dernière session
  }

  getUserSessions(email: string): Observable<any[]> {
    let params = new HttpParams().set('email', email);
    return this.http.get<any[]>(`${this.apiUrl}/user`, { params: params });
  }
  
}
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiUrl = 'http://localhost:5000/api/posts';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createPost(content: string, token: string): Observable<any> {
    return this.http.post(this.apiUrl, { content, token });
  }
}