import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toobar',
  templateUrl: './toobar.component.html',
  styleUrls: ['./toobar.component.scss']
})
export class ToobarComponent implements OnInit {

  appName = 'ngBlog';

  constructor( public authSvs: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authSvs.logout();
    this.router.navigate(['/login']);
  }

}
