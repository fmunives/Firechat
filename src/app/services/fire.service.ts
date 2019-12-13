import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Messages } from '../interfaces/messages.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  private itemsCollection: AngularFirestoreCollection<Messages>;
  public LocalMessages: Messages[] = [];
  public user: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(u => {
      if (!u) {
        return;
      }
      this.user.name = u.displayName;
      this.user.uid = u.uid;
      this.user.photo = u.photoURL;
    });
  }

  login(provider: string) {
    if (provider === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }
  logout() {
    this.afAuth.auth.signOut();
    this.user = {};
  }

  loadMessages() {
    this.itemsCollection = this.afs.collection<Messages>('chats', ref =>
      ref.orderBy('date', 'desc').limit(10)
    );
    return this.itemsCollection.valueChanges().pipe(
      map((resp: Messages[]) => {
        this.LocalMessages = [];
        for (const item of resp) {
          this.LocalMessages.unshift(item);
        }
      })
    );
  }

  addMessage(text: string) {
    let message: Messages = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    };

    return this.itemsCollection.add(message);
  }
}
