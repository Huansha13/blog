import {Component, Input, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {PostService} from '../post.service';
import {Observable} from 'rxjs';
import {PostI} from '../../../shared/models/post.interface';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  public posts$: Observable<PostI[]>;

  @Input() post: PostI;
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    // Se suscribe por que es un observable .subscribe(res => console.log('Post', res));
    this.posts$ = this.postService.getAllPost();
  }

}






























