import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StackCardComponent} from './stack-card.component';

describe('StackCardComponent', () => {
    let component: StackCardComponent;
    let fixture: ComponentFixture<StackCardComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [StackCardComponent]
        });
        fixture = TestBed.createComponent(StackCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
