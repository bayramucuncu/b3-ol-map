import { Component, OnInit, Input } from '@angular/core';
import { WMTS } from 'ol/source';
import { LayerTileComponent } from '../../layers/tile/tile.component';
import { WMTSCapabilities } from 'ol/format';
import { optionsFromCapabilities } from "ol/source/WMTS";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'b3-source-tile-wmts',
  templateUrl: './tile-wmts.component.html',
  styleUrls: ['./tile-wmts.component.css']
})
export class TileWmtsComponent implements OnInit {
  
  source: WMTS;

   @Input() layer: string;
   @Input() matrixSet: string;
   @Input() url: string;
 
  constructor(private layerComponent: LayerTileComponent, private httpClient: HttpClient) {}
  
  ngOnInit() {
    
    let url = `${this.url}?REQUEST=getcapabilities`;

    this.httpClient.get(url, { responseType: "text" }).subscribe((response: any)=>{
      let parser = new WMTSCapabilities();
      var result = parser.read(response);

      var options = optionsFromCapabilities(result, {
        layer: this.layer,
        matrixSet: this.matrixSet
      });

      this.source = new WMTS(options);
      this.source.on("tileloadstart", ()=> this.layerComponent.layer.set("isLoading", true));
      this.source.on("tileloadend", ()=> this.layerComponent.layer.set("isLoading", false));
      this.source.on("tileloaderror", ()=> this.layerComponent.layer.set("isLoading", false));
  
      this.layerComponent.layer.setSource(this.source);
    });
  }
}
