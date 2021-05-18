import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GetAllUsers } from '../action/authorization.actions';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  users;


  constructor(private store: Store, public router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userName': new FormControl(''),
      'password': new FormControl('')
    })
    this.GetAllUsers();
  }

  GetAllUsers(){
    this.store.dispatch(new GetAllUsers());
    this.store.subscribe(data => this.users = data.users.users)
  }

  login(){
    const userName = this.loginForm.value.userName;
    const userPassword = this.loginForm.value.password;
    this.users.forEach(user => {
      let {username, password} = user;
      if(userName === username && userPassword === password){
        localStorage.setItem('isLogged', 'true');
        localStorage.setItem('user', JSON.stringify(user))
        this.router.navigate(['home']);
        
      }else{
        console.log(username, password, userName, userPassword)
      }

    });
  }

  

}
