import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b3-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.css']
})
export class WidgetContainerComponent implements OnInit {

  @Input() widgets: any[];

  constructor() { }

  ngOnInit() {
    !this.widgets && (this.widgets = []);
  }
}
