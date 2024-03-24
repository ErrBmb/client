import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { Offer } from '../offer.interface'

@Component({
  selector: 'app-offer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './offer.component.html',
})
export class OfferComponent {
  @Input() offer!: Offer
}
