import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule  }   from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import {MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { AuthorizationState } from './start-page/state/authorization.state'
import { UserState } from './home/state/user.state'
import { StartPageComponent } from './start-page/start-page.component';
import { LoginComponent } from './start-page/login/login.component';
import { RegistrationComponent } from './start-page/registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UserInfoComponent } from './home/user-info/user-info.component';
import { CreateNewUserComponent } from './home/create-new-user/create-new-user.component';
import { SearchUserComponent } from './home/search-user/search-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeResolver } from './shared/resolvers/home.resolver';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    UserInfoComponent,
    CreateNewUserComponent,
    SearchUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    NgxsModule.forRoot([
      AuthorizationState,
      UserState
    ]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [HomeResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
