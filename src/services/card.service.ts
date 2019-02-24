import { Card } from "../model/card";
import { Service } from "../di/ServiceDecorator";
import { ViewService } from "./view.service";

@Service()
export class CardService {

    cards: Card[];

    constructor(private viewService: ViewService) {
        this.cards = [];
    }

    public addCard(c: Card) {
        this.cards.push(c);
    }

    public removeCard(c: Card) {
        const index = this.cards.indexOf(c);
        if (index > -1)
            this.cards.splice(index, 1);
        else
            throw ("Card Not Found.");
    }
}