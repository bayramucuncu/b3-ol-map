import Style from 'ol/style/Style';
import { Image, Circle, Icon, Stroke, Fill, RegularShape, Text } from 'ol/style';

export interface IStyleItemCreator<T> {
    create(options: any): T;
}

export class FillCreator implements IStyleItemCreator<Fill>{
    create(options: any): Fill {
        if (!options)
            return null;

        return new Fill({
            color: options.color || 'rgba(157,  57, 104, 0.8)'
        })
    }
}

export class StrokeCreator implements IStyleItemCreator<Stroke>{
    create(options: any): Stroke {
        if (!options)
            return null;

        return new Stroke({
            color: options.color || 'rgba(233,  99, 204, 0.6)',
            width: options.width || 2,
            lineCap: options.lineCap || 'round',
            lineJoin: options.lineJoin || 'round',
            lineDash: options.lineDash || null,
            lineDashOffset: options.lineDashOffset || 0,
            miterLimit: options.miterLimit || 10
        })
    }
}

export class TextCreator implements IStyleItemCreator<Text>{
    create(options: any): Text {
        if (!options)
            return null;

        return new Text({
            fill: new FillCreator().create(options.fill),
            stroke: new StrokeCreator().create(options.stroke),
            backgroundFill: options.backgroundFill && new FillCreator().create({ fill: options.backgroundFill }) || null,
            backgroundStroke: options.backgroundStroke && new StrokeCreator().create({ stroke: options.backgroundStroke }) || null,
            font: options.font || '10px sans-serif',
            maxAngle: options.maxAngle || 45,
            offsetX: options.offsetX || 0,
            offsetY: options.offsetY || 0,
            overflow: options.overflow || false,
            placement: options.placement || "point",
            scale: options.scale || 1,
            rotateWithView: options.rotateWithView || false,
            rotation: options.rotation || 0,
            textAlign: options.textAlign || "center",
            textBaseline: options.textBaseline || "middle",
            padding: options.padding || [0, 0, 0, 0]
        })
    }
}

export class IconImageCreator implements IStyleItemCreator<Image> {
    create(options: any): Image {
        return new Icon({
            anchor: options.anchor || [0.5, 0.5],
            anchorOrigin: options.anchorOrigin || 'top-left',
            anchorXUnits: options.anchorXUnits || 'fraction',
            anchorYUnits: options.anchorYUnits || 'fraction',
            offset: options.offset || [0, 0],
            offsetOrigin: options.offsetOrigin || 'top-left',
            opacity: options.opacity || 1,
            scale: options.scale || 1,
            rotateWithView: options.rotateWithView || false,
            rotation: options.rotation || 0,
            size: options.size || null,
            src: options.src,
            color: options.color
        })
    }
}

export class CircleImageCreator implements IStyleItemCreator<Image> {
    create(options: any): Image {
        return new Circle({
            fill: new FillCreator().create(options.fill),
            stroke: new StrokeCreator().create(options.stroke),
            radius: options.radius || 2
        })
    }
}

export class RegularShapeImageCreator implements IStyleItemCreator<Image> {
    create(options: any): Image {
        return new RegularShape({
            fill: new FillCreator().create(options.fill),
            stroke: new StrokeCreator().create(options.stroke),
            points: options.points || 5,
            radius: options.radius || undefined,
            radius1: options.radius1 || undefined,
            radius2: options.radius2 || undefined,
            angle: options.angle || 0,
            rotation: options.rotation || 0,
            rotateWithView: options.rotateWithView
        })
    }
}

export class DefaultImageCreator implements IStyleItemCreator<Circle> {
    create(options: any): Circle {
        return new Circle({
            radius: 2,
            fill: new Fill({ color: "#fff" }),
            stroke: new Stroke({ width: 1.25, color: "#3344DD" })
        })
    }
}

export abstract class ImageCreatorFactory {
    static getImageCreator(imageType: string): IStyleItemCreator<Image> {
        switch (imageType) {
            case "icon":
                return new IconImageCreator();
            case "circle":
                return new CircleImageCreator();
            case "regular":
                return new RegularShapeImageCreator();
            default:
                return new DefaultImageCreator();
        }
    }
}

export class StyleManager {
    static createStyle(viewOptions: any): Style {
        let image = viewOptions.image ? ImageCreatorFactory.getImageCreator(viewOptions.image.type).create(viewOptions.image.options) : null;

        return new Style({
            image: image,
            fill: new FillCreator().create(viewOptions.fill),
            stroke: new StrokeCreator().create(viewOptions.stroke),
            text: new TextCreator().create(viewOptions.text)
        });
    }
}
