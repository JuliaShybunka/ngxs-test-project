import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterUser } from '../action/authorization.actions';
import { Store } from '@ngxs/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup
  constructor(private store: Store, public router: Router) { }

  ngOnInit() {
    this.registrationForm = new FormGroup({
      'username': new FormControl(''),
      'email': new FormControl(''),
      'password': new FormControl('')
    })
  }

  registerNewUser(){
    const userData = this.registrationForm.value
    this.store.dispatch(new RegisterUser(userData))
    this.store.subscribe(data => console.log(data))
    this.router.navigate(['/'])
  }

}
