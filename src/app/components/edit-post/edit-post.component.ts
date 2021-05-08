import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from '../../shared/models/post.interface';
import {PostService} from '../posts/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  private image: any;
  private imageOriginal: any;

  @Input() post: PostI;

  constructor( private postSsv: PostService) { }

  public editPostForm = new FormGroup({
    id: new FormControl('', Validators.required),
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.initValuesForm();
  }
  editPost(post: PostI): void {
    console.log('img', this.image);
    console.log('original', this.imageOriginal);
    if (this.image === this.imageOriginal) {
      post.imagePost = this.imageOriginal;
      this.postSsv.editPostById(post);
      // call method (pos9
    } else {
      this.postSsv.editPostById(post, this.image);
      // call metohod(post, this. image
    }
  }
  handleImg(event: any): void {
    this.image = event.target.files[0];
  }

  private initValuesForm(): void {
    this.editPostForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      contentPost: this.post.contentPost,
      tagsPost: this.post.tagsPost
    });
  }
}
