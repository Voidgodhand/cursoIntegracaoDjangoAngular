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
  constructor(private http: HttpClient) { }

  getMember(id: number):Observable<any> {
    return this.http.get(this.baseUrl + 'members/' + id + '/',
      {headers: this.httpHeaders}
    );
  };

  updateMember(member: any):Observable<any> {
    let body = { name: member.name, surname: member.surname, phone: member.phone , email: member.email, address: member.address, photo: member.photo};
    return this.http.put(this.baseUrl + 'members/' + member.id + '/', body,
      {headers: this.httpHeaders}
    );
  };

  deleteMember(id: number):Observable<any> {
    return this.http.delete(this.baseUrl + 'members/' + id + '/',
      {headers: this.httpHeaders}
    );
  };
}
