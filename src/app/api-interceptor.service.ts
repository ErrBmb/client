import { Injectable } from '@angular/core'
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../environments/environment'

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const apiBaseUrl = environment.API_BASE_URL

    const apiBaseUrlReq = request.clone({
      url: apiBaseUrl + request.url,
    })

    return next.handle(apiBaseUrlReq)
  }
}
