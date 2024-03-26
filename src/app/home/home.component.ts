import { Component } from '@angular/core'
import { OfferItemComponent } from '../offer-item/offer-item.component'
import { NgFor } from '@angular/common'
import { Offer } from '../offer.interface'
import { OfferService } from '../offer.service'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OfferItemComponent, NgFor],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  offers: Offer[] = []

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    // TODO: fetch service to get all offers
    // this.offerService.getOffers().subscribe((offers) => {
    //   this.offers = offers;
    // });
    this.offers = this.offerService.getOffers()
  }
}
