import { Section } from "./section";
import { Service } from "../di/ServiceDecorator";
import { CardForm } from "./card-form";
import { ViewService } from "../services/view.service";
import { Card } from "../model/card";

@Service()
export class CardSection extends Section<Card> {
    constructor(private viewService: ViewService, private cardForm: CardForm) {
        super("Here are the cards", "card-area", cardForm);
        this.viewService.appendView(this);
    }

    addItem(card: Card) {

    }
}