import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { filter, fromEvent, Subscription } from 'rxjs';

@Directive({
    selector: '[appClickedOutside]'
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

    clickListener!: Subscription;

    constructor(
        private element: ElementRef,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngAfterViewInit(): void {

        

        this.clickListener = fromEvent(this.document, 'click')
            .pipe(
                filter((event) => {
                    return !this.isInside(event.target as HTMLElement) || this.includedList(event.target as HTMLElement);
                })
            ). subscribe( () => {
                !this.clickOutsideStopWatching && this.clickOutside.emit();
            });
    }

    ngOnDestroy(): void {
        this.clickListener?.unsubscribe();
    }

    private isInside(elementToCheck: HTMLElement): boolean {
        return (
            elementToCheck === this.element.nativeElement 
                || this.element.nativeElement.contains(elementToCheck) 
                || (this.ignoreElementList && this.checkIgnoredList(elementToCheck))

        );
    }
    
    private checkIgnoredList(elementToCheck: HTMLElement): boolean {
        return this.ignoreElementList.some(
            (ignoreElement) => {
                return ignoreElement === elementToCheck ||
                    ignoreElement.contains(elementToCheck)
            }
        )
    }
        
    private includedList(elementToCheck: HTMLElement): boolean {
        return this.includeClickedOutside && this.includeClickedOutside.some(
            (includedElement) => {
                return includedElement === elementToCheck ||
                includedElement.contains(elementToCheck)
            }
        )
    }

}
