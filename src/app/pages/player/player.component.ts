import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { SpotifyDataService } from '../../core/services/spotify-data.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent {

  tracks: any[];
  imgUrl: string;
  loading: boolean = true;
  private albumId: string;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private spotify: SpotifyDataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.albumId = params['id'];
        this.imgUrl = params['imgUrl'];
        window.scrollTo(0, 0);
      })

    this.spotify.getTracks(this.albumId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(val => {
        this.tracks = val;
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}