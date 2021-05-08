import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { PostService } from '../post.service';

// Import external
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  private image: any;
  constructor(
    private postSrv: PostService  ) { }

    public newPostForm = new FormGroup({
      titlePost: new FormControl('', Validators.required),
      contentPost: new FormControl('', Validators.required),
      tagsPost: new FormControl('', Validators.required),
      imagePost: new FormControl('', Validators.required),
    });

  ngOnInit(): void {
  }
  addNewPost(data: PostI): void {
    console.log(data);
    this.postSrv.preAddUpdatePost(data, this.image);
  }

  handleImg(event: any): void {
    this.image = event.target.files[0];
    console.log('IMage', this.image);
  }

}





















