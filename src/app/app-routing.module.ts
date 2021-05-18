import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './start-page/login/login.component';
import { RegistrationComponent } from './start-page/registration/registration.component';
import {StartPageComponent} from './start-page/start-page.component'
import { HomeComponent } from './home/home.component'
import { UserInfoComponent } from './home/user-info/user-info.component';
import { CreateNewUserComponent } from './home/create-new-user/create-new-user.component';
import { SearchUserComponent } from './home/search-user/search-user.component';
import { HomeResolver } from './shared/resolvers/home.resolver';

const routes: Routes = [
  {path: '', redirectTo: 'start-page',  pathMatch: 'full' },
    {path: 'start-page', component: StartPageComponent},
    {path:'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'home', component: HomeComponent, children:[
      {
        path: 'user-info',
        component: UserInfoComponent
      },
      {
        path: 'user-create',
        component: CreateNewUserComponent
      },
      {
        path: 'user-search',
        component: SearchUserComponent,
        resolve:   {users : HomeResolver}
      },

    ]},
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
