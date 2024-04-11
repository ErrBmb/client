import { Component } from '@angular/core'
import { UserType } from '../../../libs/types/user'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  public user: Observable<UserType>

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      if (!loggedIn) {
        this.router.navigateByUrl('/login')
      }
    })
    this.user = this.authService.getUser()
  }
}
