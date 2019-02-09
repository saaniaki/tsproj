import { Service } from "../services/service";
import { Injectable, Inject } from "../utility/service-gen";
import { Card } from "../model/card";
import {Section} from "../model/section";

@Injectable
export class CardService extends Service {

    cards: Card[] = [];
    section: Section;

    constructor(t: string){
        super(t);
    }

    public addCard(c: Card){
        this.cards.push(c);
    }

    public removeCard(c: Card){
        const index = this.cards.indexOf(c);
        if (index > -1)
            this.cards.splice(index, 1);
        else
            throw ("Card Not Found.");
    }
}