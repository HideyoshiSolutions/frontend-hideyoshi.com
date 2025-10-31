import {Component} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent {
    constructor() {}

    scrollToElement(element: HTMLElement): void {
        let block: ScrollLogicalPosition = "start";
        if (window.innerWidth < 400) {
            block = "end";
        }
        element.scrollIntoView({
            behavior: "smooth",
            block: block,
            inline: "nearest"
        });
    }
}
