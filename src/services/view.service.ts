import { Section } from "../controller/section";
import { Service } from "../di/ServiceDecorator";

@Service()
export class ViewService {
    private _main: HTMLElement;

    constructor() {
        this._main = document.body;
    }

    appendView(section: Section<any>) {
        this._main.appendChild(section.dom);
    }

    get main(): HTMLElement {
        return this._main;
    }
}