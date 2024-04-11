import { Component } from '@angular/core'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  template: '',
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.authService.logout()
    this.router.navigateByUrl('/')
  }
}
