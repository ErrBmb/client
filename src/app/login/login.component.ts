import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
    this.authService.login(email, password).subscribe(() => {
      console.log('User is logged in')
      this.router.navigateByUrl('/')
    })
  }
}
