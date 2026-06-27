import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:8000/';
  token = 'Token 5565132d2d3917fb4a87ed5ddff5b3814f69d396';

  httpHeaders = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Authorization', this.token);
  constructor(private http: HttpClient) {}
  
  getAllMembers():Observable<any> {
    return this.http.get(this.baseUrl + 'members/',
      {headers: this.httpHeaders}
    );
  };
  
  getMember(id: number):Observable<any> {
    return this.http.get(this.baseUrl + 'members/' + id + '/',
      {headers: this.httpHeaders}
    );
  };

  saveNewMember(member: any):Observable<any> {
    return this.http.post(this.baseUrl + 'members/',
      member,
      {headers: this.httpHeaders}
    );
  };
}
