import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PostService} from '../../../components/posts/post.service';
import {PostI} from '../../models/post.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

/**
 * Imports external
 */
import Swal from 'sweetalert2';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['titlePost', 'contentPost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private postSvc: PostService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.postSvc.getAllPost().subscribe(posts => (this.dataSource.data = posts));
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogDialog(post?: PostI): void {
    const config = {
      data: {
        message: post ? 'Edit Post' : 'New Post',
        content: post
      }
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
    });
  }

  onNewPost(): void {
    console.log('New post');
    this.openDialogDialog();
  }
  onEditPost(post: PostI): void {
    console.log('Edit post', post);
    this.openDialogDialog(post);
  }

  onDeletePost(post: PostI): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#673ab7',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.postSvc.deletePostById(post).then(() => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success',
          );
        }).catch((error) => {
          Swal.fire(
            'Error!',
            'There was an error deleting this post',
            'error'
          );
        });
      }
    });
  }

}























