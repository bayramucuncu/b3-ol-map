import { Component, OnInit, Input } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'b3-ol-map';
  map: any;

  constructor() {
    this.map = {
      settings: { width: "100vw", height: "100vh" },
      view: { zoom: 14, center: [4364549.537769296, 5001346.4204131], projection: "EPSG:3857", minZoom: 0, maxZoom: 26 },
      interactions: [
        { name: "mousewheelzoom", title: "Mouse wheel interaction", settings: { duration: 250, timeout: 80, useAnchor: true, constrainResolution: false } },
        { name: "pinchzoom", title: "Pich zoom", settings: { duration: 250 } },
        { name: "dragpan", title: "Drag pan" }
      ]
    }  
  }

  ngOnInit(): void {
    // const ounter = interval(1000);

    // ounter.subscribe( t => {
    //   this.map.view.center = [ 
    //     this.map.view.center[0] + this.getRandonInteger(-1000,1000),
    //     this.map.view.center[1] + this.getRandonInteger(-1000,1000)
    //   ];
    // })
  }

  private getRandonInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

}
