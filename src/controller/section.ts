import { AddFrom } from "./add-from";

export abstract class Section<T> {
    private _dom: HTMLElement;
    private _insertionArea: HTMLElement;

    constructor(title: string, cls: string, addFrom: AddFrom<T>) {
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
                this.addItem(addFrom.formModel);
                addFrom.dom.remove();
                addFrom.resetDom();
            }
        };
        this._dom.appendChild(addButton);
    }

    abstract addItem(item: T): void;

    get insertArea(): HTMLElement {
        
        return this._insertionArea;
    }

    get dom(): HTMLElement {
        return this._dom;
    }

    insertHTMLElement(element: HTMLElement) {
        this._insertionArea.appendChild(element);
    }
}