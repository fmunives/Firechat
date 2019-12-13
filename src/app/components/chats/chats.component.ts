import { Component, OnInit } from '@angular/core';
import { FireService } from '../../services/fire.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {
  message = '';
  chat: any;
  loading = true;
  constructor(public firebase: FireService) {
    this.firebase.loadMessages().subscribe(() => {
      setTimeout(() => {
        this.chat.scrollTop = this.chat.scrollHeight;
      }, 20);
      this.loading = false;
    });
  }

  ngOnInit() {
    this.chat = document.getElementById('chat');
  }

  sendMessage() {
    if (this.message.length === 0) {
      return;
    }
    this.firebase.addMessage(this.message).then(() => {
      this.message = '';
    });
  }

  logout() {
    this.firebase.logout();
  }
}
