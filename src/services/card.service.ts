import { Service } from "../services/service";
import { Injectable, Inject } from "../utility/service-gen";
import { Card } from "../model/card";
import {Section} from "../model/section";

@Injectable
export class CardService extends Service {

    cards: Card[] = [];
    section: Section;

    constructor(t: string, b: string){
        super(t, b);
    }


}