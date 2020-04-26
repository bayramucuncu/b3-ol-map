import { IFeatureLabelRotationCalculator } from './feature-label-rotation.calculator';

export class NoLabelRotationCalculator implements IFeatureLabelRotationCalculator {
  
  constructor(){    
  }

  getRotation(): number {
    return 0;
  }
}
