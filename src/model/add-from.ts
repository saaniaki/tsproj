import { Insertable } from "./insertable";

export abstract class AddFrom extends Insertable{

    protected _addButton: HTMLButtonElement;

    get addButton(): HTMLButtonElement {
        return this._addButton;
    }

    abstract get formItem(): Insertable;

}