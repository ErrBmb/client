import { Component, OnInit } from '@angular/core'
import { OfferItemComponent } from '../offer-item/offer-item.component'
import { NgFor } from '@angular/common'
import { Offer } from '../offer.interface'
import { OfferService } from '../offer.service'

@Component({
  selector: 'app-offers-list',
  standalone: true,
  imports: [OfferItemComponent, NgFor],
  templateUrl: './offers-list.component.html',
})
export class OffersListComponent implements OnInit {
  offers: Offer[] = []

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    // TODO: fetch service to get only the matching offers
    // this.offerService.getOffers().subscribe((offers) => {
    //   this.offers = offers;
    // });
    this.offers = this.offerService.getOffers()
  }
}
