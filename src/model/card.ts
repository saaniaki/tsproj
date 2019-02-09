import { Inject } from "../utility/service-gen";
import { Insertable } from "./insertable";
import { CardService} from "../services/card.service";

export class Card extends Insertable {

    @Inject(CardService) cardService: CardService;

    private topic: string;
    private body: string;

    constructor(t: string, b: string) {
        super(t, b);
        this.cardService.addCard(this);
    }

    protected onInit(...args: any[]): void {
        this.topic = args[0];
        this. body = args[1];
    }

    protected domCreator() {
        const container = document.createElement('div');
        container.className = 'cards';

        const displayTopic = document.createElement('span');
        displayTopic.textContent = this.topic;
        
        const displayBody = document.createElement('span');
        displayBody.textContent = this.body;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.className = "rembutton";

        removeButton.onclick = () => {
            container.parentNode.removeChild(container);
            this.cardService.removeCard(this);
        };

        container.appendChild(displayTopic);
        container.appendChild(displayBody);
        container.appendChild(removeButton);

        this._dom = container;
    }
}
