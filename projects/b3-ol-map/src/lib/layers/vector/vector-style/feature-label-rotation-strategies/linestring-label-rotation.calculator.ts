import { Feature } from 'ol';
import { LineString } from 'ol/geom';
import { IFeatureLabelRotationCalculator } from './feature-label-rotation.calculator';

export class LinestringLabelRotationCalculator implements IFeatureLabelRotationCalculator {

  constructor(private feature: Feature){    
  }

  getRotation(): number {

    let linestring = <LineString>this.feature.getGeometry();

    let first = linestring.getFirstCoordinate();
    let last = linestring.getLastCoordinate();
 
    return -Math.atan((last[1] - first[1]) / (last[0] - first[0]));
  }
}
