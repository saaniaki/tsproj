import { AddFrom } from "./add-from";
import { Card } from "../model/card";
import { TagService } from "../services/tag.service";
import { Service } from "../di/ServiceDecorator";

@Service()
export class CardForm extends AddFrom<Card> {

    private _title: HTMLInputElement;
    private _body: HTMLInputElement;

    private _dropDown: HTMLSelectElement;

    constructor(private tagService: TagService) {
        super();
        this.tagService.addAgent(() => {
            this._dropDown.options.length = 0;
            for (const t of this.tagService.tags) {
                let option: HTMLOptionElement = document.createElement('option');
                option.text = t.name;
                this._dropDown.add(option);
            }
        });
        //Make sure the tags are updated to latest
        this.tagService.update();
    }

    protected onInit(...args: any[]): void { 
        this._dropDown = document.createElement('select');
    }

    protected generateDom(): void {
        const container = document.createElement('div');
        container.className = 'tag';

        this._title = document.createElement('input');

        this._body = document.createElement('input');

        const addButton = document.createElement('button');
        addButton.textContent = 'add';
        this._addButton = addButton;

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'cancel';
        cancelButton.onclick = () => {
            container.remove();
        };

        container.appendChild(this._title);
        container.appendChild(this._body);
        container.appendChild(this._dropDown);
        container.appendChild(addButton);
        container.appendChild(cancelButton);

        this._dom = container;
    }

    public resetDom(){
        this.generateDom();
    }

    get formModel(): Card {
        return new Card(this._title.value, this._body.value, this._dropDown.options[this._dropDown.selectedIndex].value);
    }

}