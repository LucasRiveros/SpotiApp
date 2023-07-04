import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SpotifyDataService } from '../../core/services/spotify-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  loading = true;
  title: any[] = [];
  releases: any[] = [];
  subtitle: any[] = [];
  private newReleases: Subscription;

  constructor(
    private router: Router,
    private spotify: SpotifyDataService
  ) { }

  public goAlbum(albumId: string, imgUrl: string){
    this.router.navigate(['/player', albumId, {imgUrl}]);
  }

  ngOnInit() {
    this.newReleases = this.spotify.getNewReleases()
    .subscribe( (val: any) => {
      this.releases = val;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.newReleases.unsubscribe();
  }
}