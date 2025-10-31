import {Component, Input} from '@angular/core';
import {Stack} from "../../../shared/model/stack/stack.model";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
    selector: 'app-stack-card',
    templateUrl: './stack-card.component.html',
    styleUrls: ['./stack-card.component.css'],
    animations: [
        trigger('cardAnimation', [
            state('active', style({
                opacity: 1,
                width: '325px',
                height: '425px',
            })),
            state('inactive', style({
                opacity: 0.7,
                width: '280px',
                height: '410px',
            })),
            transition('* => *', [
                animate('0.1s')
            ]),
        ])
    ],
    standalone: false
})
export class StackCardComponent {
    @Input()
        stack!: Stack;

    @Input()
        inFocus: boolean = false;

    get cardState(): 'active'|'inactive' {
        return this.inFocus ? 'active' : 'inactive';
    }
}
