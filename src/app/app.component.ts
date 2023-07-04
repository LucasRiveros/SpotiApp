import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpotifyDataService } from './core/services/spotify-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading = true;
  title = 'musicApp';
  spotifyServiceSubscription: Subscription;

  constructor(private spotify: SpotifyDataService) { }

  ngOnInit() {
    this.manageAuth();
  }

  ngOnDestroy() {
    this.spotifyServiceSubscription.unsubscribe();
  }

  private manageAuth() {
    const dateUntilChange = +localStorage.getItem('dateUntilChange') || 0;
    const token = localStorage.getItem('token');

    if (dateUntilChange < Date.now() || !token) {
      this.spotifyServiceSubscription = this.spotify.getToken()
      .subscribe((res: any) => {
        const dateUntilChange = Date.now() + (res.expires_in * 1000);
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('dateUntilChange', dateUntilChange.toString());
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
}
