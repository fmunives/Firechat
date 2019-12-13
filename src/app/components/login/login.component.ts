import { Component, OnInit } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private firebase: FireService) {}

  ngOnInit() {}

  login(provider: string) {
    this.firebase.login(provider);
  }
}
