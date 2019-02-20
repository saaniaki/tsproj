import { Insertable } from "./insertable";
import { AddFrom } from "./add-from";

export class Section {
    private _dom: HTMLElement;
    private _insertionArea: HTMLElement;

    constructor(title: string, cls: string, addFrom: AddFrom) {
        this._dom = document.createElement('div');
        this._dom.className = 'container';

        const h3 = document.createElement('h3');
        h3.textContent = title;
        this._dom.appendChild(h3);

        this._insertionArea = document.createElement('div');
        this._insertionArea.className = cls;
        this._dom.appendChild(this._insertionArea);

        const addButton = document.createElement('button');
        addButton.textContent = '+';
        addButton.className = "addbutton";
        addButton.onclick = () => {
            this._insertionArea.appendChild(addFrom.dom);
            addFrom.addButton.onclick = () => {
                this.insert(addFrom.formItem);
            }
        };
        this._dom.appendChild(addButton);
    }

    get insertArea(): HTMLElement {
        
        return this._insertionArea;
    }

    get dom(): HTMLElement {
        return this._dom;
    }

    insert(element: Insertable) {
        this._insertionArea.appendChild(element.dom);
    }
}