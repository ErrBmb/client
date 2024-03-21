import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Offer } from '../offer.interface';

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './offer.component.html',
  styleUrl: './offer.component.css'
})
export class OfferComponent {
  @Input() offer!: Offer;
}
