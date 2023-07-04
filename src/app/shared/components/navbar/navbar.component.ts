import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  public counter: number;
  public currentAlbum: string;
  public checked: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
  ) { }

  public hide() {
    if (this.checked) {
      this.checked = false;
    }
  }

  public searchNavigate() {
    this.router.navigate(['/search'])
  }

  public homeNavigate() {
    this.router.navigate([''])
  }

  public backClick() {
    this.hide();
    if (this.router.url !== '/home' && this.router.url !== '/') {
      this.location.back();
    }
  }
}
