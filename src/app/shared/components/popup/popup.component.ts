import {animate, animateChild, group, query, state, style, transition, trigger,} from '@angular/animations';
import {Component, EventEmitter, Input, Output,} from '@angular/core';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.css'],
    animations: [
        trigger('popupState', [
            state('hide', style({
                opacity: '0',
                zIndex: 2
            })),
            state('show', style({
                opacity: '1',
                zIndex: 2
            })),
            transition('* => show', group([
                query('@*', animateChild(), { optional: true }),
                animate('250ms ease-in'),
            ])),
            transition('show => hide', group([
                query('@*', animateChild(), { optional: true }),
                animate('250ms ease-out'),
            ])),
        ]),
    ],
    standalone: false
})
export class PopupComponent {
    @Input()
        state: boolean = false;

    @Input()
        ignoreClickOutside!: HTMLDivElement[];

    @Output()
        stateChange = new EventEmitter<boolean>(false);

    constructor() {}

    get popupState(): string {
        return this.state ? 'show' : 'hide';
    }

    animationStop() {
        if (!this.state) {
            this.closePopup();
            this.stateChange.emit(false);
        }
    }

    closePopup(): void {
        this.state = false;
    }
}
