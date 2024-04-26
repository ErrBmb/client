import { Component } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../auth.service'
import { ErrorToastComponent } from '../error-toast/error-toast.component'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, RouterLink, ReactiveFormsModule, ErrorToastComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  error: string | undefined

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
    if (!email) {
      this.error = 'Veuillez saisir une adresse mail.'
      setInterval(() => {
        this.error = ''
      }, 2000)
      return
    }
    if (!password) {
      this.error = 'Veuillez saisir un mot de passe.'
      setInterval(() => {
        this.error = ''
      }, 2000)
      return
    }
    this.authService.login(email, password).subscribe({
      complete: () => {
        console.info('User is logged in')
        this.router.navigateByUrl('/')
      },
      error: (e: Error) => {
        this.error = 'Email ou mot de passe incorrect.'
        setInterval(() => {
          this.error = ''
        }, 2000)
      },
    })
  }
}
