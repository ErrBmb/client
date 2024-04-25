import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, catchError, tap, throwError } from 'rxjs'
import { ReviewType } from '../../libs/types/review'

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getReviewsByLocationId(id: string): Observable<Array<ReviewType>> {
    return this.http.get<Array<ReviewType>>('/offers/' + id + '/reviews').pipe(
      tap((response: Array<ReviewType>) => {
        console.info('Reviews found for location #' + id)
        console.info(response)
      }),
      catchError((e: Error) => {
        console.error('An error has occured: ' + e.message)
        return throwError(() => e)
      }),
    )
  }
}
