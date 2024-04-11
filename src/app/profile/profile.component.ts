import { Component, ViewChild } from '@angular/core'
import { UserType } from '../../../libs/types/user'
import { AuthService } from '../auth.service'
import { Router } from '@angular/router'
import { Observable, tap } from 'rxjs'
import { AsyncPipe } from '@angular/common'
import { FeatureComponent, NgxMapboxGLModule } from 'ngx-mapbox-gl'

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AsyncPipe, NgxMapboxGLModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  user: Observable<UserType>

  @ViewChild('markerFeature', { static: false })
  markerFeature?: FeatureComponent

  marker: GeoJSON.Point = {
    type: 'Point',
    coordinates: [2.3488, 48.85341],
  }

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      if (!loggedIn) {
        this.router.navigateByUrl('/login')
      }
    })
    this.user = this.authService.getUser().pipe(
      tap((response: UserType) => {
        this.marker.coordinates = response.location.coordinates
      }),
    )
  }
}
