import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inquiry } from '../models/inquiry';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiBaseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getAllInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(this.apiBaseURL);
  }

  saveInterest(item: Inquiry): Observable<any> {
    return this.http.post(this.apiBaseURL, item);
  }
}