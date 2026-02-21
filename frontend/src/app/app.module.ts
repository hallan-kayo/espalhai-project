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
import { LandingPageComponent } from './components/landing-page.component';
import { FavoritesComponent } from './components/favorites.component';
import { UserProfileComponent } from './components/user-profile.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) return true;
  return router.parseUrl('/landing');
};

const routes: Routes = [
  { path: 'landing', component: LandingPageComponent },
  { path: 'home', component: AdListComponent, canActivate: [authGuard] },
  { path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'ad/create', component: AdCreateComponent, canActivate: [authGuard] },
  { path: 'chat', component: ChatComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminPanelComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'user/:id', component: UserProfileComponent, canActivate: [authGuard] },
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
    ProfileComponent,
    LandingPageComponent,
    FavoritesComponent,
    UserProfileComponent
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
