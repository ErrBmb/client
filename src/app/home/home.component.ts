import { Component } from '@angular/core'
import { OfferItemComponent } from '../location-item/location-item.component'
import { AsyncPipe, NgFor, NgIf } from '@angular/common'
import { LocationService } from '../location.service'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Observable, catchError, throwError } from 'rxjs'
import { LocationType } from '../../../libs/types/location'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OfferItemComponent, NgFor, NgIf, ReactiveFormsModule, AsyncPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  locations: Observable<Array<LocationType>>
  checkIn: string | undefined
  checkOut: string | undefined

  constructor(private locationService: LocationService) {
    this.locations = this.locationService.getLocations()
  }

  searchForm = new FormGroup({
    city: new FormControl(''),
    checkIn: new FormControl(''),
    checkOut: new FormControl(''),
    maxPrice: new FormControl(''),
    minRooms: new FormControl(''),
    minBeds: new FormControl(''),
    maxDistance: new FormControl(''),
  })

  onSubmit() {
    let city = this.searchForm.value.city || ''
    this.checkIn = this.searchForm.value.checkIn || ''
    if (this.checkIn == '') {
      // TODO: handle error
      return
    }
    let checkIn = new Date(this.checkIn)
    this.checkOut = this.searchForm.value.checkOut || ''
    if (this.checkOut == '') {
      // TODO: handle error
      return
    }
    let checkOut = new Date(this.checkOut)
    let maxPrice = !this.searchForm.value.maxPrice
      ? undefined
      : parseInt(this.searchForm.value.maxPrice)
    let minRooms = !this.searchForm.value.minRooms
      ? undefined
      : parseInt(this.searchForm.value.minRooms)
    let minBeds = !this.searchForm.value.minBeds
      ? undefined
      : parseInt(this.searchForm.value.minBeds)
    let maxDistance = !this.searchForm.value.maxDistance
      ? undefined
      : parseInt(this.searchForm.value.maxDistance)
    console.log(
      'Search: ' +
        city +
        this.checkIn +
        this.checkOut +
        maxPrice +
        minRooms +
        minBeds +
        maxDistance,
    )
    this.locations = this.locationService
      .search(city, checkIn, checkOut, minRooms, minBeds, maxDistance, maxPrice)
      .pipe(
        catchError((e: Error) => {
          // TODO: handle error
          return throwError(() => e)
        }),
      )
  }
}
