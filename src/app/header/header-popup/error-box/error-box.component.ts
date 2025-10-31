import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-error-box',
    templateUrl: './error-box.component.html',
    styleUrls: ['./error-box.component.css'],
    standalone: false
})
export class ErrorBoxComponent {
    @Input()
        errorMessage: string | null = 'Error, please try again later.';

    constructor() {}
}
