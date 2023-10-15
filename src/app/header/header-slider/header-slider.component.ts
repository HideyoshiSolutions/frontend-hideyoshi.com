import {
    animate,
    animateChild,
    group,
    query,
    state,
    style,
    transition,
    trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-header-slider',
    templateUrl: './header-slider.component.html',
    styleUrls: ['./header-slider.component.css'],
    animations: [
        trigger('slideState', [
            state(
                'hide',
                style({
                    transform: 'translateX(100%)',
                }),
            ),
            state(
                'show',
                style({
                    transform: 'translateX(0%)',
                }),
            ),
            transition('hide => show', [
                group([
                    query('@*', animateChild(), { optional: true }),
                    animate('600ms ease-in'),
                ]),
            ]),
            transition('show => hide', [
                group([
                    query('@*', animateChild(), { optional: true }),
                    animate('500ms ease-out'),
                ]),
            ]),
        ]),
    ],
})
export class HeaderSliderComponent {
    @Input()
    ignoreClickOutside!: HTMLDivElement[];

    @Input()
    clickOutsideStopWatching: boolean = false;

    @Input()
    state: boolean = false;

    @Output()
    stateChange = new EventEmitter<boolean>();

    constructor() {}

    get sliderStatus() {
        return this.state ? 'show' : 'hide';
    }

    public closeNavSlider(): void {
        this.state = false;
        this.changeState();
    }

    public changeState() {
        this.stateChange.emit(this.state);
    }
}
