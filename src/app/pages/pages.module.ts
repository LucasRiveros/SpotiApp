import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search/search.component';
import { ArtistsComponent } from './artists/artists.component';
import { NoImgPipe } from '../core/pipes/no-img.pipe';

@NgModule({
  declarations: [HomeComponent, SearchComponent, ArtistsComponent, NoImgPipe],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
  ],
  providers: [],
})
export class PagesModule { }
