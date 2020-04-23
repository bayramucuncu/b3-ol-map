import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { defaults as defaultInteractions } from 'ol/interaction';

@Component({
  selector: 'b3-interaction-container',
  templateUrl: './interaction-container.component.html',
  styleUrls: ['./interaction-container.component.css']
})
export class InteractionContainerComponent implements OnInit {

  @Input() interactions: any[] = [];

  @Output() outDragAndDrop = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {

    //ToDo: if(!this.interactions) this.interactions = [{},{},{},{}]
console.log(this.interactions)
console.log(defaultInteractions().getArray())
    this.interactions = this.interactions || [];
  }

  onDragAndDrop($event: any): void {
    this.outDragAndDrop.emit($event);
  }

}
