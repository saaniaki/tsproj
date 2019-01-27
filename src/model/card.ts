import { Inject } from "../utility/service-gen";
import { Insertable } from "./insertable";
import { CardService} from "../services/card.service";

export class Tag extends Insertable {

    @Inject(CardService) cardService: CardService;

    private topic: string;
    private body: string;

    constructor(t: string, b: string) {
        super(t, b);
        this.cardService.addTag(this);
    }

    protected onInit(...args: any[]): void {
        this.topic = args[0];
        this. body = args[1];
    }

    protected domCreator() {
        const container = document.createElement('div');
        container.className = 'cards';

        const displayName = document.createElement('span');
        displayName.textContent = this.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.className = "rembutton";

        removeButton.onclick = () => {
            container.parentNode.removeChild(container);
            this.cardService.removeTag(this);
        };

        container.appendChild(displayName);
        container.appendChild(removeButton);

        this._dom = container;
    }
}
