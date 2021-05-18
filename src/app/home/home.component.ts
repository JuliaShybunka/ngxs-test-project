import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: boolean = false;
  constructor(public router: Router) { }

  ngOnInit() {
    const isLogged = localStorage.getItem('isLogged')
    if(isLogged == 'true'){
      return
    }else{
      this.router.navigate(['/'])
    }

  }

  hideSidebar(){
    this.status = !this.status; 
  }

  logout(){
    localStorage.removeItem('user');
    localStorage.setItem('isLogged', 'false');
    this.router.navigate(['/'])
  }

}
