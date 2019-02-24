import { Section } from "./section";
import { Service } from "../di/ServiceDecorator";
import { ViewService } from "../services/view.service";
import { TagForm } from "./tag-form";
import { Tag } from "../model/tag";
import { TagService } from "../services/tag.service";

@Service()
export class TagSection extends Section<Tag> {
    constructor(private viewService: ViewService,
        private tagService: TagService,
        private tagForm: TagForm) {
        super("Here are the tags", "tag-area", tagForm);
        this.viewService.appendView(this);
    }

    addItem(tag: Tag) {
        const container = document.createElement('div');
        container.className = 'tag';

        const displayName = document.createElement('span');
        displayName.textContent = tag.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.className = "rembutton";

        removeButton.onclick = () => {
            this.tagService.removeTag(tag);
            container.parentNode.removeChild(container);
        };

        container.appendChild(displayName);
        container.appendChild(removeButton);

        this.tagService.addTag(tag);
        this.insertHTMLElement(container);
    }

}