import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { LoginType } from '../../libs/types/src'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<LoginType>('/api/login', { email, password })
  }

  private setSession(authResult: any) {
    // TODO
    console.log(authResult.idToken)
  }
}
