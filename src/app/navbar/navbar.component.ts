import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../auth.service'
import { AsyncPipe, NgIf } from '@angular/common'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, AsyncPipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  public loggedIn: Observable<boolean>

  constructor(private authService: AuthService) {
    this.loggedIn = this.authService.isLoggedIn()
  }
}
