import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Offer } from '../offer.interface'

@Component({
  selector: 'app-offer-item',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './offer-item.component.html',
})
export class OfferItemComponent {
  @Input() offer!: Offer
}
