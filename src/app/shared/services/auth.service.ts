import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase';
import {PostService} from '../../components/posts/post.service';
import {FileI} from '../models/file.interface';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userData$: Observable<firebase.User>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor( private afAuth: AngularFireAuth,
               private posServ: PostService,
               private storage: AngularFireStorage) {
    this.userData$ = afAuth.authState;
  }

  loginByEmail( user: UserI ): Promise<any> {
    const { email, password } = user;
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): void {
     this.afAuth.signOut();
  }
  preSaveUserProfolio( user: UserI, image?: FileI): void {
    if (image) {
      this.uploadImage(user, image);
      console.log(user, 'se gurado imagen');
    } else {
      this.saverUsrProfile(user);
      console.log(user, 'se guardo el nombre');
    }

  }
  private uploadImage( user: UserI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.saverUsrProfile(user);
            console.log(urlImage);
          });
        })
      ).subscribe();
  }
   async saverUsrProfile(user: UserI): Promise<void> {
    await (await this.afAuth.currentUser).updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL,
    })
      .then(() => this.posServ.alertOk())
      .catch(err => this.posServ.alertErr());
  }
}



























