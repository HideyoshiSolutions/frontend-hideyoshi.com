import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, EventEmitter, Inject, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { combineLatest, combineLatestWith, filter, fromEvent, merge, Subscription } from 'rxjs';

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

    eventListener!: Subscription;

    constructor(
        private element: ElementRef,
        @Inject(DOCUMENT) private document: Document
    ) { }

    ngAfterViewInit(): void {

        const mouseDownListener$ = fromEvent(document, 'mousedown');
        const mouseUpListener$ = fromEvent(document,'mouseup');

        this.eventListener = mouseUpListener$.pipe(
            combineLatestWith(mouseDownListener$),
            filter(([downClick, upClick]) => {
                return (downClick.target as HTMLElement)
                .contains(this.element.nativeElement) && (!this.isInside(
                    upClick.target as HTMLElement
                    ) || this.includedList(upClick.target as HTMLElement));
            })
        ). subscribe( () => {
            !this.clickOutsideStopWatching && this.clickOutside.emit();
        });
            
    }

    ngOnDestroy(): void {
        this.eventListener?.unsubscribe();
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
