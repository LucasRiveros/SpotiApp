import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpotifyDataService } from '../../core/services/spotify-data.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent {

  albums: any[];
  loading: boolean = true;
  private artistId: string;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private spotify: SpotifyDataService
  ) { }

  public goAlbum(albumId: string, imgUrl: string) {
    this._router.navigate(['/player', albumId, { imgUrl }])
  }

  ngOnInit() {
    this._activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.artistId = params['id'];
      })

    this.spotify.getAlbums(this.artistId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.albums = val;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
