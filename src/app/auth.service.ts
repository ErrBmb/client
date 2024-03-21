import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AuthRequest } from './user.interface'

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthRequest>('/api/login', { email, password })
  }

  private setSession(authResult: any) {
    // TODO
    console.log(authResult.idToken)
  }
}
