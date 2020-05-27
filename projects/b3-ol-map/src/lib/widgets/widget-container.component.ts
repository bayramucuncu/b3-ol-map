import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'b3-widget-container',
  templateUrl: './widget-container.component.html',
  styleUrls: ['./widget-container.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class WidgetContainerComponent implements OnInit {

  @Input() widgets: any[];

  rightMenuItems: any[];
  freeItems: any[];

  constructor() { }

  ngOnInit() {
    !this.widgets && (this.widgets = []);

    this.rightMenuItems = this.widgets.filter((f: any) => f.container === "rightMenu")
    this.freeItems = this.widgets.filter((f: any) => f.container === "none")
  }
}
