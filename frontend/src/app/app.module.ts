import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { SignupComponent } from './components/signup.component';
import { AdListComponent } from './components/ad-list.component';
import { AdCreateComponent } from './components/ad-create.component';
import { ChatComponent } from './components/chat.component';
import { AdminPanelComponent } from './components/admin-panel.component';
import { ProfileComponent } from './components/profile.component';
import { AuthInterceptor } from './services/auth.interceptor';

const routes: Routes = [
  { path: 'home', component: AdListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'ad/create', component: AdCreateComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AdListComponent,
    AdCreateComponent,
    ChatComponent,
    AdminPanelComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
