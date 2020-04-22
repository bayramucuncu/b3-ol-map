import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'b3-ol-map';

  public map: any = {
    settings: { width: "100vw", height: "100vh" },
    view: { zoom: 14, center: [4364549.537769296, 5001346.4204131], projection: "EPSG:3857", minZoom: 0, maxZoom: 26 }
  }
}
