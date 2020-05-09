import { Component, OnInit } from '@angular/core';
import { MapComponent } from 'projects/b3-ol-map/src/lib';

@Component({
  selector: 'app-search-ex',
  templateUrl: './app-search-ex.component.html',
  styleUrls: ['./app-search-ex.component.css']
})
export class AppSearchExComponent implements OnInit {

  constructor(private mapComponent: MapComponent) {
    console.log(this.mapComponent)
   }

  ngOnInit() {
  }

  zoom(){
    this.mapComponent.map.getView().setZoom(12)
  }

}
