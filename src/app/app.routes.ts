import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { OffersListComponent } from './offers-list/offers-list.component'
import { LoginComponent } from './login/login.component'
import { SignupComponent } from './signup/signup.component'

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'offers', component: OffersListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
]
