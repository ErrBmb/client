import { Component, OnInit } from '@angular/core';
import { OfferComponent } from '../offer/offer.component';
import { NgFor } from '@angular/common';
import { Offer } from '../offer.interface';
import { OfferService } from '../offer.service';

@Component({
  selector: 'app-offers-list',
  standalone: true,
  imports: [
    OfferComponent,
    NgFor,
  ],
  templateUrl: './offers-list.component.html',
  styleUrl: './offers-list.component.css'
})
export class OffersListComponent implements OnInit {
  offers: Offer[] = [];

  constructor(private offerService: OfferService) {}

  ngOnInit(): void {
    // TODO
    // this.offerService.getOffers().subscribe((offers) => {
    //   this.offers = offers;
    // });
    this.offers = this.offerService.getOffers();
  }
}
