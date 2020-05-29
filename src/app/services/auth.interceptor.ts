import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { OtpService } from 'src/app/services/otp.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private otpService: OtpService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.method.toUpperCase() !== 'GET' && request.body) {
      const clonedRequest = request.clone({
        body: {
          ...request.body,
          password: this.otpService.value
        }
      });
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }
}
