import { Inject } from "../utility/service-gen";
import { Insertable } from "./insertable";
import { CardService } from "../services/card.service";
import { TagService } from "../services/tag.service";
import { Tag } from "./tag";

export class Card extends Insertable {

    @Inject(CardService) cardService: CardService;
    @Inject(TagService) tagService: TagService;

    //Name of the target card
    private topic: string;
    //Body text of the target card
    private body: string;
    //The dropdown reference of the target card
    private _dropDown: HTMLSelectElement;
    //The section to add the selected tags
    private _tagSection: HTMLElement;
    //The tags associated with this card
    private tags: Tag[];
    
    //Constructor
    constructor(t: string, b: string, tag: string) {
        super(t, b, tag);
        this.cardService.addCard(this);

    }

    /**
     * Instantiates the cards and adds the updator function
     * to the tagservice while also updating the dropdown section
     */
    protected onInit(...args: any[]): void {
        this.topic = args[0][0];
        this.body = args[0][1];
        this.tags = [];
        
        //Initializing the containers for select and tagsection before
        //creating the dom.
        
        this._dropDown = document.createElement('select');
        this._tagSection = document.createElement('div');
        this._tagSection.className = "tagsection";

        //Function for adding new tags to card's drop down menu
        this.tagService.addAgent(() => {
            this._dropDown.options.length = 0;
            for (const t of this.tagService.tags) {
                let option: HTMLOptionElement = document.createElement('option');
                option.text = t.name;
                this._dropDown.add(option);
            }
        });
        console.log(args);
        this.setTag(args[0][2]);
        
        //Make sure the tags are updated to latest
        this.tagService.update();
    }

    /**
     * Generates a DOM model for current card. It follows this templte:
     * <div class="card">
     *  <span class="sec-topic">...</>
     *  <span class="sec-body">...</>
     *  <button class="tag">...</>
     *  <div class="tag-section">...</>
     *  <button class="rembutton">...</>
     * </>
     */
    protected domCreator() {
        const container = document.createElement('div');
        container.className = 'cards';

        const displayTopic = document.createElement('span');
        container.className = 'sec-topic';
        displayTopic.textContent = this.topic;

        const displayBody = document.createElement('span');
        container.className = 'sec-body';
        displayBody.textContent = this.body;

        const addTagButton = document.createElement('button');
        addTagButton.textContent = 'AddTag';
        addTagButton.className = "addtagbutton";
        addTagButton.onclick = () => this.addTag();

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Delete';
        removeButton.className = "rembutton";
        removeButton.onclick = () => {
            container.parentNode.removeChild(container);
            this.cardService.removeCard(this);
        };

        container.appendChild(displayTopic);
        container.appendChild(displayBody);
        container.appendChild(this._dropDown);
        container.appendChild(addTagButton);
        container.appendChild(this._tagSection);
        container.appendChild(removeButton);

        this._dom = container;
    }

    /**  
     * By calling this, it will associate a specific tag with
     * this object.
     */
    private addTag() {
        var x: Tag = this.tagService.valueSelect(this._dropDown.options[this._dropDown.selectedIndex].value);
        if (this.tags.indexOf(x) < 0){
            this.tags.push(x);
            this.publishTag(x);
        }
    }

    private setTag(t: string) {
        var x: Tag = this.tagService.valueSelect(t);
        console.log(x);
        if (this.tags.indexOf(x) < 0){
            this.tags.push(x);
            this.publishTag(x);
        }
    }

    /** 
     * This will update the tags associated with the cards and create
     * the <span> dom under the <div class="tag-Section">.
     * @param t 
     */
    private publishTag(t: Tag){
        const tag_item = document.createElement('span');
        tag_item.className = 'tag-item';
        tag_item.onclick =() => this.removeTag(t, tag_item);
        tag_item.textContent = t.name;
        console.log(t);
        this._tagSection.appendChild(tag_item);
    }

    /**
     * Removes given tag and dom object from it's parent node.
     * @param t 
     * @param e 
     */
    private removeTag(t: Tag, e: HTMLElement){
        const index = this.tags.indexOf(t);
        if (index > -1){
            this.tags.splice(index, 1);
            e.parentNode.removeChild(e);
        }
        else
            throw ("Tag Not Found.");
    }
}
