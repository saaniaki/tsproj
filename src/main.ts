import { Inject } from "./utility/service-gen";
import { ViewService } from "./services/view.service";
import { Tag } from "./model/tag";

class App {
    @Inject(ViewService)
        viewService: ViewService;
    
    constructor(target: HTMLElement) {
        this.viewService.render(target);
    }
}

(function () {
    const app = new App(document.body);
    //---------------------
    const t1 = new Tag("t1");
    const t2 = new Tag("t2");
    const t3 = new Tag("t3");
    const t4 = new Tag("t4");
})()