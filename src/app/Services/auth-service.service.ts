import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, User } from '../Interface/model';
import { Observable } from 'rxjs';
import { Environment } from '../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }



  addNewUser(obj: User): Observable<User[]>{
    return this.http.post<User[]>(`${Environment.API_URL}signup`, obj)
  }

  logUser(obj: User): Observable<ApiResponse>{
    return this.http.post<ApiResponse>(`${Environment.API_URL}login`, obj)
  }

  getUser() : Observable<ApiResponse>{
    return this.http.get<ApiResponse>(`${Environment.API_URL}profile`)
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
  }

}
