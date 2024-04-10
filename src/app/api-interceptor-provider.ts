import { Provider } from '@angular/core'

import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { ApiInterceptor } from './api-interceptor.service'

export const apiInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true,
}
