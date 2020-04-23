import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { defaults as defaultInteractions } from 'ol/interaction';

@Component({
  selector: 'b3-interaction-container',
  templateUrl: './interaction-container.component.html',
  styleUrls: ['./interaction-container.component.css']
})
export class InteractionContainerComponent implements OnInit {

  @Input() interactions: any[];

  @Output() outDragAndDrop = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

    (!this.interactions) && (this.interactions = this.getDefaultInteractions());

    this.interactions = this.interactions || [];
  }

  onDragAndDrop($event: any): void {
    this.outDragAndDrop.emit($event);
  }

  private getDefaultInteractions(): any[] {
    return [
      { name: "dragpan", title: "Drag pan" },
      { name: "doubleclickzoom", title: "Double click", settings: { duration: 250, delta: 1 } },
      { name: "pinchzoom", title: "Pich zoom", settings: { duration: 250 } },
      { name: "pinchrotate", title: "Pich rotate", settings: { duration: 250, threshold: 0.3 } },
      { name: "mousewheelzoom", title: "Mouse wheel interaction", settings: { duration: 250, timeout: 80, useAnchor: true, constrainResolution: false } }
    ]
  }

}
