import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';

import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/navBar/nav-bar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { CandidateService } from './services/candidate.service';
// import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NavBarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ValidateService, AuthService, CandidateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
