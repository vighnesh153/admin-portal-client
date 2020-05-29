import { Component, OnInit } from '@angular/core';
import { OtpService } from 'src/app/services/otp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  password = '';

  constructor(private otpService: OtpService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.otpService.setValue(this.password);
    this.router.navigate(['/home']).then();
  }
}
