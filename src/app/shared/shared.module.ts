import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardComponent, NavbarComponent, LoadingComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [ CardComponent, NavbarComponent, LoadingComponent ],
})
export class SharedModule { }
