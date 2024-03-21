import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const apiBaseUrl = 'http://localhost:3000'

    const apiBaseUrlReq = request.clone({
      url: apiBaseUrl + request.url,
    })

    return next.handle(apiBaseUrlReq)
  }
}
