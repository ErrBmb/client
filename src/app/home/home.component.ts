import { Component } from '@angular/core'
import { OfferItemComponent } from '../offer-item/offer-item.component'
import { NgFor } from '@angular/common'
import { Offer } from '../offer.interface'
import { OfferService } from '../offer.service'
import { Router } from '@angular/router'
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OfferItemComponent, NgFor, ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  offers: Offer[] = []

  constructor(
    private offerService: OfferService,
    private router: Router,
  ) {}

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
    let checkIn = this.searchForm.value.checkIn || ''
    let checkOut = this.searchForm.value.checkOut || ''
    let maxPrice = this.searchForm.value.maxPrice || ''
    let minRooms = this.searchForm.value.minRooms || ''
    let minBeds = this.searchForm.value.minBeds || ''
    let maxDistance = this.searchForm.value.maxDistance || ''
    // TODO: fetch service to get only the matching offers and update the offers list
    // this.offerService
    //   .search(city, checkIn, checkOut, maxPrice, minRooms, minBeds, maxDistance)
    //   .subscribe((offers) => {
    //     console.log('Offers search done')
    //
    //     this.offers = offers
    //   })
    this.offers = this.offerService.getOffers()
  }

  ngOnInit(): void {
    // TODO: fetch service to get all offers
    // this.offerService.getOffers().subscribe((offers) => {
    //   this.offers = offers;
    // });
    this.offers = this.offerService.getOffers()
  }
}
