import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  URL = 'http://localhost:3000/users';
  isAuthenticated = false;
  constructor(private http: HttpClient) { }

 
  isLogetIn(){
    return this.isAuthenticated
  }
  getAllUsers():Observable<any>{
    return this.http.get(`${this.URL}`)
  }

  registerUser(user: User):Observable<any>{
    return this.http.post(`${this.URL}`, user)
  }
}
