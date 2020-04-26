import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b3-control-container',
  templateUrl: './control-container.component.html',
  styleUrls: ['./control-container.component.css']
})
export class ControlContainerComponent implements OnInit {

  @Input() controls: any[];

  constructor() { }

  ngOnInit() {
    !this.controls && (this.controls = this.getDefaultControls());
  }

  private getDefaultControls(): any[] {
    return[
      { "name": "zoom", "title": "Zoom Control", "settings": { "duration": 250, "minWidth": 64, "target": null, "units": "metric" } },
    ]
  }

}
