import {animate, state, style, transition, trigger,} from '@angular/animations';
import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-slider-item',
    templateUrl: './slider-item.component.html',
    styleUrls: ['./slider-item.component.css'],
    animations: [
        trigger('animateSliderItem', [
            state(
                'hide',
                style({
                    opacity: '0',
                    transform: 'translateX(150px)',
                }),
                {
                    params: {
                        fadeInTime: 600,
                        fadeOutTime: 600,
                    },
                },
            ),
            state(
                'show',
                style({
                    opacity: '1',
                    transform: 'translateX(0px)',
                }),
                {
                    params: {
                        fadeOutTime: 600,
                        fadeInTime: 600,
                    },
                },
            ),
            transition('hide => show', animate(`{{ fadeInTime }}s ease-in`)),
            transition('show => hide', animate(`{{ fadeOutTime }}s ease-out`)),
        ]),
    ],
})
export class SliderItemComponent {
    @Input()
    public state: boolean = false;

    constructor() {}

    get itemStatus(): string {
        return this.state ? 'show' : 'hide';
    }
}
