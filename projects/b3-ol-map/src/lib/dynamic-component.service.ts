import { ComponentFactoryResolver, ViewContainerRef, InjectionToken, Injector } from '@angular/core';

export class DynamicComponentService {
      
    constructor(){}
  
    createComponent(componentTypeName: string, entry:  ViewContainerRef, resolver: ComponentFactoryResolver) {
        const componentFactory = this.getComponentFactory(componentTypeName, resolver);

        if (!componentFactory) {
            console.error(componentTypeName + ' does not implement IDynamicComponent interface.');
        }

        if (componentFactory) {
            const injector = this.createInjector(componentTypeName, entry.parentInjector);

            return entry.createComponent(componentFactory, null, injector);
        }
    }

    private getComponentFactory(name: string, resolver: ComponentFactoryResolver) {
        const factories = Array.from<any>(resolver['_factories'].keys());

        const factoryClass = factories.find(item => item.prototype.getComponentType && item.prototype.getComponentType() === name);

        return factoryClass && resolver.resolveComponentFactory(factoryClass);
    }

    private createInjector(name: string, parentInjector: Injector) {
        const provider = [{
            provide: new InjectionToken<any>('IDynamicComponent'),
            useValue: name
        }];

        return Injector.create(provider, parentInjector);
    }
  }