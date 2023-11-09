import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackSliderComponent } from './stack-slider.component';

describe('StackSliderComponent', () => {
  let component: StackSliderComponent;
  let fixture: ComponentFixture<StackSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StackSliderComponent]
    });
    fixture = TestBed.createComponent(StackSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
