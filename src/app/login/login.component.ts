import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  userForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit() {
    let email = this.userForm.value.email || ''
    let password = this.userForm.value.password || ''
    this.authService.login(email, password).subscribe({
      complete: () => {
        console.info('User is logged in')
        this.router.navigateByUrl('/')
      },
      error: (e: Error) => {
        // TODO: handle error
      },
    })
  }
}
