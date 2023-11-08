import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {NgxGlideComponent} from "ngx-glide";
import {Stack} from "../../shared/model/stack/stack.model";


@Component({
    selector: 'app-stack-slider',
    templateUrl: './stack-slider.component.html',
    styleUrls: ['./stack-slider.component.css']
})
export class StackSliderComponent implements AfterViewInit {
    @ViewChild('ngxGlide')
        ngxGlide!: NgxGlideComponent;

    stacks: Stack[] = [
        {
            name: 'Angular',
            image: 'https://picsum.photos/id/1/100/100',
            description: 'Angular is a platform for building mobile and desktop web applications.',
        },
        {
            name: 'React',
            image: 'https://picsum.photos/id/2/100/100',
            description: 'React is a JavaScript library for building user interfaces.',
        },
        {
            name: 'Vue',
            image: 'https://picsum.photos/id/3/100/100',
            description: 'Vue is a progressive framework for building user interfaces.',
        },
        {
            name: 'Svelte',
            image: 'https://picsum.photos/id/4/100/100',
            description: 'Svelte is a radical new approach to building user interfaces.',
        },
        {
            name: 'Ember',
            image: 'https://picsum.photos/id/5/100/100',
            description: 'Ember.js is an open-source JavaScript web framework.',
        },
        {
            name: 'Preact',
            image: 'https://picsum.photos/id/6/100/100',
            description: 'Preact is a fast 3kB alternative to React with the same modern API.',
        }
    ]

    constructor(private cd: ChangeDetectorRef) { }

    ngAfterViewInit(): void {
        if (this.ngxGlide)
            this.buildCarousel();

        this.cd.detectChanges();
    }

    buildCarousel(): void {
        this.ngxGlide.showArrows = false;
        this.ngxGlide.showBullets = false;
        this.ngxGlide.type = 'carousel';
        this.ngxGlide.perView = 5;
        this.ngxGlide.focusAt = 'center';
        this.ngxGlide.gap = 10;
        this.ngxGlide.autoplay = 3000;

        this.ngxGlide.recreate();
    }

    get currentIndex(): number {
        return this.ngxGlide?.getIndex();
    }

    isInFocus(stack: Stack): boolean {
        return this.stacks.indexOf(stack) === this.currentIndex;
    }
}
