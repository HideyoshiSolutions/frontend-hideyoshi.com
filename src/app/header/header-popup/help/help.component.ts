import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css'],
})
export class HelpComponent {
    @Input()
    state: boolean = false;

    @Input()
    ignoreClickOutside!: HTMLDivElement[];

    @Output()
    stateChange = new EventEmitter<boolean>();

    constructor() {}

    onStateChange(state: boolean) {
        this.stateChange.emit(state);
    }
}
