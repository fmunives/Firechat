import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Messages } from './interfaces/messages.interface';
import { FireService } from './services/fire.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  messages: Messages[] = [];
  loading: boolean = true;
  constructor(db: AngularFirestore, public firebase: FireService) {
    this.loading = false;
  }
}
