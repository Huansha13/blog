import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { NewPostModule } from './components/posts/new-post/new-post.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {environment} from '../environments/environment';

/* Firebase */
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {ReactiveFormsModule} from '@angular/forms';
import { ContainerAppComponent } from './components/container-app/container-app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { EditPostModule } from './components/posts/edit-post/edit-post.module';
import {DetailsPostComponent} from './components/posts/details-post/details-post.component';
import {ToobarComponent} from './shared/components/toobar/toobar.component';


@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    ContainerAppComponent,
    ModalComponent,
    EditPostComponent,
    DetailsPostComponent,
    ToobarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NewPostModule,
    MaterialModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    EditPostModule
  ],
  // para que el componenete este diponible durante toda la aplicacion
  entryComponents: [ModalComponent],
  providers: [
    {provide: BUCKET, useValue: 'gs://blog-b1ce6.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



















