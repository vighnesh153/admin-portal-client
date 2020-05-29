import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private otpValue = environment.production ? '' : 'developer';

  get value() {
    return this.otpValue;
  }

  constructor() { }

  setValue(value: string) {
    this.otpValue = value;
  }
}
