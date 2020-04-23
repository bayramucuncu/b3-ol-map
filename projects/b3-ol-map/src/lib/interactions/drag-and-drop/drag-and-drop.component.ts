import { Component, OnInit, Input, Output, OnDestroy, EventEmitter } from '@angular/core';
import { ProjectionLike } from 'ol/proj';
import { BaseInteractionComponent } from '../base-interaction-component';
import { DragAndDrop } from 'ol/interaction';
import { GPX, GeoJSON, KML, TopoJSON } from 'ol/format';
import { MapComponent } from '../../b3-ol-map.component';

@Component({
  selector: 'b3-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent extends BaseInteractionComponent implements OnInit, OnDestroy {

  @Input() formatConstructors: any[];
  @Input() projection: ProjectionLike;
  @Input() target?: HTMLElement;

  @Output() outDragAndDrop = new EventEmitter<string>();

  constructor(private mapComponent: MapComponent) {
      super(mapComponent);
  }

  ngOnInit() {

      let formatMap = {
          "GPX": GPX,
          "KML": KML,
          "GeoJSON": GeoJSON,
          "TopoJSON": TopoJSON
      };

      let formats = this.formatConstructors ? this.formatConstructors.map(item => formatMap[item]) : [GeoJSON, KML];

      this.interaction = new DragAndDrop({
          projection: this.projection,
          formatConstructors: formats,
          target: this.target
      });

      this.interaction.on('addfeatures', (event: any) => {
          this.outDragAndDrop.emit(event.features);
      });

      super.ngOnInit();
  }

  ngOnDestroy() {
      this.mapComponent.map.removeInteraction(this.interaction);
  }
}
