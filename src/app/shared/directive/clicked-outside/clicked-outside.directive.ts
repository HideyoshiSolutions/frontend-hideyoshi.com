import {DOCUMENT} from '@angular/common';
import {AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output,} from '@angular/core';
import {filter, fromEvent, Subscription,} from 'rxjs';

@Directive({
    selector: '[appClickedOutside]',
})
export class ClickedOutsideDirective implements AfterViewInit, OnDestroy {
    @Input()
        ignoreElementList!: HTMLDivElement[];

    @Input()
        includeClickedOutside!: HTMLDivElement[];

    @Input()
        clickOutsideStopWatching: boolean = false;

    @Output()
        clickOutside: EventEmitter<void> = new EventEmitter();

    eventListener!: Subscription;

    constructor(
        private element: ElementRef,
        @Inject(DOCUMENT) private document: Document,
    ) {}

    ngAfterViewInit(): void {
        const clickListener$ = fromEvent(this.document, 'click');

        this.eventListener = clickListener$
            .pipe(
                filter((click) => {
                    return (
                        (this.isOutside(click.target as HTMLElement) ||
                            this.isInIncludedList(
                                click.target as HTMLElement,
                            )) &&
                        this.notInIgnoredList(click.target as HTMLElement)
                    );
                }),
            )
            .subscribe(() => {
                !this.clickOutsideStopWatching && this.clickOutside.emit();
            });
    }

    ngOnDestroy(): void {
        this.eventListener?.unsubscribe();
    }

    private isOutside(elementToCheck: HTMLElement): boolean {
        let status = true;
        if (
            this.element.nativeElement === elementToCheck ||
            this.element.nativeElement.contains(elementToCheck)
        ) {
            status = false;
        }

        return status;
    }

    private notInIgnoredList(elementToCheck: HTMLElement): boolean {
        if (!this.ignoreElementList || this.ignoreElementList.length === 0) {
            return false;
        }

        let validateIsIgnored = (ignoreElement: HTMLDivElement): boolean => {
            return (
                ignoreElement === elementToCheck ||
                ignoreElement.contains(elementToCheck) ||
                elementToCheck.contains(ignoreElement)
            );
        };

        return !this.ignoreElementList.some(validateIsIgnored);
    }

    private isInIncludedList(elementToCheck: HTMLElement): boolean {
        if (
            !this.includeClickedOutside ||
            this.includeClickedOutside.length === 0
        ) {
            return false;
        }

        let validateIsIncluded = (includedElement: HTMLDivElement): boolean => {
            return (
                includedElement === elementToCheck ||
                includedElement.contains(elementToCheck) ||
                elementToCheck.contains(includedElement)
            );
        };

        return !this.includeClickedOutside.some(validateIsIncluded);
    }
}
