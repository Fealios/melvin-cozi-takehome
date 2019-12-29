import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interest } from '../models/interest';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiBaseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  saveInterest(item: Interest): Observable<any> {
    console.log(item);
    return this.http.post(`${this.apiBaseURL}`, item);
  }
}