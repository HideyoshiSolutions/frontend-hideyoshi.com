import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { SliderItemComponent } from 'src/app/shared/components/slider-item/slider-item.component';

@Component({
    selector: 'app-nav-slider',
    templateUrl: './nav-slider.component.html',
    styleUrls: ['./nav-slider.component.css']
})
export class NavSliderComponent extends SliderItemComponent {
    
    userIcon = faUser;

    navLink = [
        { page: "Home", link: "/home" },
        { page: "Work", link: "/home" },
        { page: "Contact", link: "/home" },
        { page: "About", link: "/home" }
    ]

    @Output()
        profileButtonClicked = new EventEmitter();

    constructor() {
        super();
    }

    onProfileButtonClicked() {
        this.profileButtonClicked.emit();
    }

}
