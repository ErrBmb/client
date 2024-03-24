import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  userForm = new FormGroup({
    lastName: new FormControl(''),
    firstName: new FormControl(''),
    birthDate: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  onSubmit() {
    let lastName = this.userForm.value.lastName || ''
    let firstName = this.userForm.value.firstName || ''
    let birthDate = this.userForm.value.birthDate || ''
    let phone = this.userForm.value.phone || ''
    let email = this.userForm.value.email || ''
    let password = this.userForm.value.password || ''
    console.log(lastName + firstName + birthDate + phone + email + password)
    this.authService
      .signup(lastName, firstName, birthDate, phone, email, password)
      .subscribe(() => {
        console.log('Account created')
        this.router.navigateByUrl('/')
      })
  }
}
