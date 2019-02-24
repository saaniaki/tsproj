export abstract class AddFrom<T> {

    protected _dom: HTMLElement;
    protected _addButton: HTMLButtonElement;

    constructor() {
        this.onInit();
        this.generateDom();
    }

    protected onInit(): void { }

    protected abstract generateDom(): void;

    public abstract resetDom(): void;

    abstract get formModel(): T;

    get dom(): HTMLElement {
        return this._dom;
    }

    get addButton(): HTMLButtonElement {
        return this._addButton;
    }

}