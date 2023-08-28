import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePicturePickerComponent } from './profile-picture-picker.component';

describe('ProfilePicturePickerComponent', () => {
  let component: ProfilePicturePickerComponent;
  let fixture: ComponentFixture<ProfilePicturePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePicturePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilePicturePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
