import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { B3OlMapModule } from 'projects/b3-ol-map/src/public-api';
import { AppSearchExComponent } from './app-search-ex/app-search-ex.component';

@NgModule({
  declarations: [
    AppComponent,
    AppSearchExComponent
  ],
  imports: [
    BrowserModule,
    B3OlMapModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
