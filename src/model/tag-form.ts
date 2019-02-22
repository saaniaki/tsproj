import { AddFrom } from "./add-from";
import { Insertable } from "./insertable";
import { Tag } from "./tag";

export class TagForm extends AddFrom {

    _input: HTMLInputElement;

    protected domCreator(): void {
        const container = document.createElement('div');
        container.className = 'tag';

        this._input = document.createElement('input');
        container.appendChild(this._input);

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

    public resetDom(){
    }

    get formItem(): Insertable {
        return new Tag(this._input.value);
    }

}