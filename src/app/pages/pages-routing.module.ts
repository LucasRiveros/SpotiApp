import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistsComponent } from './artists/artists.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';

const pagesRoutes: Routes = [
  {
    path: 'player/:id',
    loadChildren: () =>
      import('./player/player.module').then((m) => m.PlayerModule),
  },
  { path: 'search', component: SearchComponent},
  { path: 'artist/:id', component: ArtistsComponent},
  {
    path: '',
    component: HomeComponent,
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
