import { Component, Input } from '@angular/core'
import { RouterLink } from '@angular/router'
import { BedroomType, LocationType } from '../../../libs/types/location'
import { NgIf } from '@angular/common'

@Component({
  selector: 'app-location-item',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './location-item.component.html',
})
export class OfferItemComponent {
  @Input() location!: LocationType

  sumBeds(bedrooms: Array<BedroomType>): number {
    return bedrooms.reduce((acc, val) => acc + val.total_capacity, 0)
  }
}
