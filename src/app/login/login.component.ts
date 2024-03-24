import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
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
    console.log(
      'form is ' +
        this.userForm.value.email +
        ', ' +
        this.userForm.value.password,
    )
    let email = this.userForm.value.email || ''
    let password = this.userForm.value.password || ''
    this.authService.login(email, password).subscribe(() => {
      console.log('User is logged in')
      this.router.navigateByUrl('/')
    })
  }
}
