import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  URL = 'http://localhost:3000/users';
  isAuthenticated = false;

  constructor(private http: HttpClient) { }

 
 
  getAllUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.URL}`)
  }

  updateUser(id, user):Observable<User[]>{
    return this.http.patch<User[]>(`${this.URL}/${id}`, user)
  }

  deleteUser(user):Observable<User[]>{
    console.log(user.id)
    return this.http.delete<User[]>(`${this.URL}/${user.id}` )
  }

  createUser(user):Observable<User[]>{
    return this.http.post<User[]>(`${this.URL}`, user )
  }

}
