import { Component, OnInit, Input } from '@angular/core';
import { ImageArcGISRest } from 'ol/source';
import { ProjectionLike } from 'ol/proj';
import { ImageComponent } from '../../layers/image/image.component';

@Component({
  selector: 'b3-source-image-arcgisrest',
  templateUrl: './image-arcgisrest.component.html',
  styleUrls: ['./image-arcgisrest.component.css']
})
export class ImageArcgisrestComponent implements OnInit {
  source: ImageArcGISRest;

  @Input() crossOrigin: null | string;
  @Input() url: string;
  @Input() hidpi: boolean;
  @Input() params: object;
  @Input() projection: ProjectionLike;
  @Input() resolutions: number[];
  @Input() ratio: number;
  
  constructor(private layerComponent: ImageComponent) {
  }

  ngOnInit(): void {
     
      this.source = new ImageArcGISRest({
          url: this.url,
          hidpi: this.hidpi,
          params: this.params,
          projection: this.projection,
          resolutions: this.resolutions,
          ratio: this.ratio
      });

      this.source.on("imageloadstart", ()=>  this.layerComponent.layer.set("isLoading", true));
      this.source.on("imageloadend", ()=> this.layerComponent.layer.set("isLoading", false));
      this.source.on("imageloadend", ()=> this.layerComponent.layer.set("isLoading", false));

      this.layerComponent.layer.setSource(this.source);
  }
}
