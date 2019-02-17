import { AddFrom } from "./add-from";
import { Insertable } from "./insertable";
import { Card } from "./card";

export class CardForm extends AddFrom {

    _title: HTMLInputElement;
    _body: HTMLInputElement;

    protected domCreator(): void {
        const container = document.createElement('div');
        container.className = 'tag';

        this._title = document.createElement('input');
        container.appendChild(this._title);

        this._body = document.createElement('input');
        container.appendChild(this._body);

        const addButton = document.createElement('button');
        addButton.textContent = 'add';
        this._addButton = addButton;
        container.appendChild(addButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'cancel';
        cancelButton.onclick = () => {
            container.remove();
        };
        container.appendChild(cancelButton);

        this._dom = container;
    }

    get formItem(): Insertable {
        return new Card(this._title.value, this._body.value);
    }

}