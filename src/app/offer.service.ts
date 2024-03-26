import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Offer } from './offer.interface'

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private baseUrl = '' // TODO

  constructor(private http: HttpClient) {}

  // TODO
  // getOffers(): Observable<Offer[]> {
  //   return this.http.get<Offer[]>(`${this.baseUrl}/offers`);
  // }

  getOffers(): Offer[] {
    let offersMock: Offer[] = [
      {
        id: 1,
        checkIn: new Date('04-13-2024'),
        checkOut: new Date('04-15-2024'),
        city: 'Montpellier',
        price: 650,
        rooms: 1,
        beds: 2,
        distance: 230,
        imageUrl:
          'https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_960_720.jpg',
      },
      {
        id: 2,
        checkIn: new Date('04-11-2024'),
        checkOut: new Date('04-19-2024'),
        city: 'Montpellier',
        price: 1230,
        rooms: 2,
        beds: 3,
        distance: 4023,
        imageUrl:
          'https://cdn.pixabay.com/photo/2020/10/18/09/16/bedroom-5664221_960_720.jpg',
      },
      {
        id: 3,
        checkIn: new Date('04-13-2024'),
        checkOut: new Date('04-15-2024'),
        city: 'Montpellier',
        price: 230,
        rooms: 1,
        beds: 1,
        distance: 422,
        imageUrl:
          'https://cdn.pixabay.com/photo/2017/02/07/18/16/living-room-2046668_960_720.jpg',
      },
    ]
    return offersMock
  }
}
