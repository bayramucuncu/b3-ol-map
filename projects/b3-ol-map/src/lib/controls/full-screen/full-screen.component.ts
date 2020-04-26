import { Component, OnInit, Input } from '@angular/core';
import { BaseControlComponent } from '../base-control-component';
import { MapComponent } from '../../b3-ol-map.component';
import { FullScreen } from 'ol/control';

@Component({
  selector: 'b3-control-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.css']
})
export class FullScreenComponent extends BaseControlComponent implements OnInit {

  @Input() className: string = "ol-full-screen";
  @Input() label: string = "\u2922";
  @Input() labelActive: string = "\u00d7";
  @Input() target: (string | HTMLElement);
  @Input() source: (string | HTMLElement);
  @Input() tipLabel: string ="Toggle full-screen";
  @Input() keys: boolean = false;

  constructor(mapComponent: MapComponent) {
    super(mapComponent);
  }

  ngOnInit() {
   
    this.control = new FullScreen({
      className: this.className,
      label: this.label,
      labelActive: this.labelActive,
      target: this.target,
      source: this.source,
      tipLabel: this.tipLabel,
      keys: this.keys
    });

   super.ngOnInit();
  }
}

