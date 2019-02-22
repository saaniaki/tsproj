import { Inject } from "../utility/service-gen";
import { TagService } from "../services/tag.service";
import { Insertable } from "./insertable";

export class Tag extends Insertable {

    @Inject(TagService) tagService: TagService;

    private _name: string;

    constructor(n: string) {
        super(n);
        this.tagService.addTag(this);
    }

    protected onInit(...args: any[]): void {
        this._name = args[0];
    }

    protected domCreator() {
        const container = document.createElement('div');
        container.className = 'tag';

        const displayName = document.createElement('span');
        displayName.textContent = this.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.className = "rembutton";

        removeButton.onclick = () => {
            container.parentNode.removeChild(container);
            this.tagService.removeTag(this);
        };

        container.appendChild(displayName);
        container.appendChild(removeButton);

        this._dom = container;
    }

    public resetDom(){
        this.resetDom();
    }

    get name(): string{
        return this._name;
    }
}
