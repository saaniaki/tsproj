export abstract class Insertable {
    protected _dom: HTMLElement;

    constructor(...args: any[]) {
        this.onInit(args);
        this.domCreator();
    }

    protected onInit(...args: any[]): void { }

    protected abstract domCreator(): void;

    get dom(): HTMLElement {
        return this._dom;
    }
}