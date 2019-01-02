import { Service } from "./service";
import { Section } from "../model/section";
import { Injectable } from "../utility/service-gen";
import { TagForm } from "../model/tag-form";

@Injectable
export class ViewService extends Service {
    private _main: HTMLElement;
    private _tagsSection: Section;
    private _cardsSection: Section;
    private _latestSection: Section;

    constructor(t: string) {
        super(t);
        this._tagsSection = new Section("Here are the tags", "tag-area", new TagForm());
        // this._cardsSection = new Section("Here are the cards", "card-area");
        // this._latestSection = new Section("Latest Title", "latest-area");
    }

    render(element: HTMLElement) {
        this._main = element;
        element.appendChild(this.tagsSection.dom);
        // element.appendChild(this.cardsSection.dom);
        // element.appendChild(this.latestSection.dom);
    }

    get tagsSection(): Section {
        return this._tagsSection;
    }

    // get cardsSection(): Section {
    //     return this._cardsSection;
    // }

    // get latestSection(): Section {
    //     return this._latestSection;
    // }
}