import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b3-interaction-container',
  templateUrl: './interaction-container.component.html',
  styleUrls: ['./interaction-container.component.css']
})
export class InteractionContainerComponent implements OnInit {

  @Input() interactions: any[] = [];

  constructor() { }

  ngOnInit() {
    this.interactions = this.interactions || [];console.log(this.interactions)
  }

}
