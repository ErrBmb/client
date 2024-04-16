import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'
import { LocationComponent } from './location/location.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'location/:id', component: LocationComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
]
