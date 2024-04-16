import { Component } from '@angular/core'
import { OfferItemComponent } from '../location-item/location-item.component'
import { AsyncPipe, NgFor, NgIf } from '@angular/common'
import { LocationService } from '../location.service'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Observable, catchError, throwError } from 'rxjs'
import { OfferType } from '../../../libs/types/research'
import { LocationType } from '../../../libs/types/location'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OfferItemComponent, NgFor, NgIf, ReactiveFormsModule, AsyncPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  locations: Observable<Array<LocationType>>

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
    // let city = this.searchForm.value.city || ''
    // if (city == '') {
    //   // TODO: handle error
    //   return
    // }
    // let checkInStr = this.searchForm.value.checkIn || ''
    // if (checkInStr == '') {
    //   // TODO: handle error
    //   return
    // }
    // let checkIn = new Date(checkInStr)
    // let checkOutStr = this.searchForm.value.checkOut || ''
    // if (checkOutStr == '') {
    //   // TODO: handle error
    //   return
    // }
    // let checkOut = new Date(checkOutStr)
    // let maxPrice = parseInt(this.searchForm.value.maxPrice || '-1')
    // let minRooms = parseInt(this.searchForm.value.minRooms || '1')
    // let minBeds = parseInt(this.searchForm.value.minBeds || '1')
    // let maxDistance = parseInt(this.searchForm.value.maxDistance || '10000')
    // console.log(
    //   'Search: ' +
    //     city +
    //     checkIn +
    //     checkOut +
    //     maxPrice +
    //     minRooms +
    //     minBeds +
    //     maxDistance,
    // )
    // this.locations = this.locationService
    //   .search(city, checkIn, checkOut, minRooms, minBeds, maxDistance)
    //   .pipe(
    //     catchError((e: Error) => {
    //       // TODO: handle error
    //       return throwError(() => e)
    //     }),
    //   )
  }
}
