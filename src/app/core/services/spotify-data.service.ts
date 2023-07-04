import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})

export class SpotifyDataService {

  constructor (private http: HttpClient) {}

  getToken() {
    const clientId = 'use yout clientId';
    const clientSecret = 'use yout clientSecret';
    return this.http.get(`https://spoti-server.onrender.com/spotify/${clientId}/${clientSecret}`);
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    return this.http.get(url);
  }

  getNewReleases() {
    return this.getQuery(`browse/new-releases`)
      .pipe(map(val => val['albums'].items));
  }

  getArtists(term){
    return this.getQuery(`search?q=${term}&type=artist&limit=20`)
      .pipe(map(val => val['artists'].items))
  }

  getAlbums(artistId){
    return this.getQuery(`artists/${artistId}/albums`)
    .pipe(map(val => val['items']))
  }

  getTracks(albumId){
    return this.getQuery(`albums/${albumId}/tracks`)
      .pipe(map(val => val['items']))
  }
}
