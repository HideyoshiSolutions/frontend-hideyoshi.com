import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSliderComponent } from './header-slider.component';

describe('HeaderSliderComponent', () => {
    let component: HeaderSliderComponent;
    let fixture: ComponentFixture<HeaderSliderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ HeaderSliderComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HeaderSliderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
