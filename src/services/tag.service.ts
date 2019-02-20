import { Service } from "../services/service";
import { Tag } from "../model/tag";
import { Section } from "../model/section";
import { Injectable } from "../utility/service-gen";

@Injectable
export class TagService extends Service {

    tags: Tag[];
    resources: Function[];
    section: Section;
    
    constructor(t: string) {
        super(t);
        this.tags = [];
        this.resources = [];
    }

    addTag(tag: Tag) {
        this.tags.push(tag);
        this.update();
    }

    removeTag(tag: Tag) {
        const index = this.tags.indexOf(tag);
        if (index > -1){
            this.tags.splice(index, 1);
            this.update();
        }
        else
            throw ("Tag Not Found.");
    }

    public valueSelect(name: string): Tag{
        for(const t of this.tags){
            if (t.name == name){
                return t;
            }
        }
        return null;
    }

    public register(e: Function){
        this.resources.push(e);
    }

    public update(){
        this.resources.forEach((e) => {
            e();
        });
    };

}       