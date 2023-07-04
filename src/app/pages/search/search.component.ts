import { Router } from '@angular/router'
import { Component } from '@angular/core';
import { SpotifyDataService } from '../../core/services/spotify-data.service';
// import { AuthService } from '../../services/auth.service';
// import { IncreaseAction } from './search-counter.action';
// import { Store } from '@ngrx/store';

interface AppState {
  counter: number
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  artists: any[];
  loading: boolean;
  loaded: boolean;

  constructor ( 
    private _router: Router,
    private spotify: SpotifyDataService
  ) {}

  public searchArtist(e: KeyboardEvent, term: string) {
    if (e.key === "Enter" && term) {
      this.loading = true;
      this.spotify.getArtists(term).subscribe( (val: any) => {
        this.artists = val;
        this.loading = false;
        this.loaded = true;
      })
    }
  }

  public goArtist(artistId: string) {
    this._router.navigate(['/artist', artistId])
  }
}
