import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  private apiUrl = 'http://localhost:3000/dashboard/candidates';

  constructor(private httpclient: HttpClient) { }

  getCandidates() {
    return this.httpclient.get(this.apiUrl)
    .pipe(map(res => res));
  }

}
