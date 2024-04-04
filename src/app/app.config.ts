import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http'
import { AuthInterceptor } from './auth-interceptor.service'
import { ApiInterceptor } from './api-interceptor.service'
import { NgxMapboxGLModule } from 'ngx-mapbox-gl'
import { environment } from '../environments/environment'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    { provide: Window, useValue: window },
    importProvidersFrom(
      NgxMapboxGLModule.withConfig({
        accessToken: environment.MAPBOX_TOKEN,
      }),
    ),
  ],
}
