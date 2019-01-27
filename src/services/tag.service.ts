import { Service } from "../services/service";
import { Tag } from "../model/tag";
import { Section } from "../model/section";
import { ViewService } from "./view.service";

@Injectable
export class TagService extends Service {

    tags: Tag[] = [];
    section: Section;

    constructor(t: string) {
        super(t);
        this.tags = [];
    }

    addTag(tag: Tag) {
        this.tags.push(tag);
    }

    removeTag(tag: Tag) {
        const index = this.tags.indexOf(tag);
        if (index > -1)
            this.tags.splice(index, 1);
        else
            throw ("Tag Not Found.");
    }

}