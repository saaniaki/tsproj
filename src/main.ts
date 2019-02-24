import { Injector } from "./di/Injector";
import { TagSection } from "./controller/tag-section";
import { CardSection } from "./controller/card-section";
import { Tag } from "./model/tag";
import { Service } from "./di/ServiceDecorator";

@Service()
class App {
    constructor(private tagSection: TagSection,
        private cardSection: CardSection) {
            this.addDefaultTags();
    }

    addDefaultTags() {
        this.tagSection.addItem(new Tag("t1"));
        this.tagSection.addItem(new Tag("t2"));
        this.tagSection.addItem(new Tag("t3"));
        this.tagSection.addItem(new Tag("t4"));
    }
}
