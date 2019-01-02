import { Service } from "../services/service";

interface IServiceName {
    new(name: string, ...args: any): Service;
}

let injectables: Service[] = [];

export function Injectable(target: Function) {
    if (injectables === undefined) injectables = [];
    const className = target.name.toUpperCase();
    const fService = injectables.find((e: Service) => e.token == className);
    if (fService === null || fService === undefined)   
        injectables.push(new target.prototype.constructor(className));
    else
        throw ("Service Type Already Has Been Instantiated.");
}

export function Inject(service: IServiceName) {

    if (injectables === undefined) injectables = [];
    const className = service.name.toUpperCase();
    const fService = injectables.find((e: Service) => e.token == className);
    if (fService === null || fService === undefined)
        injectables.push(new service(className));

    return function actualDecorator(target: Object, propertyKey: string) {
        (<any>target)[propertyKey] = injectables.find((e: Service) => e.token == className);
    };
}
