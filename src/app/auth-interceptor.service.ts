import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = 'mon-token-d-authentification' // TODO: récupérer le token JWS depuis les cookies

    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })

    return next.handle(authReq)
  }
}