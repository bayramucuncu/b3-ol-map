import { Feature } from 'ol';
import { StyleManager } from './style-item-creator.contract';
import { GeometryLabelRotationFactory } from '../feature-label-rotation-strategies/feature-label-rotation.factory';

export interface IStyleFunctionStragey {
    getStyleFunction(options: any): any;
}

export class ThematicViewFunctionStrategy implements IStyleFunctionStragey {
    regex: any = /\{([^}]+)\}/g;

    getStyleFunction(options: any): any {

        let min = options.viewOptions.thematicOptions ? Math.min(...options.viewOptions.thematicOptions.map((o: any) => parseFloat(o.expression.min))) : undefined;
        let max = options.viewOptions.thematicOptions ? Math.max(...options.viewOptions.thematicOptions.map((o: any) => parseFloat(o.expression.max))) : undefined;

        let styles = [];

        if (options.viewOptions.thematicOptions && options.viewOptions.thematicOptions.length > 0) {
            options.viewOptions.thematicOptions.forEach((item: any) => {
                let style = StyleManager.createStyle(item.viewOptions);

                if (item.expression.comparison == "between") {
                    styles.push({
                        property: item.expression.property,
                        comparison: item.expression.comparison,
                        min: item.expression.min,
                        max: item.expression.max,
                        style: style
                    });
                } else {
                    styles.push({
                        property: item.expression.property,
                        comparison: item.expression.comparison,
                        value: item.expression.value,
                        style: style
                    });
                }
            })
        }

        let defaultStyle = StyleManager.createStyle(options.viewOptions);

        return (feature: Feature, resolution: number) => {
            let style = defaultStyle;

            let isCluster = feature.get('features');

            if (styles.length > 0) {
                styles.forEach(item => {
                    let featureValue = feature.get(item.property);

                    if (isCluster)
                        featureValue = feature.get('features').length

                    if (item.comparison == "between" || isCluster) {
                        if ((parseFloat(item.min) < featureValue && featureValue <= parseFloat(item.max)))
                            style = item.style;

                        if ((min && max) && (featureValue > max || featureValue < min))
                            style = defaultStyle;
                    } else {
                        if (item.comparison == "=" && featureValue == item.value) {
                            style = item.style;
                        }
                        if (item.comparison == "!=" && featureValue != item.value) {
                            style = item.style;
                        }
                        if (item.comparison == ">" && featureValue > parseFloat(item.value)) {
                            style = item.style;
                        }
                        if (item.comparison == ">=" && featureValue >= parseFloat(item.value)) {
                            style = item.style;
                        }
                        if (item.comparison == "<" && featureValue < parseFloat(item.value)) {
                            style = item.style;
                        }
                        if (item.comparison == "<=" && featureValue <= parseFloat(item.value)) {
                            style = item.style;
                        }
                    }

                    let text = style.getText();

                    if (text) {
                        let textRotation = GeometryLabelRotationFactory.getCalculator(feature).getRotation();
                        text.setRotation(textRotation);
                        text.setText(this.createText(feature, resolution, options.viewOptions));
                    }
                })
            } else {

                let text = style.getText();

                if (text) {
                    let textRotation = GeometryLabelRotationFactory.getCalculator(feature).getRotation();
                    text.setRotation(textRotation);
                    text.setText(this.createText(feature, resolution, options.viewOptions));
                }
            }

            return style;
        }
    }

    private createText(feature: Feature, resolution: number, options: any) {

        if (feature.get("features")) 
            return feature.get("features").length.toString();

        if (!options.text || !options.text.content)
            return "";

        if (options.text && options.text.maxResolution && options.text.maxResolution < resolution)
            return '';
        
        let text = options.text.content.replace(this.regex, (x: any, y: any) => feature.get(y) ? feature.get(y).toString() : "")

        return text;
    }
}