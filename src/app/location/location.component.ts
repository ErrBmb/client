import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LocationService } from '../location.service'
import { AsyncPipe, NgFor, NgIf } from '@angular/common'
import { ReviewService } from '../review.service'
import { BedroomType, LocationType } from '../../../libs/types/location'
import { ReviewType } from '../../../libs/types/review'

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  templateUrl: './location.component.html',
})
export class LocationComponent implements OnInit {
  location: LocationType | undefined
  reviews: Array<ReviewType> | undefined
  checkIn: Date | undefined
  checkOut: Date | undefined

  constructor(
    private locationService: LocationService,
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private router: Router,
    private window: Window,
  ) {
    window.scrollTo(0, 0)
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const locationId = String(params.get('id'))
      this.getLocation(locationId)
      this.getReviewsForLocation(locationId)
    })

    this.route.queryParams.subscribe((params) => {
      this.checkIn = new Date(params['checkIn'])
      this.checkOut = new Date(params['checkOut'])
    })
  }

  getLocation(id: string) {
    this.locationService.getLocationById(id).subscribe({
      next: (location) => (this.location = location),
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
}
