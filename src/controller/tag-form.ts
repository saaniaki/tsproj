import { AddFrom } from "./add-from";
import { Tag } from "../model/tag";
import { Service } from "../di/ServiceDecorator";

@Service()
export class TagForm extends AddFrom<Tag> {

    private _input: HTMLInputElement;

    constructor() {
        super();
    }

    protected generateDom(): void {
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

    public resetDom() {
    }

    get formModel(): Tag {
        return new Tag(this._input.value);
    }

}