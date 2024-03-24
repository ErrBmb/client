import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginRequestType, LoginResponseType } from '../../libs/types/user'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<LoginRequestType>('/api/login', { email, password })
  }

  signup(
    last_name: string,
    first_name: string,
    birth_date: string,
    phone: string,
    email: string,
    password: string,
  ) {
    return this.http.post<LoginRequestType>('/api/signup', {
      last_name,
      first_name,
      birth_date,
      phone,
      email,
      password,
    })
  }

  private setSession(authResult: LoginResponseType) {
    // TODO
    console.log('Received auth token: ' + authResult.token)
  }
}
