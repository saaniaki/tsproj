import 'reflect-metadata';
import { Type } from "./Util";
import { container } from './ServiceDecorator';

/**
 * The Injector stores services and resolves requested instances.
 */
export class Injector {
    /**
     * Resolves instances by injecting required services
     * @param {Type<any>} target
     * @returns {T}
     */
    static resolve<T>(target: Type<any>): T {
        const service: any = container.find((e: any) => e.constructor.name == target.name);
        if (service !== null && service !== undefined)
            return service;
        
        // tokens are required dependencies, while injections are resolved tokens from the Injector
        let tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const dependencies: Type<any>[] = [];
        for (const token of tokens) {
            const dependency: Type<any> = container.find((e: Type<any>) => e.constructor.name == token.name);
            if (dependency === null || dependency === undefined)
                container.push(Injector.resolve<any>(dependency));
            else
                dependencies.push(dependency)
        }

        return new target(...dependencies);
    }
};
