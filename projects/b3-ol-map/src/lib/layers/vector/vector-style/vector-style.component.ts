import { Component, Input, Host } from '@angular/core';
import { VectorComponent } from '../vector.component';
import { ThematicViewFunctionStrategy } from './feature-style/style-function-strategy.contract';


@Component({
  selector: 'b3-vector-style',
  templateUrl: './vector-style.component.html',
  styleUrls: ['./vector-style.component.css']
})
export class VectorStyleComponent {
  
  @Input()
  set options(options: any) {
      let styleFunctionStrategy = new ThematicViewFunctionStrategy();

      this.layerComponent.layer.setStyle(styleFunctionStrategy.getStyleFunction(options));
  }

  constructor(@Host() private layerComponent: VectorComponent) {
  }
}
