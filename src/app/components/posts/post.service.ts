import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {finalize, map} from 'rxjs/operators';
import { PostI } from 'src/app/shared/models/post.interface';
import {FileI} from '../../shared/models/file.interface';
import {AngularFireStorage} from '@angular/fire/storage';

/*
* Import external*/
import Swal from 'sweetalert2';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsCollection: AngularFirestoreCollection<PostI>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor( private afs: AngularFirestore,
               private storage: AngularFireStorage,
               private dialog: MatDialog) {
    this.postsCollection = afs.collection<PostI>('posts');
  }

  alertOk(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se guardo con exito',
      showConfirmButton: false,
      timer: 1500
    });
  }
  alertErr(): void {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Error al guardar información',
      showConfirmButton: false,
      timer: 1500
    });
  }

  public getAllPost(): Observable<PostI[]> {
    return this.postsCollection
      .snapshotChanges()
        .pipe(
           map ( action => action.map(a => {
             const data = a.payload.doc.data() as PostI;
             const  id = a.payload.doc.id;
             return {id, ...data };
           }
         )
       )
      );
  }

  public getOnePost(id: PostI): Observable<PostI> {
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
  }

  public deletePostById(post: PostI): Promise<void>  {
    return this.postsCollection.doc(post.id).delete();
  }

  public editPostById(post: PostI, newImages?: FileI): Promise<void> {
    if (newImages) {
      this.uploadImage(post, newImages);
    } else {
      return this.postsCollection.doc(post.id).update(post);
    }
  }

  public preAddUpdatePost(post: PostI, image: FileI): void {
    this.uploadImage(post, image);
  }

  // tslint:disable-next-line:typedef
  private savePost(post: PostI) {
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost
    };
    if (post.id) {
      return this.postsCollection.doc(post.id).update(postObj).then(() => {
        this.dialog.closeAll();
        this.alertOk();
      }).catch(error => {
        this.alertErr();
      });

    } else {
      this.postsCollection.add(postObj).then(() => {
        this.dialog.closeAll();
        this.alertOk();
      }).catch(error => {
        this.alertErr();
      }) ;
    }

  }

  private uploadImage(post: PostI, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize( () => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            this.downloadURL = urlImage;
            this.savePost(post);
          });
        })
      ).subscribe();
  }

}

























