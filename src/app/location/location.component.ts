import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router, RouterLink } from '@angular/router'
import { LocationService } from '../location.service'
import { AsyncPipe, NgFor, NgIf } from '@angular/common'
import { ReviewService } from '../review.service'
import { BedroomType, LocationType } from '../../../libs/types/location'
import { ReviewType } from '../../../libs/types/review'
import { Observable } from 'rxjs'
import { AuthService } from '../auth.service'
import { FeatureComponent, NgxMapboxGLModule } from 'ngx-mapbox-gl'

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe, RouterLink, NgxMapboxGLModule],
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {
  location: LocationType | undefined
  reviews: Array<ReviewType> | undefined
  @Input() checkIn?: string
  @Input() checkOut?: string
  loggedIn: Observable<boolean>

  @ViewChild('markerFeature', { static: false })
  markerFeature?: FeatureComponent

  marker: GeoJSON.Point = {
    type: 'Point',
    coordinates: [2.3488, 48.85341],
  }

  constructor(
    private locationService: LocationService,
    private reviewService: ReviewService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private window: Window,
  ) {
    window.scrollTo(0, 0)
    this.loggedIn = this.authService.isLoggedIn()
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const locationId = String(params.get('id'))
      this.getLocation(locationId)
      this.getReviewsForLocation(locationId)
    })
  }

  getLocation(id: string) {
    this.locationService.getLocationById(id).subscribe({
      next: (location) => {
        this.marker.coordinates = location.location.coordinates
        this.location = location
      },
      error: (error) => this.router.navigateByUrl('/404'),
    })
  }

  getReviewsForLocation(id: string) {
    this.reviewService.getReviewsByLocationId(id).subscribe({
      next: (reviews) => (this.reviews = reviews),
    })
  }

  floor(n: number) {
    return Math.floor(n)
  }

  sumBeds(bedrooms: Array<BedroomType>): number {
    return bedrooms.reduce((acc, val) => acc + val.total_capacity, 0)
  }

  localeDateString(date: string) {
    return new Date(date).toLocaleDateString()
  }
}
