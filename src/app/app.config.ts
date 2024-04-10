import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'
import { HttpClientModule } from '@angular/common/http'
import { NgxMapboxGLModule } from 'ngx-mapbox-gl'
import { environment } from '../environments/environment'
import { apiInterceptorProvider } from './api-interceptor-provider'
import { authInterceptorProvider } from './auth-interceptor-provider'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    apiInterceptorProvider,
    authInterceptorProvider,
    { provide: Window, useValue: window },
    importProvidersFrom(
      NgxMapboxGLModule.withConfig({
        accessToken: environment.MAPBOX_TOKEN,
      }),
    ),
  ],
}
