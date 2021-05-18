import { Component, OnInit, ViewChild } from '@angular/core';
import { GetAllUsers, UpdateUser, DeleteUser } from '../action/user.action';
import { Store } from '@ngxs/store';
import {MatDialog} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  users = [];
  updateUser;
  mainInfo = [];
  dialogRef;
  data;

  @ViewChild('updateUser') updateUserModal;
  updateUserForm: FormGroup
  searchForm: FormGroup
  
  constructor(
    private store: Store,
     public dialog: MatDialog, 
     public activatedRoute: ActivatedRoute,

    ) { 

      activatedRoute.data.subscribe(resolvedData =>{
        this.users = resolvedData.users.allUsers
        this.mainInfo = this.users
      })
    }

  ngOnInit() {
    this.searchForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'username': new FormControl(''),
      'email': new FormControl(''),
      'phone': new FormControl('')
    })

 

  }

  deleteUser(user){
    console.log(user)
    this.store.dispatch(new DeleteUser(user)).subscribe((res)=>{
      console.log(res)
      this.users = res.allUsers;
      this.mainInfo = [...this.users]
    });
  }

  updateUserOpenModal(user){
    this.updateUserForm = new FormGroup({
      'username': new FormControl(user.username),
      'email': new FormControl(user.email),
      'firstName': new FormControl(user.firstName),
      'lastName': new FormControl(user.lastName),
      'phone': new FormControl(user.phone),
    })
    this.updateUser = user;

    this.dialogRef = this.dialog.open(this.updateUserModal);
  }

  updateUserInfo(){
    this.updateUser = {...this.updateUser, username: this.updateUserForm.get('username').value}
    this.updateUser.email = this.updateUserForm.get('email').value;
    this.store.dispatch(new UpdateUser(this.updateUser)).subscribe((res)=>{
      this.users = res.allUsers;
      this.dialogRef.close();
    });

  }

  searchUsers(){
    this.mainInfo = [];
      this.users.map(user => {
        for (const key in this.searchForm.value) {
          console.log( user)
          if(user[key]){
            if (this.searchForm.value[key] !== '' && user[key].toLowerCase().includes(this.searchForm.value[key].toLowerCase())) {
              this.mainInfo = [...this.mainInfo, user];
            }
          }
         
        }
      });
      console.log(this.mainInfo)
  }

  clearSearch(){
    this.mainInfo = [...this.users]
    
    //this.searchForm.reset()
  
  }

}
