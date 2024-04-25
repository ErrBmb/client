import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, tap, throwError } from 'rxjs'
import { Offer } from './offer.interface'
import { ResearchType } from '../../libs/types/research'
import { LocationType } from '../../libs/types/location'
import { ReservationType } from '../../libs/types/reservation'

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  offersMock: Offer[] = [
    {
      id: 1,
      checkIn: new Date('04-13-2024'),
      checkOut: new Date('04-15-2024'),
      city: 'Marseille',
      price: 650,
      rooms: 1,
      beds: 2,
      distance: 230,
      imageUrl:
        'https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156_960_720.jpg',
      stars: 4.5,
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
      stars: 4.3,
    },
    {
      id: 3,
      checkIn: new Date('04-13-2024'),
      checkOut: new Date('04-15-2024'),
      city: 'Toulouse',
      price: 230,
      rooms: 1,
      beds: 1,
      distance: 422,
      imageUrl:
        'https://cdn.pixabay.com/photo/2017/02/07/18/16/living-room-2046668_960_720.jpg',
      stars: 4.7,
    },
    {
      id: 4,
      checkIn: new Date('04-13-2024'),
      checkOut: new Date('04-15-2024'),
      city: 'Montpellier',
      price: 432,
      rooms: 2,
      beds: 7,
      distance: 68,
      imageUrl:
        'https://cdn.pixabay.com/photo/2016/11/19/13/06/bed-1839183_960_720.jpg',
      stars: 4.1,
    },
    {
      id: 5,
      checkIn: new Date('04-13-2024'),
      checkOut: new Date('04-15-2024'),
      city: 'Paris',
      price: 139,
      rooms: 3,
      beds: 3,
      distance: 237,
      imageUrl:
        'https://cdn.pixabay.com/photo/2020/11/24/11/36/bedroom-5772286_960_720.jpg',
      stars: 4.0,
    },
    {
      id: 6,
      checkIn: new Date('04-13-2024'),
      checkOut: new Date('04-15-2024'),
      city: 'Montpellier',
      price: 869,
      rooms: 1,
      beds: 9,
      distance: 491,
      imageUrl:
        'https://cdn.pixabay.com/photo/2016/12/30/07/55/bedroom-1940168_960_720.jpg',
      stars: 3.9,
    },
  ]

  constructor(private http: HttpClient) {}

  // getOffersMock(): Offer[] {
  //   return this.offersMock
  // }

  getLocationMockById(id: number): Offer | any {
    let location = this.offersMock.find((o) => o.id == id)
    return location
  }

  getLocationById(id: string): Observable<LocationType> {
    return this.http.get<LocationType>('/location/' + id).pipe(
      tap((response: LocationType) => {
        console.info('Location #' + id + ' found')
        console.info(response)
      }),
      catchError((e: Error) => {
        console.error('An error has occured: ' + e.message)
        return throwError(() => e)
      }),
    )
  }

  getLocations(): Observable<Array<LocationType>> {
    return this.http.get<Array<LocationType>>('/locations').pipe(
      tap((response: Array<LocationType>) => {
        console.info('Locations found (all)')
        console.info(response)
      }),
      catchError((e: Error) => {
        console.error('An error has occured: ' + e.message)
        return throwError(() => e)
      }),
    )
  }

  search(
    place: string,
    checkIn: Date,
    checkOut: Date,
    bedrooms: number | undefined,
    beds: number | undefined,
    distance: number | undefined,
    maxPrice: number | undefined,
  ): Observable<Array<LocationType>> {
    return this.http
      .post<Array<LocationType>>('/search', {
        place,
        checkIn,
        checkOut,
        bedrooms,
        beds,
        distance,
        maxPrice,
      } as ResearchType)
      .pipe(
        tap((response: Array<LocationType>) => {
          console.info('Offers found (search)')
          console.info(response)
        }),
        catchError((e: Error) => {
          console.error('An error has occured: ' + e.message)
          return throwError(() => e)
        }),
      )
  }

  book(location: string, start: Date, end: Date): Observable<ReservationType> {
    return this.http
      .post<ReservationType>('/book', {
        location,
        start,
        end,
      } as ReservationType)
      .pipe(
        tap((response: ReservationType) => {
          if (response) {
            console.info('Location successfully booked')
          }
        }),
        catchError((e: Error) => {
          console.error('An error has occured: ' + e.message)
          return throwError(() => e)
        }),
      )
  }

  available(location: string, start: Date, end: Date): Observable<boolean> {
    return this.http
      .post<boolean>('/book/available', {
        location,
        start,
        end,
      } as ReservationType)
      .pipe(
        tap((response: boolean) => {
          if (response) {
            console.info('Location available')
          } else {
            console.info('Location unavailable')
          }
        }),
        catchError((e: Error) => {
          console.error('An error has occured: ' + e.message)
          return throwError(() => e)
        }),
      )
  }
}
