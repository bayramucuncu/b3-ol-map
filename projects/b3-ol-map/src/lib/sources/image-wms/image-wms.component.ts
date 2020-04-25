import { Component, OnInit, Input } from '@angular/core';
import { ImageWMS } from 'ol/source';
import { ImageComponent } from '../../layers/image/image.component';

@Component({
  selector: 'b3-source-image-wms',
  templateUrl: './image-wms.component.html',
  styleUrls: ['./image-wms.component.css']
})
export class ImageWmsComponent implements OnInit {
  source: ImageWMS;

  @Input() url: string;
  @Input() params: Object;
  @Input() crossOrigin: string;
  @Input() hidpi: boolean;
  @Input() projection: string;
  @Input() serverType: string;
 
  constructor(private layerComponent: ImageComponent) {}
  
  ngOnInit() {
    this.source = new ImageWMS({
        crossOrigin: this.crossOrigin,
        hidpi: this.hidpi,
        params: this.params,
        projection: this.projection,
        serverType: this.serverType,
        url: this.url,
    });

    this.source.on("imageloadstart", ()=>  this.layerComponent.layer.set("isLoading", true));
    this.source.on("imageloadend", ()=> this.layerComponent.layer.set("isLoading", false));
    this.source.on("imageloadend", ()=> this.layerComponent.layer.set("isLoading", false));

    this.layerComponent.layer.setSource(this.source);
  }
}
