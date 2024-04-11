import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  LoginRequestType,
  LoginResponseType,
  UserType,
} from '../../libs/types/user'
import { Point } from 'geojson'
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean>

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {
    this.loggedIn = new BehaviorSubject(cookieService.check('auth-token'))
  }

  login(mail: string, password: string) {
    return this.http
      .post<LoginResponseType>('/user/sign-in', {
        mail,
        password,
      } as LoginRequestType)
      .pipe(
        tap((response: LoginResponseType) => {
          console.info('Logged in')
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

  logout() {
    console.info('Logging out')
    this.cookieService.delete('auth-token')
    this.loggedIn.next(false)
  }

  private setSession(token: string) {
    console.log('Received auth token: ' + token)
    this.cookieService.set('auth-token', token)
    this.loggedIn.next(true)
  }

  getUser(): Observable<UserType> {
    return this.http.get<UserType>('/user/personal-info').pipe(
      tap((response: UserType) => {
        console.info('User info retrieved')
      }),
      catchError((e: Error) => {
        console.error('An error has occured: ' + e.message)
        return throwError(() => e)
      }),
    )
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable()
  }
}
