import { Feature } from 'ol';
import { LinestringLabelRotationCalculator } from './linestring-label-rotation.calculator';
import { NoLabelRotationCalculator } from './no-label-rotation.calculator';

export abstract class GeometryLabelRotationFactory{
    public static getCalculator(feature: Feature){
      switch(feature.getGeometry().getType()){
        case "LineString": 
          return new LinestringLabelRotationCalculator(feature);
        default: 
          return new NoLabelRotationCalculator();
      }
    }
  }