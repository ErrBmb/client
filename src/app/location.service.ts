import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, tap, throwError } from 'rxjs'
import { ResearchType } from '../../libs/types/research'
import { LocationType } from '../../libs/types/location'
import { ReservationType } from '../../libs/types/reservation'

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

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
