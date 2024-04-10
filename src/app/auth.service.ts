import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginRequestType, LoginResponseType } from '../../libs/types/user'
import { Point } from 'geojson'
import { catchError, tap, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(mail: string, password: string) {
    return this.http
      .post<LoginResponseType>('/user/sign-in', {
        mail,
        password,
      } as LoginRequestType)
      .pipe(
        tap((response: LoginResponseType) => {
          this.setSession(response.token)
        }),
        catchError((e: Error) => {
          console.error('An error has occured: ' + e.message)
          return throwError(() => e)
        }),
      )
  }

  signup(
    last_name: string,
    first_name: string,
    birth_date: string,
    phone_number: string,
    mail: string,
    password: string,
    location: Point,
  ) {
    return this.http
      .post<LoginResponseType>('/user/sign-up', {
        last_name,
        first_name,
        birth_date,
        phone_number,
        mail,
        password,
        location,
      } as LoginRequestType)
      .pipe(
        tap((response: LoginResponseType) => {
          console.info('Account created')
          this.setSession(response.token)
        }),
        catchError((e: Error) => {
          console.error('An error has occured: ' + e.message)
          return throwError(() => e)
        }),
      )
  }

  private setSession(token: String) {
    // TODO: store token
    console.log('Received auth token: ' + token)
  }
}
