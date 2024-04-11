import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { CookieService } from 'ngx-cookie-service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!this.cookieService.check('auth-token')) {
      console.info('No auth token found, skipping authentication')
      return next.handle(request)
    }

    console.info('Auth token found, adding authorization token')
    const token = this.cookieService.get('auth-token')

    const authReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })

    return next.handle(authReq)
  }
}
