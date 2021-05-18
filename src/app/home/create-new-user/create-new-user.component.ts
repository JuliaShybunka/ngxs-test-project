import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { CreateUser } from '../action/user.action';
import { Store } from '@ngxs/store';
import {
  passwordValidator,
  phoneNumberValidator,
  firstNameValidator,
  lastNameValidator,
  emailValidator
} from '../../shared/validators/validator';


@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.component.html',
  styleUrls: ['./create-new-user.component.css']
})
export class CreateNewUserComponent implements OnInit {
  createUserForm: FormGroup;
  passwordMatch: false;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {

    this.createUserForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, firstNameValidator]),
      'lastName': new FormControl('', [Validators.required, lastNameValidator]),
      'username': new FormControl('', [Validators.required, firstNameValidator]),
      'phone': new FormControl('', [Validators.required, phoneNumberValidator]),
      'email': new FormControl('', [Validators.required, emailValidator]),
      'password': new FormControl('', [Validators.required, passwordValidator]),
      'confirmPassword': new FormControl(['', [Validators.required, passwordValidator]]), 
    }
    
    );
    
  }

 
  createUser(){
    if(this.createUserForm.get('password').value === this.createUserForm.get('confirmPassword').value){
      this.passwordMatch = false;
      this.store.dispatch( new CreateUser(this.createUserForm.value)).subscribe((res)=>{
        console.log(res)
      })

    }else{
      this.passwordMatch = true;
    }
    
  }

}
