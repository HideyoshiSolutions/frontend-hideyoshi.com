import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSliderComponent } from './user-slider.component';

describe('UserSliderComponent', () => {
    let component: UserSliderComponent;
    let fixture: ComponentFixture<UserSliderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ UserSliderComponent ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserSliderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
