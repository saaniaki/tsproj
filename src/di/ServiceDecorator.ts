import { GenericClassDecorator, Type } from "./Util";
import { Injector } from "./Injector";

export let container: Type<any>[];

/**
 * @returns {GenericClassDecorator<Type<any>>}
 * @constructor
 */
export const Service = (): GenericClassDecorator<Type<any>> => {
    if (container === undefined) container = [];

    return (target: Type<any>) => {
        const fService = container.find((e: Type<any>) => e.name == target.name);
        if (fService === null || fService === undefined)
            container.push(Injector.resolve<any>(target));
    };
};
