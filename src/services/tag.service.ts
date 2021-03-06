import { Tag } from "../model/tag";
import { Service } from "../di/ServiceDecorator";

@Service()
export class TagService {

    private _tags: Tag[];
    private updateAgents: Function[];

    constructor() {
        this._tags = [];
        this.updateAgents = [];
    }

    addTag(tag: Tag) {
        this._tags.push(tag);
        this.update();
    }

    removeTag(tag: Tag) {
        const index = this._tags.indexOf(tag);
        if (index > -1) {
            this._tags.splice(index, 1);
            this.update();
        }
        else
            throw ("Tag Not Found.");
    }

    get tags(): Tag[] {
        return this._tags;
    }

    public valueSelect(name: string): Tag {
        for (const t of this.tags) {
            if (t.name == name) {
                return t;
            }
        }
        return null;
    }

    public addAgent(e: Function) {
        this.updateAgents.push(e);
    }

    public update() {
        for (const e of this.updateAgents)
            e();
    };

}       
