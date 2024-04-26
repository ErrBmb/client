import { Component, ViewChild } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router, RouterLink } from '@angular/router'
import { AuthService } from '../auth.service'
import { FeatureComponent, NgxMapboxGLModule } from 'ngx-mapbox-gl'
import { MapMouseEvent } from 'mapbox-gl'
import { ErrorToastComponent } from '../error-toast/error-toast.component'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    NgxMapboxGLModule,
    ErrorToastComponent,
  ],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  @ViewChild('markerFeature', { static: false })
  markerFeature?: FeatureComponent
  error: string | undefined

  marker: GeoJSON.Point = {
    type: 'Point',
    coordinates: [2.3488, 48.85341],
  }

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
    let location = this.marker
    if (
      !(
        lastName &&
        firstName &&
        birthDate &&
        phone &&
        email &&
        password &&
        location
      )
    ) {
      this.error = 'Veuillez remplir tous les champs.'
      setInterval(() => {
        this.error = ''
      }, 2000)
      return
    }
    this.authService
      .signup(lastName, firstName, birthDate, phone, email, password, location)
      .subscribe({
        complete: () => {
          this.router.navigateByUrl('/')
        },
        error: (e: Error) => {
          this.error = 'Impossible de créer le compte.'
          setInterval(() => {
            this.error = ''
          }, 2000)
        },
      })
  }

  onMarkerDrag(event: MapMouseEvent) {
    this.marker.coordinates = event.lngLat.toArray()
  }

  onMapClick(event: MapMouseEvent) {
    this.marker.coordinates = event.lngLat.toArray()
    this.markerFeature!.updateCoordinates(this.marker.coordinates)
  }
}
