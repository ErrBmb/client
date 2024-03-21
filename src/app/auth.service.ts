import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginRequestType } from '../../libs/types/src'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<LoginRequestType>('/api/login', { email, password })
  }

  private setSession(authResult: any) {
    // TODO
    console.log(authResult.idToken)
  }
}
